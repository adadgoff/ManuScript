import json
from uuid import UUID

from pydantic import BaseModel, EmailStr, model_validator

from src.services.images.schemas import SImageGetOut, SImageUpdateIn, SImageUpdateOut


class SUserGetOut(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str


class SUserGetOutWithIcon(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str
    icon: SImageGetOut | None


class SUserUpdateIn(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str


class SUserUpdateOut(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str


class SUserAddIn(BaseModel):
    email: EmailStr


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
