from pydantic import BaseModel

from app.api.modules.lessons.schemas import SLessonGetOut


class SModuleGetOutBase(BaseModel):
    order: int


class SModuleGetOut(SModuleGetOutBase):
    id: int
    title: str
    description: str
    order: int


class SModuleGetOutWithLessons(SModuleGetOut):
    lessons: list[SLessonGetOut]


class SModulePostIn(BaseModel):
    title: str
    description: str
    classroom_id: int


class SModulePostOut(BaseModel):
    id: int
    title: str
    description: str
