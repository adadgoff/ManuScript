from uuid import UUID

from src.core.base_service import BaseService
from src.modules.users_steps.repository import UserStepRepository


class UserStepService(BaseService):
    repository = UserStepRepository

    @classmethod
    async def create_or_update_one(cls, user_uuid: UUID, step_id: int, **data):
        existing_user_step = await cls.repository.read_one_or_none(user_uuid=user_uuid, step_id=step_id)

        if not existing_user_step:
            user_step = await cls.repository.create_one(**data)
            return user_step

        await cls.repository.update_one(existing_user_step.UserStepModel, **data)
        return existing_user_step
