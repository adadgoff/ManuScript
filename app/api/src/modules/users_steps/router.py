from fastapi import APIRouter, Body, Depends, File, UploadFile, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.steps.StepType import StepType
from src.modules.steps.access import check_rights
from src.modules.steps.exceptions import StepIncorrectTypeException, StepNotFoundException
from src.modules.steps.service import StepService
from src.modules.users_steps.UserStepStatus import UserStepStatus
from src.modules.users_steps.exceptions import UserStepNotFoundException
from src.modules.users_steps.schemas import SUserStepGetOut, SUserStepPostIn, SUserStepPostOut
from src.modules.users_steps.service import UserStepService
from src.services.images.service import ImageService
from src.users.model import UserModel
from src.users.service import UserService

router = APIRouter(
    prefix="/user_step",
)


@router.get(
    path="/{step_id}",
    response_model=SUserStepGetOut,
    status_code=status.HTTP_200_OK,
    summary="Get info of user step.",
    description="Get info of user step.",
    tags=["UserStep"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserStepGetOut,
            "description": "UserStep found.",
        },
        UserStepNotFoundException.status_code: {
            "model": None,
            "description": UserStepNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
    }
)
async def info(step_id: int, user: UserModel = Depends(get_current_user)):
    step = await StepService.read_one_or_none(id=step_id)
    user = await UserService.read_one_or_none_with_steps(uuid=user.uuid)
    check_rights(step.StepModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    user_step = await UserStepService.read_one_or_none(user_uuid=user.UserModel.uuid, step_id=step_id)
    if not user_step:
        raise UserStepNotFoundException

    return user_step.UserStepModel


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
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
    }
)
async def answer(
        data: SUserStepPostIn = Body(),
        answer_img: UploadFile = File(media_type="image/*"),
        user: UserModel = Depends(get_current_user)):
    step = await StepService.read_one_or_none(id=data.step_id)
    if not step:
        raise StepNotFoundException

    if step.StepModel.type == StepType.INFO:
        raise StepIncorrectTypeException

    user = await UserService.read_one_or_none_with_steps(uuid=user.uuid)
    check_rights(step.StepModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    image = await ImageService.create_one(answer_img, user.UserModel)

    user_step = await UserStepService.create_or_update_one(
        user_uuid=user.UserModel.uuid,
        step_id=data.step_id,
        user_answer=data.user_answer,
        status=UserStepStatus.CORRECT if step.StepModel.answer == data.user_answer else UserStepStatus.INCORRECT,
        user_image_uuid=image.get("uuid"),
    )

    return user_step
