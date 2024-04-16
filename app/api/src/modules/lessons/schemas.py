from pydantic import BaseModel

from src.modules.steps.schemas import SStepGetOut, SStepGetOutBase, SStepUpdateIn, SStepUpdateOut


class SModuleGetOutWithClassroomId(BaseModel):
    classroom_id: int


class SLessonGetOut(BaseModel):
    id: int
    title: str
    order: int
    module_id: int


class SLessonGetOutWithSteps(SLessonGetOut):
    steps: list[SStepGetOutBase]


class SLessonEditGetOutWithSteps(BaseModel):
    id: int
    order: int
    title: str
    steps: list[SStepGetOut]


class SLessonPostIn(BaseModel):
    title: str
    module_id: int


class SLessonPostOut(BaseModel):
    id: int
    title: str


class SLessonUpdateInForClassroom(BaseModel):
    id: int | None
    order: int
    title: str
    module_id: int | None


class SLessonUpdateOutForClassroom(BaseModel):
    id: int
    order: int
    title: str
    module_id: int


class SLessonUpdateInForLesson(BaseModel):
    id: int
    title: str
    steps: list[SStepUpdateIn]


class SLessonUpdateOutForLesson(BaseModel):
    id: int
    title: str
    steps: list[SStepUpdateOut]


class SLessonDeleteOut(BaseModel):
    id: int
    title: str
    module: SModuleGetOutWithClassroomId
