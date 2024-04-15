from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.lessons.schemas import SLessonUpdateIn
from src.modules.lessons.service import LessonService
from src.modules.modules.model import ModuleModel


class ModuleRepository(BaseRepository):
    model = ModuleModel

    @classmethod
    async def create_one(cls,
                         order: int,
                         title: str,
                         description: str,
                         classroom_id: int,
                         lessons: list[SLessonUpdateIn]
                         ) -> ModuleModel:
        async with async_session_factory(expire_on_commit=False) as session:
            module_model = ModuleModel(
                order=order,
                title=title,
                description=description,
                classroom_id=classroom_id,
            )
            session.add(module_model)
            await session.commit()

            for lesson in lessons:
                await LessonService.create_one(order=lesson.order, title=lesson.title, module_id=module_model.id)

            return module_model

    @classmethod
    async def read_one_or_none_with_lessons(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(ModuleModel).filter_by(**filter_by).options(
                joinedload(ModuleModel.lessons),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def update_one(cls,  # noqa.
                         id: int,
                         order: int,
                         title: str,
                         description: str,
                         classroom_id: int,
                         lessons: list[SLessonUpdateIn]) -> ModuleModel:
        async with async_session_factory(expire_on_commit=False) as session:
            module_model = (await cls.read_one_or_none_with_lessons(id=id)).ModuleModel

            module_model.order = order
            module_model.title = title
            module_model.description = description
            module_model.classroom_id = classroom_id

            session.add(module_model)
            await session.flush()

            await LessonService.delete_all_by_id(
                ids=[l.id for l in module_model.lessons if l.id not in {l.id for l in lessons}])

            for lesson in lessons:
                if lesson.id:
                    lesson_model = (await LessonService.read_one_or_none(id=lesson.id)).LessonModel
                    await LessonService.update_one(lesson_model, order=lesson.order, title=lesson.title, module_id=id)
                else:
                    await LessonService.create_one(order=lesson.order, title=lesson.title, module_id=id)

            await session.commit()
            return module_model
