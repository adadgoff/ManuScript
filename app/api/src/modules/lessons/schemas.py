from pydantic import BaseModel

from src.modules.steps.schemas import SStepGetOutBase


class SLessonGetOut(BaseModel):
    id: int
    title: str
    order: int
    module_id: int


class SLessonGetOutWithSteps(SLessonGetOut):
    steps: list[SStepGetOutBase]


class SLessonPostIn(BaseModel):
    title: str
    module_id: int


class SLessonPostOut(BaseModel):
    id: int
    title: str


class SLessonDeleteOut(BaseModel):
    id: int
