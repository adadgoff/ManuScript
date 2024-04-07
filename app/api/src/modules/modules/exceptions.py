from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class ModuleException(BaseHTTPException):
    pass


class ModuleNotFoundException(ModuleException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Module not found."
