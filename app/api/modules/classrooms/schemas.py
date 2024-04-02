from pydantic import BaseModel

from app.api.modules.modules.schemas import SModuleGetOut
from app.api.services.images.schemas import SImageGetOut


class SClassroomGetOut(BaseModel):
    id: int
    title: str
    description: str
    icon: SImageGetOut | None


class SClassroomInfoGetOut(SClassroomGetOut):
    modules: list[SModuleGetOut]


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
