from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.enums.StepType import StepType
from app.api.modules.steps.model import StepModel


class StepRepository(BaseRepository):
    model = StepModel

    @classmethod
    async def create_one(cls, type: StepType, lesson_id: int) -> StepModel:
        async with async_session_factory(expire_on_commit=False) as session:
            step = StepModel(
                type=type,
                text="Test text.",
                answer="Test answer.",
            )
            step.lesson_id = lesson_id
            session.add(step)
            await session.commit()
            return step
