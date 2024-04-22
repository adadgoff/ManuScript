from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class StudentException(BaseHTTPException):
    pass


class StudentAlreadyExistException(StudentException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Student already exists in classroom."


class AddingStudentIsCurrentTeacherException(StudentException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Adding student is current teacher. At first remove user from teachers."
