from fastapi import APIRouter, Body, Depends, File, UploadFile, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.classrooms.access import check_rights
from src.modules.classrooms.exceptions import ClassroomNotFoundException
from src.modules.classrooms.schemas import SClassroomDeleteOut, SClassroomGetOut, \
    SClassroomGetOutWithModules, SClassroomPostIn, SClassroomPostOut, SClassroomUpdateIn, SClassroomUpdateOut
from src.modules.classrooms.service import ClassroomService
from src.modules.students.service import StudentService
from src.modules.teachers.service import TeacherService
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel
from src.users.service import UserService

router = APIRouter(
    prefix="/classroom",
)


@router.get(
    path="/my_student_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user student classrooms.",
    description="Get user classrooms.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SClassroomGetOut],
            "description": "Student classrooms found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def get_my_student_classrooms(user: UserModel = Depends(get_current_user)):
    my_student_classroom_ids = [
        model.StudentModel.classroom_id for model in await StudentService.read_all(user_uuid=user.uuid)
    ]
    student_classrooms = [
        model.ClassroomModel for model in await ClassroomService.read_all_with_icon(ids=my_student_classroom_ids)
    ]
    return student_classrooms


@router.get(
    path="/my_teacher_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user teacher classrooms.",
    description="Get user classrooms.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SClassroomGetOut],
            "description": "Teacher classrooms found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def get_my_teacher_classrooms(user: UserModel = Depends(get_current_user)):
    my_teacher_classroom_ids = [
        model.TeacherModel.classroom_id for model in await TeacherService.read_all(user_uuid=user.uuid)
    ]

    teacher_classrooms = [
        model.ClassroomModel for model in await ClassroomService.read_all_with_icon(ids=my_teacher_classroom_ids)
    ]

    return teacher_classrooms


@router.get(
    path="/{classroom_id}",
    response_model=SClassroomGetOutWithModules,
    status_code=status.HTTP_200_OK,
    summary="Get classroom with modules and lessons.",
    description="Get classroom with modules and lessons. If classroom with classroom_id not found/exist, raise ClassroomNotFoundException. info = [classroom + modules with lessons].",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGetOutWithModules,
            "description": "Classroom found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_classroom_with_lessons(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    return classroom.ClassroomModel


@router.get(
    path="/{classroom_id}/edit",
    response_model=SClassroomGetOutWithModules,
    status_code=status.HTTP_200_OK,
    summary="Get classroom with modules and lessons only for teachers.",
    description="Get classroom with modules and lessons only for teachers.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGetOutWithModules,
            "description": "Classroom found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_classroom_with_lessons_for_teachers(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    return classroom.ClassroomModel


@router.post(
    path="/create",
    response_model=SClassroomPostOut,
    status_code=status.HTTP_200_OK,
    summary="Create a new classroom.",
    description="Create a classroom and return it to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomPostOut,
            "description": "Classroom created successfully.",
        },
    }
)
async def create_classroom(data: SClassroomPostIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.create_one(
        title=data.title,
        description=data.description,
        user=user,
    )
    return classroom


@router.put(
    path="/update",
    response_model=SClassroomUpdateOut,
    status_code=status.HTTP_200_OK,
    summary="Update a classroom.",
    description="Update a classroom and return it to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomUpdateOut,
            "description": "Classroom updated successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
    }
)
async def update_classroom(
        data: SClassroomUpdateIn = Body(),
        classroom_icon: UploadFile = File(media_type="image/*"),
        user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=data.id)

    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    updated_classroom = await ClassroomService.update_classroom(classroom.ClassroomModel,
                                                                data,
                                                                classroom_icon,
                                                                user.UserModel)
    return updated_classroom


@router.delete(
    path="/{classroom_id}/delete",
    response_model=SClassroomDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete a classroom.",
    description="Delete a classroom and return id of deleted classroom to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomDeleteOut,
            "description": "Deleted classroom successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def delete_classroom(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    if not classroom:
        raise ClassroomNotFoundException

    classroom = await ClassroomService.delete_one(id=classroom_id)
    return classroom
