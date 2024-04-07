from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.lessons.model import LessonModel


class LessonRepository(BaseRepository):
    model = LessonModel

    @classmethod
    async def create_one(cls, title: str, module_id: int) -> LessonModel:
        async with async_session_factory(expire_on_commit=False) as session:
            lesson = LessonModel(
                title=title,
            )
            lesson.module_id = module_id
            session.add(lesson)
            await session.commit()
            return lesson

    @classmethod
    async def read_one_or_none_with_steps(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(LessonModel).filter_by(**filter_by).options(
                joinedload(LessonModel.steps),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()
