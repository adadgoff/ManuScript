from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.users_steps.model import UserStepModel


class UserStepRepository(BaseRepository):
    model = UserStepModel

    @classmethod
    async def update_one(cls, user_step: UserStepModel, **data) -> UserStepModel:
        async with async_session_factory(expire_on_commit=False) as session:
            for key, value in data.items():
                setattr(user_step, key, value)
            await session.commit()
            return user_step