from pydantic import BaseModel

from app.api.services.images.schemas import SImageGetOut


class SClassroomGetIn(BaseModel):
    id: int


class SClassroomGetOut(BaseModel):
    id: int
    title: str
    description: str
    icon: SImageGetOut | None


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
