from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class ClassroomException(BaseHTTPException):
    pass


class ClassroomNotFoundException(ClassroomException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Classroom not found."


class ClassroomWithoutTeachersException(ClassroomException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Classroom is not allowed to exist without teachers. You may delete classroom."
