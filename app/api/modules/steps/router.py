from fastapi import APIRouter, status

from app.api.modules.lessons.exceptions import LessonNotFoundException
from app.api.modules.lessons.service import LessonService
from app.api.modules.steps.exceptions import StepNotFoundException
from app.api.modules.steps.schemas import SStepGetOut, SStepPostOut, SStepPostIn, SStepDeleteOut, \
    SStepDeleteIn
from app.api.modules.steps.service import StepService

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
        }
    }
)
async def get_step(step_id: int):
    step = await StepService.read_one_or_none(id=step_id)
    if not step:
        raise StepNotFoundException
    return step.StepModel


@router.post(
    path="/create",
    response_model=SStepPostOut,
    status_code=status.HTTP_201_CREATED,
    summary="Teacher create step.",
    description="Create step by teacher.",
    tags=["Step"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SStepPostOut,
            "description": "Step created successfully.",
        },
        LessonNotFoundException.status_code: {
            "model": None,
            "description": LessonNotFoundException.detail,
        }
    }
)
async def create_step(data: SStepPostIn):
    lesson = await LessonService.read_one_or_none(id=data.lesson_id)
    if not lesson:
        raise LessonNotFoundException
    step = await StepService.create_one(
        type=data.type,
        lesson_id=lesson.LessonModel.id,
    )
    return step


# Ученик дает ответ.  # TODO: implement.
# @router.post(
#     path="/{step_id}",
#     response_model=SStepInfo,
#     status_code=status.HTTP_200_OK,
#     summary="Post answer to step.",
#     description="Post answer to step with step_id. If step not found/exist, raise StepNotFoundException",
#     tags=["Student"],
#     responses={
#         status.HTTP_200_OK: {
#             "model": SStepInfo,
#             "description": "Classroom found.",
#         },
#         StepNotFoundException.status_code: {
#             "model": None,
#             "description": StepNotFoundException.detail,
#         }
#     }
# )
# async def answer_to_step(step_id: int):
#     step = await StepRepository.read_one_or_none(id=step_id)
#     if not step:
#         raise StepNotFoundException
#     # TODO: implement bearer. Re-edit the status if incorrect.


@router.delete(
    path="/delete",
    response_model=SStepDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete step.",
    description="Delete step and return id of deleted step to the client.",
    tags=["Step"],
    responses={
        status.HTTP_200_OK: {
            "model": SStepDeleteOut,
            "description": "Step deleted successfully.",
        },
        StepNotFoundException.status_code: {
            "model": None,
            "description": StepNotFoundException.detail,
        }
    }
)
async def delete_step(data: SStepDeleteIn):
    step = await StepService.delete_one(id=data.id)
    if not step:
        raise StepNotFoundException
    return step
