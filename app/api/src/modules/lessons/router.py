from fastapi import APIRouter, status, Depends

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.lessons.access import check_rights
from src.modules.lessons.exceptions import LessonNotFoundException
from src.modules.lessons.schemas import SLessonPostIn, SLessonPostOut, SLessonGetOutWithSteps
from src.modules.lessons.service import LessonService
from src.modules.modules.exceptions import ModuleNotFoundException
from src.modules.modules.service import ModuleService
from src.users.model import UserModel
from src.users.service import UserService

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


# TODO: decide what's better schema or lesson_id?
@router.get(
    path="/{lesson_id}",
    response_model=SLessonGetOutWithSteps,
    status_code=status.HTTP_200_OK,
    summary="Get lesson with steps.",
    description="Get lesson with steps.",
    tags=["Lesson"],
    responses={
        status.HTTP_200_OK: {
            "model": SLessonGetOutWithSteps,
            "description": "Lesson found successfully.",
        },
        LessonNotFoundException.status_code: {
            "model": None,
            "description": LessonNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_lesson_with_steps(lesson_id: int, user: UserModel = Depends(get_current_user)):
    lesson = await LessonService.read_one_or_none_with_steps(id=lesson_id)
    if not lesson:
        raise LessonNotFoundException

    # TODO: better to change on maybe decorator and remove extra moves.
    user = await UserService.read_one_or_none_with_lessons(uuid=user.uuid)
    check_rights(lesson.LessonModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    return lesson.LessonModel
