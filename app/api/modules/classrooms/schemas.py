from uuid import UUID

from pydantic import BaseModel


class SClassroomInfo(BaseModel):
    id: int
    title: str
    description: str

    # modules: list[int]
    #
    # teachers: list[UUID]
    # students: list[UUID]
    #
    # notifications: list[int]

    # TODO: teachers, students etc.
