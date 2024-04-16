from uuid import UUID

from pydantic import BaseModel


class SImageGetOut(BaseModel):
    uuid: UUID


class SImagePostOut(BaseModel):
    uuid: UUID
    extension: str

class SImageDeleteOut(BaseModel):
    uuid: UUID
    extension: str