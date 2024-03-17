from fastapi import status

from app.api.core.base_http_exception import BaseHTTPException


class AuthException(BaseHTTPException):
    pass


class UserAlreadyExistsException(AuthException):
    status_code = status.HTTP_409_CONFLICT
    detail = "User already exists"


class IncorrectEmailOrPasswordException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect email or password"
