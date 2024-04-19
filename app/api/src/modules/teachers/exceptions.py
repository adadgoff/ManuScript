from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class TeacherException(BaseHTTPException):
    pass


class TeacherCountInClassroomException(TeacherException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "At least one teacher must be in classroom."


class TeacherAlreadyExistException(TeacherException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Teacher already exists is classroom."


class TeacherSelfDowngradeException(TeacherException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Teacher is forbidden to downgrade to student by self."


class TeacherSelfRemoveException(TeacherException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Teacher is forbidden to remove self from teachers."


class AddingTeacherIsCurrentStudentException(TeacherException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Adding teacher is current teacher. At first remove user from students."
