from pydantic import BaseModel

from app.api.modules.modules.schemas import SModuleGetOutWithLessons
from app.api.services.images.schemas import SImageGetOut


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


class SClassroomDeleteIn(BaseModel):
    id: int


class SClassroomDeleteOut(BaseModel):
    id: int
    title: str
    description: str
