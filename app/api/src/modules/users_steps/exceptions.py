from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class UserStepException(BaseHTTPException):
    pass


class UserStepNotFoundException(UserStepException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "UserStep not found (User did not provide answer to Step)."
