from fastapi import APIRouter, status, Depends

from app.api.auth.token_helper import get_current_user
from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.schemas import SClassroomGetOut, \
    SClassroomPostOut, SClassroomPostIn, SClassroomDeleteOut, SClassroomDeleteIn
from app.api.modules.classrooms.service import ClassroomService
from app.api.modules.students.service import StudentService
from app.api.modules.teachers.service import TeacherService
from app.api.users.exceptions import UserNotFoundException
from app.api.users.model import UserModel

router = APIRouter(
    prefix="/classroom",
)


@router.get(
    path="/{classroom_id}",
    response_model=SClassroomGetOut,
    status_code=status.HTTP_200_OK,
    summary="Get classroom information.",
    description="Get classroom by id. If classroom with classroom_id not found/exist, raise ClassroomNotFoundException",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGetOut,
            "description": "Classroom found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def get_classroom(classroom_id: int):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException
    return classroom.ClassroomModel


@router.get(
    path="/my_student_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user classrooms.",
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
        (await ClassroomService.read_one_or_none(id=classroom_id)).ClassroomModel
        for classroom_id in my_student_classroom_ids
    ]
    return student_classrooms


@router.get(
    path="/my_teacher_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user classrooms.",
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
    my_teacher_classroom_ids = [model.TeacherModel.classroom_id for model in
                                await TeacherService.read_all(user_uuid=user.uuid)]
    teacher_classrooms = [(await ClassroomService.read_one_or_none(id=classroom_id)).ClassroomModel for classroom_id in
                          my_teacher_classroom_ids]
    return teacher_classrooms


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
