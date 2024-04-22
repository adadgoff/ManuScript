from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class InviteException(BaseHTTPException):
    pass


class InviteNotFoundException(InviteException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Invite not found or expired."


class InviteAlreadyExistException(InviteException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Invite already exists."
