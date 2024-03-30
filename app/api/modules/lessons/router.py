from fastapi import APIRouter, status

from app.api.modules.lessons.schemas import SLessonGetOut, SLessonPostIn, SLessonPostOut
from app.api.modules.lessons.service import LessonService
from app.api.modules.modules.exceptions import ModuleNotFoundException
from app.api.modules.modules.service import ModuleService

router = APIRouter(
    prefix="/lesson",
)


# @router.get(
#     path="/{lesson_id}",
#     response_model=SLessonGetOut,
#     status_code=status.HTTP_200_OK,
#     summary="Get lesson information.",
#     description="Get lesson by id. If lesson with lesson_id not found/exist, raise LessonNotFoundException",
#     tags=["Lesson"],
#     responses={
#         status.HTTP_200_OK: {
#             "model": SLessonGetOut,
#             "description": "Lesson found.",
#         },
#         LessonNotFoundException.status_code: {
#             "model": None,
#             "description": LessonNotFoundException.detail,
#         }
#     }
# )
# async def get_lesson(lesson_id: int):
#     lesson = await LessonService.read_one_or_none(id=lesson_id)
#     if not lesson:
#         raise LessonNotFoundException
#     return lesson.LessonModel

@router.get(
    path="/{module_id}",
    response_model=list[SLessonGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get lessons by module_id.",
    description="Get lessons by module_id.",
    tags=["Lesson"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SLessonGetOut],
            "description": "Lessons found.",
        },
        ModuleNotFoundException.status_code: {
            "model": None,
            "description": ModuleNotFoundException.detail,
        }
    }
)
async def get_lessons_in_module(module_id: int):
    module = await ModuleService.read_one_or_none(id=module_id)
    if not module:
        raise ModuleNotFoundException
    lessons = [
        model.LessonModel for model in await LessonService.read_all(module_id=module_id)
    ]
    return lessons


@router.post(
    path="/create",
    response_model=SLessonPostOut,
    status_code=status.HTTP_201_CREATED,
    summary="Teacher create lesson.",
    description="Create lesson by teacher.",
    tags=["Lesson"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SLessonPostOut,
            "description": "Lesson created successfully.",
        },
        ModuleNotFoundException.status_code: {
            "model": None,
            "description": ModuleNotFoundException.detail,
        }
    }
)
async def create_lesson(data: SLessonPostIn):
    module = await ModuleService.read_one_or_none(id=data.module_id)
    if not module:
        raise ModuleNotFoundException

    lesson = await LessonService.create_one(
        title=data.title,
        module_id=module.Modulemodel.id,
    )
    return lesson
