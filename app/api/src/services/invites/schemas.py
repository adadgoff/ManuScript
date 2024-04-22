from uuid import UUID

from pydantic import BaseModel


class SInviteGetOut(BaseModel):
    uuid: UUID
    classroom_id: int


class SInvitePostOut(BaseModel):
    uuid: UUID
    classroom_id: int


class SInviteUpdateOut(BaseModel):
    uuid: UUID
    classroom_id: int


class SInviteDeleteOut(BaseModel):
    uuid: UUID
    classroom_id: int
