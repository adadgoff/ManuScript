from fastapi import APIRouter, Depends, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.steps.access import check_rights
from src.modules.steps.exceptions import StepNotFoundException
from src.modules.steps.schemas import SStepGetOut
from src.modules.steps.service import StepService
from src.users.model import UserModel
from src.users.service import UserService

router = APIRouter(
    prefix="/step",
)


@router.get(
    path="/{step_id}",
    response_model=SStepGetOut,
    status_code=status.HTTP_200_OK,
    summary="Get step information.",
    description="Get step by id. If step with step_id not found/exist, raise StepNotFoundException",
    tags=["Step"],
    responses={
        status.HTTP_200_OK: {
            "model": SStepGetOut,
            "description": "Step found.",
        },
        StepNotFoundException.status_code: {
            "model": None,
            "description": StepNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_step(step_id: int, user: UserModel = Depends(get_current_user)):
    step = await StepService.read_one_or_none(id=step_id)
    if not step:
        raise StepNotFoundException

    user = await UserService.read_one_or_none_with_steps(uuid=user.uuid)
    check_rights(step.StepModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    return step.StepModel
