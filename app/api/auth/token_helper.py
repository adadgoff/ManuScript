from datetime import datetime, timedelta

from fastapi import Request
from jose import jwt
from pydantic import EmailStr

from app.api.auth.exceptions import UserIncorrectEmailOrPasswordException
from app.api.auth.hasher import verify_password
from app.api.users.repository import UserRepository
from app.config import settings


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def get_access_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise
    return token


async def authenticate_user(email: EmailStr, password: str):
    user = await UserRepository.find_one_or_none(email=email)
    if not (user and verify_password(password, user.UserModel.password)):
        raise UserIncorrectEmailOrPasswordException
    return user
