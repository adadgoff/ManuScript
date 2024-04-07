from uuid import UUID

from fastapi import UploadFile
from pydantic import BaseModel

from src.modules.enums.StepStatus import StepStatus


class SUserStepPostIn(BaseModel):
    user_uuid: UUID
    answer_text: str
    answer_img: UploadFile  # TODO: how to work with files?
    step_id: int


class SUserStepPostOut(BaseModel):
    user_uuid: UUID
    step_id: int
    user_answer: str
    user_image_uuid: UUID
    status: StepStatus
