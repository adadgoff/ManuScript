from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class UserException(BaseHTTPException):
    pass


class UserNotFoundException(UserException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "User not found."


class UserUpdatePasswordException(UserException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Password validated with error."
