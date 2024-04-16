from src.core.base_service import BaseService
from src.modules.lessons.schemas import SLessonUpdateInForClassroom
from src.modules.modules.model import ModuleModel
from src.modules.modules.repository import ModuleRepository


class ModuleService(BaseService):
    repository = ModuleRepository

    @classmethod
    async def read_one_or_none_with_lessons(cls, **filter_by) -> ModuleModel:
        return await cls.repository.read_one_or_none_with_lessons(**filter_by)

    @classmethod
    async def create_or_update_one_with_lessons(cls,
                                                classroom_id: int,
                                                id: int | None,
                                                order: int,
                                                title: str,
                                                description: str,
                                                lessons: list[SLessonUpdateInForClassroom]) -> ModuleModel:
        if id is None:
            return await cls.repository.create_one(order=order, title=title,  # noqa.
                                                   description=description,
                                                   classroom_id=classroom_id,
                                                   lessons=lessons)

        return await cls.repository.update_one(id=id, order=order, title=title,  # noqa.
                                               description=description,
                                               classroom_id=classroom_id,
                                               lessons=lessons)
