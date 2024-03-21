from pydantic import BaseModel


class SClassroomGetIn(BaseModel):
    id: int


class SClassroomGetOut(BaseModel):
    id: int
    title: str
    description: str


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
