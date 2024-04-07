from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class StepException(BaseHTTPException):
    pass


class StepNotFoundException(StepException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Step not found."


class StepIncorrectTypeException(StepException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Step type is not TASK."
