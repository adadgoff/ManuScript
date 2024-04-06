from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.classrooms.model import ClassroomModel
from app.api.modules.lessons.model import LessonModel
from app.api.modules.modules.model import ModuleModel
from app.api.modules.steps.model import StepModel
from app.api.users.model import UserModel


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
