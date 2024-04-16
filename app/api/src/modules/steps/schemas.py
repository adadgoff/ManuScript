from pydantic import BaseModel

from src.modules.steps.StepType import StepType


class SStepGetOutBase(BaseModel):
    id: int
    order: int


class SStepGetOut(SStepGetOutBase):
    type: StepType
    text: str
    answer: str | None


class SStepPostIn(BaseModel):
    type: StepType
    lesson_id: int


class SStepPostOut(BaseModel):
    id: int
    type: StepType
    lesson_id: int


class SStepUpdateIn(BaseModel):
    id: int | None
    order: int
    type: StepType
    text: str
    answer: str | None


class SStepUpdateOut(BaseModel):
    id: int
    order: int
    type: StepType
    text: str
    answer: str | None
