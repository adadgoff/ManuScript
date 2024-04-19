import json

from pydantic import BaseModel, model_validator

from src.modules.modules.schemas import SModuleGetOutWithLessons, SModuleUpdateIn, SModuleUpdateOut
from src.services.images.schemas import SImageGetOut, SImageUpdateIn, SImageUpdateOut
from src.users.schemas import SUserAddIn, SUserUpdateIn


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


class SClassroomUpdateIn(BaseModel):
    id: int
    title: str
    description: str
    icon: SImageUpdateIn | None
    modules: list[SModuleUpdateIn]

    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class SClassroomUpdateOut(BaseModel):
    id: int
    title: str
    description: str
    icon: SImageUpdateOut | None
    modules: list[SModuleUpdateOut]


class SClassroomStudentsUpdateIn(BaseModel):
    id: int
    students: list[SUserUpdateIn]


class SClassroomTeachersUpdateIn(BaseModel):
    id: int
    teachers: list[SUserUpdateIn]


class SClassroomStudentAddIn(BaseModel):
    id: int
    student: SUserAddIn


class SClassroomTeacherAddIn(BaseModel):
    id: int
    student: SUserAddIn


class SClassroomDeleteOut(BaseModel):
    id: int
    title: str
    description: str
