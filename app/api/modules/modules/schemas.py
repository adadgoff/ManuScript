from pydantic import BaseModel


class SModuleGetIn(BaseModel):
    id: int


class SModuleGetOut(BaseModel):
    id: int
    title: str
    description: str
    order: int


class SModulePostIn(BaseModel):
    title: str
    description: str
    classroom_id: int


class SModulePostOut(BaseModel):
    id: int
    title: str
    description: str


class SModuleDeleteIn(BaseModel):
    id: int

class SModuleDeleteOut(BaseModel):
    id: int