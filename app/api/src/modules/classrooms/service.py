from src.core.base_service import BaseService
from src.modules.classrooms.repository import ClassroomRepository


class ClassroomService(BaseService):
    repository = ClassroomRepository

    @classmethod
    async def read_one_or_none_with_icon_and_modules(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_icon_and_modules(**filter_by)

    @classmethod
    async def read_all_with_icon(cls, ids: list[int]):
        return await cls.repository.read_all_with_icon(ids)
