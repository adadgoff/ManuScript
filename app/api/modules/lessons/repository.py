from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.lessons.model import LessonModel


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
