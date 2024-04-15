from pydantic import BaseModel

from src.modules.lessons.schemas import SLessonGetOut, SLessonUpdateIn, SLessonUpdateOut


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


class SModuleUpdateIn(BaseModel):
    id: int | None
    order: int
    title: str
    description: str
    lessons: list[SLessonUpdateIn]


class SModuleUpdateOut(BaseModel):
    id: int
    order: int
    title: str
    description: str
    lessons: list[SLessonUpdateOut]
