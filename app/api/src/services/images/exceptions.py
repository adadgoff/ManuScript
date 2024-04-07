from fastapi import status

from src.core.base_http_exception import BaseHTTPException


class ImageException(BaseHTTPException):
    pass


class ImageNotFoundException(ImageException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Image not found."


class ImageIncorrectExtensionException(ImageException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Image extension is not correct."