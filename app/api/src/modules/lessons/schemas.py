from pydantic import BaseModel

from src.modules.steps.schemas import SStepGetOut, SStepGetOutBase


class SLessonGetOut(BaseModel):
    id: int
    title: str
    order: int
    module_id: int


class SLessonGetOutWithSteps(SLessonGetOut):
    steps: list[SStepGetOutBase]


class SLessonEditGetOutWithSteps(BaseModel):
    id: int
    order: int
    title: str
    steps: list[SStepGetOut]


class SLessonPostIn(BaseModel):
    title: str
    module_id: int


class SLessonPostOut(BaseModel):
    id: int
    title: str


class SLessonUpdateIn(BaseModel):
    id: int | None
    order: int
    title: str
    module_id: int | None


class SLessonUpdateOut(BaseModel):
    id: int
    order: int
    title: str
    module_id: int
