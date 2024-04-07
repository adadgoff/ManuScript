from src.core.base_service import BaseService
from src.modules.lessons.repository import LessonRepository


class LessonService(BaseService):
    repository = LessonRepository

    @classmethod
    async def read_one_or_none_with_steps(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_steps(**filter_by)