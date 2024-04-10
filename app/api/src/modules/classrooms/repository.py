from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.modules.classrooms.model import ClassroomModel
from src.modules.modules.model import ModuleModel
from src.users.model import UserModel


class ClassroomRepository(BaseRepository):
    model = ClassroomModel

    @classmethod
    async def create_one(cls, title: str, description: str, user: UserModel) -> ClassroomModel:
        async with async_session_factory(expire_on_commit=False) as session:
            classroom = ClassroomModel(
                title=title,
                description=description,
            )
            classroom.teachers.append(user)
            session.add(classroom)
            await session.commit()
            return classroom

    # TODO: do with **filter_by.
    @classmethod
    async def read_one_or_none_with_icon_and_modules(cls, **filter_by):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(ClassroomModel).filter_by(**filter_by).options(
                joinedload(ClassroomModel.icon),
                joinedload(ClassroomModel.modules).joinedload(ModuleModel.lessons),
            )
            result = await session.execute(query)
            return result.unique().mappings().one_or_none()

    @classmethod
    async def read_all_with_icon(cls, ids: list[int]):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(ClassroomModel).filter(ClassroomModel.id.in_(ids)).options(joinedload(ClassroomModel.icon))
            result = await session.execute(query)
            return result.unique().mappings().all()
