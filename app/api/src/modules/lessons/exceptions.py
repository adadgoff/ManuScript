from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class LessonException(BaseHTTPException):
    pass


class LessonNotFoundException(LessonException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Lesson not found."
