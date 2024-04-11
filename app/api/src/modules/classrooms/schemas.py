from pydantic import BaseModel

from src.modules.modules.schemas import SModuleGetOutWithLessons
from src.services.images.schemas import SImageGetOut


class SClassroomGetOut(BaseModel):
    id: int
    title: str
    description: str
    icon: SImageGetOut | None


class SClassroomGetOutWithModules(SClassroomGetOut):
    modules: list[SModuleGetOutWithLessons]


class SClassroomPostIn(BaseModel):
    title: str
    description: str


class SClassroomPostOut(BaseModel):
    id: int
    title: str
    description: str


class SClassroomDeleteOut(BaseModel):
    id: int
    title: str
    description: str
