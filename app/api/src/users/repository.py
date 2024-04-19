from typing import Sequence
from uuid import UUID

from sqlalchemy import RowMapping, select
from sqlalchemy.orm import joinedload

from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.classrooms.model import ClassroomModel
from src.modules.lessons.model import LessonModel
from src.modules.modules.model import ModuleModel
from src.services.images.model import ImageModel
from src.users.model import UserModel


class UserRepository(BaseRepository):
    model = UserModel

    @classmethod
    async def read_one_or_none_with_classrooms(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(UserModel).filter_by(**filter_by).options(
                joinedload(UserModel.student_classrooms),
                joinedload(UserModel.teacher_classrooms),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def read_one_or_none_with_lessons(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(UserModel).filter_by(**filter_by).options(
                joinedload(UserModel.student_classrooms).joinedload(ClassroomModel.modules).joinedload(
                    ModuleModel.lessons),
                joinedload(UserModel.teacher_classrooms).joinedload(ClassroomModel.modules).joinedload(
                    ModuleModel.lessons),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def read_one_or_none_with_steps(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(UserModel).filter_by(**filter_by).options(
                joinedload(UserModel.student_classrooms).joinedload(ClassroomModel.modules).joinedload(
                    ModuleModel.lessons).joinedload(LessonModel.steps),
                joinedload(UserModel.teacher_classrooms).joinedload(ClassroomModel.modules).joinedload(
                    ModuleModel.lessons).joinedload(LessonModel.steps),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def read_one_or_none_with_icon(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(UserModel).filter_by(**filter_by).options(
                joinedload(UserModel.icon)
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def read_all(cls, uuids: list[UUID]) -> list[UserModel]:
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(UserModel).filter(UserModel.uuid.in_(uuids))
            result = await session.execute(query)
            return result.unique().mappings().all()