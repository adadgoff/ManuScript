import json
from uuid import UUID

from pydantic import BaseModel, model_validator

from src.modules.users_steps.UserStepStatus import UserStepStatus


class SUserStepGetOut(BaseModel):
    user_uuid: UUID
    step_id: int
    user_answer: str
    status: UserStepStatus
    user_image_uuid: UUID
    teacher_comment: str | None


class SUserStepPostIn(BaseModel):
    step_id: int
    user_answer: str

    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class SUserStepCommentPostIn(BaseModel):
    user_uuid: UUID
    step_id: int
    teacher_comment: str


class SUserStepPostOut(BaseModel):
    user_uuid: UUID
    step_id: int
    user_answer: str
    user_image_uuid: UUID
    status: UserStepStatus
    teacher_comment: str | None
