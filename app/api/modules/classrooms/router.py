from fastapi import APIRouter, status, Depends

from app.api.auth.token_helper import get_current_user
from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.repository import ClassroomRepository
from app.api.modules.classrooms.schemas import SClassroomGet, SClassroomPost
from app.api.modules.teachers.repository import TeacherRepository
from app.api.users.models import UserModel

router = APIRouter(
    prefix="/classrooms",
)


@router.get(
    path="/{classroom_id}",
    response_model=SClassroomGet,
    status_code=status.HTTP_200_OK,
    summary="Get classroom information.",
    description="Get classroom by id. If classroom with classroom_id not found/exist, raise ClassroomNotFoundException",
    tags=["Student"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGet,
            "description": "Classroom found.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def get_test(classroom_id: int):
    classroom = await ClassroomRepository.find_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException
    return classroom.ClassroomModel


# TODO: implement access only authenticated users.
@router.post(
    path="/classroom/create",
    response_model=None,#SClassroomGet,
    status_code=status.HTTP_200_OK,
    summary="Get classroom information.",
    description="Get a classroom by id. If classroom with classroom_id not found/exist, raise ClassroomNotFoundException",
    tags=["Student"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGet,
            "description": "Classroom created successfully.",
        },
        # TODO: maybe handle unexpected exceptions?
    }
)
async def create_classroom(
        data: SClassroomPost,
        user: UserModel = Depends(get_current_user),
):
    classroom = await ClassroomRepository.create(data, user)
    print(classroom)
