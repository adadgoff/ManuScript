from fastapi import APIRouter, status

from app.api.modules.lessons.schemas import SLessonPostIn, SLessonPostOut
from app.api.modules.lessons.service import LessonService
from app.api.modules.modules.exceptions import ModuleNotFoundException
from app.api.modules.modules.service import ModuleService

router = APIRouter(
    prefix="/lesson",
)


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
