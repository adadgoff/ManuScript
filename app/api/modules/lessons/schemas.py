from pydantic import BaseModel

from app.api.modules.steps.schemas import SStepGetOut


# TODO: decide what's better.
# class SLessonGetIn(BaseModel):
#     id: int


class SLessonGetOut(BaseModel):
    id: int
    title: str
    order: int


class SLessonGetOutWithSteps(SLessonGetOut):
    steps: list[SStepGetOut]


class SLessonPostIn(BaseModel):
    title: str
    module_id: int


class SLessonPostOut(BaseModel):
    id: int
    title: str


class SLessonDeleteIn(BaseModel):
    id: int


class SLessonDeleteOut(BaseModel):
    id: int
