from uuid import UUID

from pydantic import BaseModel

from app.api.modules.enums.StepType import StepType


class SStepGetIn(BaseModel):
    id: int


class SStepGetOut(BaseModel):
    id: int
    type: StepType
    text: str
    answer: str | None
    order: int


class SStepGetOutWithImages(BaseModel):
    image_uuids: list[UUID]


class SStepPostIn(BaseModel):
    type: StepType
    lesson_id: int


class SStepPostOut(BaseModel):
    id: int
    type: StepType
    lesson_id: int


class SStepDeleteIn(BaseModel):
    id: int


class SStepDeleteOut(BaseModel):
    id: int
