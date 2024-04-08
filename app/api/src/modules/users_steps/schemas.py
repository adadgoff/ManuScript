import json
from uuid import UUID

from pydantic import BaseModel, model_validator

from src.modules.users_steps.UserStepStatus import UserStepStatus


class SUserStepGetIn(BaseModel):
    step_id: int


class SUserStepGetOut(BaseModel):
    user_answer: str
    status: UserStepStatus
    user_image_uuid: UUID


class SUserStepPostIn(BaseModel):
    step_id: int
    user_answer: str

    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class SUserStepPostOut(BaseModel):
    user_uuid: UUID
    step_id: int
    user_answer: str
    user_image_uuid: UUID
    status: UserStepStatus
