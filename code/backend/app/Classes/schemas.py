from pydantic import BaseModel


class SClass(BaseModel):
    ClassId: int
    ModuleId: int
    ModuleOrder: int
