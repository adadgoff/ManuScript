import json
from uuid import UUID

from pydantic import BaseModel, EmailStr, model_validator

from src.services.images.schemas import SImageGetOut, SImageUpdateIn, SImageUpdateOut


class SUserGetOutWithIcon(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str
    icon: SImageGetOut | None


class SUserUpdateInWithIcon(BaseModel):
    username: str
    password: str
    new_password: str
    icon: SImageUpdateIn | None

    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class SUserUpdateOutWithIcon(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str
    icon: SImageUpdateOut | None
