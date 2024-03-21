from fastapi import APIRouter, Response
from starlette import status

from app.api.auth.exceptions import UserAlreadyExistsException, UserIncorrectEmailOrPasswordException
from app.api.auth.hasher import get_password_hash
from app.api.auth.schemas import SAuthRegister, SAuthLogin, SAuthEmail, SAuthAccessToken
from app.api.auth.token_helper import authenticate_user, create_access_token
from app.api.users.service import UserService

router = APIRouter()


@router.post(
    path="/registration",
    response_model=SAuthEmail,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user.",
    description="Register a new user.",
    tags=["Auth", "User"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SAuthRegister,
            "description": "User created successfully.",
        },
        UserAlreadyExistsException.status_code: {
            "model": None,
            "description": UserAlreadyExistsException.detail,
        }
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
    tags=["Auth", "User"],
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
    response.set_cookie("access_token", access_token, httponly=True)
    return {"access_token": access_token}


@router.post(
    path="/logout",
    response_model=None,
    status_code=status.HTTP_200_OK,
    summary="Logout.",
    description="Logout user in API.",
    tags=["Auth", "User"],
    responses={
        status.HTTP_200_OK: {
            "model": None,
            "description": "User logged out successfully.",
        },
    }
)
async def logout(response: Response):
    return response.delete_cookie("access_token")
