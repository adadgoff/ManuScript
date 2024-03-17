from fastapi import HTTPException, status


class StepException(HTTPException):
    pass


class StepNotFoundException(StepException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Step not found."
