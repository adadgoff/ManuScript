from uuid import UUID

from pydantic import BaseModel


class SClassroomPost(BaseModel):
    title: str
    description: str

    # modules: list[int]
    #
    # teachers: list[UUID]
    # students: list[UUID]
    #
    # notifications: list[int]

    # TODO: teachers, students etc.


class SClassroomGet(SClassroomPost):
    id: int
