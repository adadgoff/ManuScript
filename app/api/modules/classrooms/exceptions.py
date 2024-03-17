from fastapi import status

from app.api.core.base_http_exception import BaseHTTPException


class ClassroomException(BaseHTTPException):
    pass


class ClassroomNotFoundException(ClassroomException):
    status_code = status.HTTP_404_NOT_FOUND,
    detail = "Classroom not found."
