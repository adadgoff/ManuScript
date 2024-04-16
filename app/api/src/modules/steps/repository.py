from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.steps.StepType import StepType
from src.modules.steps.model import StepModel


class StepRepository(BaseRepository):
    model = StepModel

    @classmethod
    async def create_one(cls, order: int, type: StepType,
                         text: str, answer: str | None,
                         lesson_id: int) -> StepModel:
        async with async_session_factory(expire_on_commit=False) as session:
            step = StepModel(
                order=order,
                type=type,
                text=text,
                answer=answer,
                lesson_id=lesson_id,
            )
            session.add(step)
            await session.commit()
            return step
