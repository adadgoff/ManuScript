from uuid import UUID

from pydantic import BaseModel


class SImageGetOut(BaseModel):
    uuid: UUID | None


class SImagePostOut(BaseModel):
    uuid: UUID
    extension: str
