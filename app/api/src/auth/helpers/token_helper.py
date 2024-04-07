from datetime import datetime, timedelta
from uuid import UUID

from fastapi import Depends, Request
from jose import jwt, ExpiredSignatureError, JWTError
from pydantic import EmailStr

from src.auth.exceptions import TokenExpiredException, TokenIncorrectFormatException, UserAbsentException
from src.auth.exceptions import UserIncorrectEmailOrPasswordException, TokenAbsentException
from src.auth.helpers.hasher_helper import verify_password
from src.users.service import UserService
from src.config import settings


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt


def get_access_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise TokenAbsentException
    return token


async def authenticate_user(email: EmailStr, password: str):
    user = await UserService.read_one_or_none(email=email)
    if not (user and verify_password(password, user.UserModel.password)):
        raise UserIncorrectEmailOrPasswordException
    return user


async def get_current_user(token: str = Depends(get_access_token)):
    try:
        # key "exp" is automatically checked by the jwt.decode command, so you don't need to check it separately.
        payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
    except ExpiredSignatureError:
        raise TokenExpiredException
    except JWTError:
        raise TokenIncorrectFormatException

    user_uuid: str = payload.get("sub")
    if not user_uuid:
        raise UserAbsentException

    user = await UserService.read_one_or_none(uuid=UUID(user_uuid))
    if not user:
        raise UserAbsentException

    return user.UserModel
