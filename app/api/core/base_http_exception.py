from fastapi import HTTPException, status


class BaseHTTPException(HTTPException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    detail = f"Something went wrong with {__name__.replace('Exception', '').lower()}."

    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)
