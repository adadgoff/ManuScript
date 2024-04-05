from app.api.core.base_service import BaseService
from app.api.users.repository import UserRepository


class UserService(BaseService):
    repository = UserRepository

    @classmethod
    async def read_one_or_none_with_classrooms(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_classrooms(**filter_by)

    @classmethod
    async def read_one_or_none_with_classrooms_modules_and_lessons(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_classrooms_modules_and_lessons(**filter_by)
