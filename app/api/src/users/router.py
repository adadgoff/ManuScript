from uuid import UUID

from fastapi import APIRouter, Body, Depends, File, UploadFile
from starlette import status

from src.auth.helpers.token_helper import get_current_user
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel
from src.users.schemas import SUserGetOutWithIcon, SUserUpdateInWithIcon, SUserUpdateOutWithIcon
from src.users.service import UserService

router = APIRouter(
    prefix="/user",
)


@router.get(
    path="/profile",
    response_model=SUserGetOutWithIcon,
    status_code=status.HTTP_200_OK,
    summary="Get user by token.",
    description="Get user by token.",
    tags=["User"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserGetOutWithIcon,
            "description": "User found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
    }
)
async def get_profile(user: UserModel = Depends(get_current_user)):
    user = await UserService.read_one_or_none_with_icon(uuid=user.uuid)
    return user.UserModel


@router.get(
    path="/{user_uuid}",
    response_model=SUserGetOutWithIcon,
    status_code=status.HTTP_200_OK,
    summary="Get user information.",
    description="Get user information by uuid. If user with user_uuid not found/exist, raise UserNotFoundException.",
    tags=["User"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserGetOutWithIcon,
            "description": "User found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
    },
    dependencies=[Depends(get_current_user)],
)
async def get_user(user_uuid: UUID):
    user = await UserService.read_one_or_none_with_icon(uuid=user_uuid)
    if not user:
        raise UserNotFoundException
    return user.UserModel


@router.put(
    path="/update",
    response_model=SUserUpdateOutWithIcon,
    status_code=status.HTTP_200_OK,
    summary="Update user information.",
    description="Update user information.",
    tags=["User"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserUpdateOutWithIcon,
            "description": "User updated successfully.",
        },
    }
)
async def update_user(data: SUserUpdateInWithIcon = Body(),
                      user_icon: UploadFile | str | None = File(None, media_type="image/*"),
                      user: UserModel = Depends(get_current_user)):
    user = (await UserService.read_one_or_none_with_icon(uuid=user.uuid)).UserModel
    updated_user = await UserService.update_user_with_icon(user, data, user_icon)
    return updated_user
