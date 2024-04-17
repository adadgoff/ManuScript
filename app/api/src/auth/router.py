from datetime import datetime, timedelta

from fastapi import APIRouter, Response
from starlette import status

from src.auth.exceptions import UserAlreadyExistsException, UserIncorrectEmailOrPasswordException
from src.auth.helpers.hasher_helper import get_password_hash
from src.auth.helpers.token_helper import authenticate_user, create_access_token
from src.auth.schemas import SAuthAccessToken, SAuthEmail, SAuthLogin, SAuthRegister
from src.config import settings
from src.users.service import UserService

router = APIRouter()


@router.post(
    path="/register",
    response_model=SAuthEmail,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user.",
    description="Register a new user.",
    tags=["Auth"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SAuthRegister,
            "description": "User created successfully.",
        },
        UserAlreadyExistsException.status_code: {
            "model": None,
            "description": UserAlreadyExistsException.detail,
        },
    }
)
async def register(user_data: SAuthRegister):
    existing_user = await UserService.read_one_or_none(email=user_data.email)
    if existing_user:
        raise UserAlreadyExistsException
    hashed_password = get_password_hash(user_data.password)
    created_user = await UserService.create_one(email=user_data.email, username=user_data.username,
                                                password=hashed_password)
    return created_user


@router.post(
    path="/login",
    response_model=SAuthAccessToken,
    status_code=status.HTTP_200_OK,
    summary="Login user in API.",
    description="Login user in API.",
    tags=["Auth"],
    responses={
        status.HTTP_200_OK: {
            "model": SAuthAccessToken,
            "description": "User logged in successfully.",
        },
        UserIncorrectEmailOrPasswordException.status_code: {
            "model": None,
            "description": UserIncorrectEmailOrPasswordException.detail,
        }
    }
)
async def login(response: Response, user_data: SAuthLogin):
    user = await authenticate_user(user_data.email, user_data.password)
    access_token = create_access_token({"sub": str(user.UserModel.uuid)})
    response.set_cookie("access_token", access_token, httponly=True,
                        max_age=settings.ACCESS_TOKEN_EXPIRE_DAYS * 24 * 60 * 60)
    return {"access_token": access_token}


@router.post(
    path="/logout",
    response_model=None,
    status_code=status.HTTP_200_OK,
    summary="Logout.",
    description="Logout user in API.",
    tags=["Auth"],
    responses={
        status.HTTP_200_OK: {
            "model": None,
            "description": "User logged out successfully.",
        },
    }
)
async def logout(response: Response):
    return response.delete_cookie("access_token")
