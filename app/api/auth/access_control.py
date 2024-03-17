from uuid import UUID

from fastapi import Depends
from jose import jwt, ExpiredSignatureError, JWTError

from app.api.auth.exceptions import TokenExpiredException, TokenIncorrectFormatException, UserAbsentException
from app.api.auth.token_helper import get_access_token
from app.api.users.repository import UserRepository
from app.config import settings


class access_control:  # noqa
    def __init__(self):
        pass

    def __call__(self, *args, **kwargs):
        pass

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

        user = await UserRepository.find_one_or_none(uuid=UUID(user_uuid))
        if not user:
            raise UserAbsentException

        return user
