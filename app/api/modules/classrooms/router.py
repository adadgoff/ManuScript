from fastapi import APIRouter, status, Depends

from app.api.auth.token_helper import get_current_user
from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.schemas import SClassroomGetOut, \
    SClassroomPostOut, SClassroomPostIn, SClassroomDeleteOut, SClassroomDeleteIn
from app.api.modules.classrooms.service import ClassroomService
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
