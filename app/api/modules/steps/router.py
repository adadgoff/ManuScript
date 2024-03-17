from fastapi import APIRouter, status

from app.api.modules.steps.exceptions import StepNotFoundException
from app.api.modules.steps.repository import StepRepository
from app.api.modules.steps.schemas import SStepInfo

router = APIRouter(
    prefix="/steps",
)


@router.get(
    path="/{step_id}",
    response_model=SStepInfo,
    status_code=status.HTTP_200_OK,
    summary="Get step information.",
    description="Get step by id. If step with step_id not found/exist, raise StepNotFoundException",
    tags=["Student"],
    responses={
        status.HTTP_200_OK: {
            "model": SStepInfo,
            "description": "Step found.",
        },
        StepNotFoundException.status_code: {
            "model": None,
            "description": StepNotFoundException.detail,
        }
    }
)
async def get_step(step_id: int):
    step = await StepRepository.find_one_or_none(id=step_id)
    if not step:
        raise StepNotFoundException
    return step.StepModel


@router.post(
    path="/{step_id}",
    response_model=SStepInfo,
    status_code=status.HTTP_200_OK,
    summary="Post answer to step.",
    description="Post answer to step with step_id. If step not found/exist, raise StepNotFoundException",
    tags=["Student"],
    responses={
        status.HTTP_200_OK: {
            "model": SStepInfo,
            "description": "Classroom found.",
        },
        StepNotFoundException.status_code: {
            "model": None,
            "description": StepNotFoundException.detail,
        }
    }
)
async def answer_to_step(step_id: int):
    step = await StepRepository.find_one_or_none(id=step_id)
    if not step:
        raise StepNotFoundException
    # TODO: implement bearer. Re-edit the status if incorrect.
