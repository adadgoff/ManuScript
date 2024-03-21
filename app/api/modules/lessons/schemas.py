from pydantic import BaseModel


class SLessonGetIn(BaseModel):
    id: int


class SLessonGetOut(BaseModel):
    id: int
    title: str
    order: int


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
