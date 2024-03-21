from uuid import UUID

from fastapi import APIRouter
from starlette import status

from app.api.users.exceptions import UserNotFoundException
from app.api.users.schemas import SUserInfo
from app.api.users.service import UserService

router = APIRouter(
    prefix="/user",
)


@router.get(
    path="/{user_uuid}",
    response_model=SUserInfo,
    status_code=status.HTTP_200_OK,
    summary="Get user information.",
    description="Get user information by uuid. If user with user_uuid not found/exist, raise UserNotFoundException.",
    tags=["User"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserInfo,
            "description": "User found.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def get_user(user_uuid: UUID):
    user = await UserService.read_one_or_none(uuid=user_uuid)
    if not user:
        raise UserNotFoundException
    return user.UserModel
