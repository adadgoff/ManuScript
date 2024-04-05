from fastapi import APIRouter, status, Depends

from app.api.auth.exceptions import AccessDeniedException
from app.api.auth.helpers.token_helper import get_current_user
from app.api.modules.classrooms.access import check_rights
from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.schemas import SClassroomGetOut, \
    SClassroomPostOut, SClassroomPostIn, SClassroomDeleteOut, SClassroomDeleteIn, SClassroomGetOutWithModules
from app.api.modules.classrooms.service import ClassroomService
from app.api.modules.students.service import StudentService
from app.api.modules.teachers.service import TeacherService
from app.api.users.exceptions import UserNotFoundException
from app.api.users.model import UserModel
from app.api.users.service import UserService

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
async def get_classroom_with_modules_and_lessons(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    # TODO: better to change on maybe decorator and remove extra moves.
    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=True, is_for_teachers=True)

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
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def create_classroom(data: SClassroomPostIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.create_one(
        title=data.title,
        description=data.description,
        user=user,
    )
    return classroom


@router.delete(
    path="/delete",
    response_model=SClassroomDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete a classroom.",
    description="Delete a classroom and return id of deleted classroom to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomDeleteOut,
            "description": "Deleted classroom."
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def delete_classroom(data: SClassroomDeleteIn):
    classroom = await ClassroomService.delete_one(id=data.id)
    if not classroom:
        raise ClassroomNotFoundException
    return classroom
