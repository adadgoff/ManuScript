from fastapi import status

from app.api.core.base_http_exception import BaseHTTPException


class UserException(BaseHTTPException):
    pass


class UserNotFoundException(UserException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "User not found."
