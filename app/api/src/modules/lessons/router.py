from fastapi import APIRouter, Depends, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.lessons.access import check_rights
from src.modules.lessons.exceptions import LessonNotFoundException
from src.modules.lessons.schemas import SLessonDeleteOut, SLessonEditGetOutWithSteps, SLessonGetOutWithSteps, \
    SLessonUpdateInForLesson, SLessonUpdateOutForLesson
from src.modules.lessons.service import LessonService
from src.modules.modules.service import ModuleService
from src.users.model import UserModel
from src.users.service import UserService

router = APIRouter(
    prefix="/lesson",
)


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

    user = await UserService.read_one_or_none_with_lessons(uuid=user.uuid)
    check_rights(lesson.LessonModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    return lesson.LessonModel


@router.get(
    path="/{lesson_id}/edit",
    response_model=SLessonEditGetOutWithSteps,
    status_code=status.HTTP_200_OK,
    summary="Get lesson with modules and lessons only for teachers.",
    description="Get lesson with modules and lessons only for teachers.",
    tags=["Lesson"],
    responses={
        status.HTTP_200_OK: {
            "model": SLessonEditGetOutWithSteps,
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
async def get_lesson_with_steps_for_teachers(lesson_id: int, user: UserModel = Depends(get_current_user)):
    lesson = await LessonService.read_one_or_none_with_steps(id=lesson_id)
    if not lesson:
        raise LessonNotFoundException

    user = await UserService.read_one_or_none_with_lessons(uuid=user.uuid)
    check_rights(lesson.LessonModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    return lesson.LessonModel


@router.put(
    path="/update",
    response_model=SLessonUpdateOutForLesson,
    status_code=status.HTTP_200_OK,
    summary="Update a lesson.",
    description="Update a lesson and return it to the client.",
    tags=["Lesson"],
    responses={
        status.HTTP_200_OK: {
            "model": SLessonUpdateOutForLesson,
            "description": "Lesson updated successfully.",
        },
        LessonNotFoundException.status_code: {
            "model": None,
            "description": LessonNotFoundException.detail,
        },
    }
)
async def update_lesson(data: SLessonUpdateInForLesson, user: UserModel = Depends(get_current_user)):
    lesson = await LessonService.read_one_or_none_with_steps(id=data.id)

    if not lesson:
        raise LessonNotFoundException

    user = await UserService.read_one_or_none_with_lessons(uuid=user.uuid)
    check_rights(lesson.LessonModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    updated_lesson = await LessonService.update_lesson(lesson.LessonModel, data)
    return updated_lesson


@router.delete(
    path="/{lesson_id}/delete",
    response_model=SLessonDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete a lesson",
    description="Delete a lesson and return id of deleted lesson to the client.",
    tags=["Lesson"],
    responses={
        status.HTTP_200_OK: {
            "model": SLessonDeleteOut,
            "description": "Deleted lesson successfully.",
        },
        LessonNotFoundException.status_code: {
            "model": None,
            "description": LessonNotFoundException.detail,
        }
    }
)
async def delete_lesson(lesson_id: int, user: UserModel = Depends(get_current_user)):
    lesson = await LessonService.read_one_or_none(id=lesson_id)

    user = await UserService.read_one_or_none_with_lessons(uuid=user.uuid)
    check_rights(lesson.LessonModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    if not lesson:
        raise LessonNotFoundException

    lesson = dict(await LessonService.delete_one(id=lesson_id))
    module_model = await ModuleService.read_one_or_none(id=lesson.get("module_id"))
    lesson["module"] = module_model.ModuleModel

    return lesson
