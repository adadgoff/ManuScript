from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, status

from src.auth.helpers.token_helper import get_current_user
from src.modules.enums.StepStatus import StepStatus
from src.modules.enums.StepType import StepType
from src.modules.steps.access import check_rights
from src.modules.steps.exceptions import StepIncorrectTypeException, StepNotFoundException
from src.modules.steps.service import StepService
from src.modules.users_steps.model import UserStepModel
from src.modules.users_steps.schemas import SUserStepPostOut
from src.modules.users_steps.service import UserStepService
from src.services.images.model import ImageModel
from src.services.images.service import ImageService
from src.users.model import UserModel
from src.users.service import UserService

router = APIRouter(
    prefix="/user_step",
)


@router.post(
    path="/answer",
    response_model=SUserStepPostOut,
    status_code=status.HTTP_200_OK,
    summary="Give answer from user to step.",
    description="Give answer from user to step.",
    tags=["UserStep"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserStepPostOut,
            "description": "User and Step found.",
        },
        StepNotFoundException.status_code: {
            "model": None,
            "description": StepNotFoundException.detail,
        },
        StepIncorrectTypeException.status_code: {
            "model": None,
            "description": StepIncorrectTypeException.detail,
        }
    }
)
# TODO: how to give files through schema?
async def answer(
        answer_txt: str,
        answer_img: UploadFile,
        step_id: int,
        user: UserModel = Depends(get_current_user),
):
    step = await StepService.read_one_or_none(id=step_id)
    if not step:
        raise StepNotFoundException.status_code

    if step.StepModel.type == StepType.INFO:
        raise StepIncorrectTypeException

    # TODO: better to change or maybe decorator and remove extra moves.
    user = await UserService.read_one_or_none_with_steps(uuid=user.uuid)
    check_rights(step.StepModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    # TODO: how to return model in create?
    image = ImageModel(**(await ImageService.create_one(answer_img, user.UserModel)))

    user_step = await UserStepService.create_or_update_one(
        user_uuid=user.UserModel.uuid,
        step_id=step_id,
        user_answer=answer_txt,
        user_image_uuid=image.uuid,
    )

    return user_step
