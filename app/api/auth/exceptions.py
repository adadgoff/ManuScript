from fastapi import status

from app.api.core.base_http_exception import BaseHTTPException


class AuthException(BaseHTTPException):
    pass


class UserAlreadyExistsException(AuthException):
    status_code = status.HTTP_409_CONFLICT
    detail = "User already exists."


class UserIncorrectEmailOrPasswordException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect email or password."


class UserAbsentException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "User is absent."


class UserAccessIncorrectTypeException(AuthException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Permission incorrect type."


class TokenAbsentException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Token absent."


class TokenExpiredException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Token expired."


class TokenIncorrectFormatException(AuthException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect token format."


class AccessDeniedException(AuthException):
    status_code = status.HTTP_403_FORBIDDEN
    detail = "Access denied."
