from app.api.core.base_service import BaseService
from app.api.modules.classrooms.repository import ClassroomRepository


class ClassroomService(BaseService):
    repository = ClassroomRepository

    @classmethod
    async def read_one_or_none_with_icon_and_modules(cls, classroom_id: int):
        return await cls.repository.read_one_or_none_with_icon_and_modules(classroom_id)

    @classmethod
    async def read_all_with_icon(cls, ids: list[int]):
        return await cls.repository.read_all_with_icon(ids)
