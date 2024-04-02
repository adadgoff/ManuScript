from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.classrooms.model import ClassroomModel
from app.api.modules.modules.model import ModuleModel
from app.api.users.model import UserModel


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

    @classmethod
    async def read_one_or_none_with_icon_and_modules(cls, classroom_id: int):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(ClassroomModel).filter_by(id=classroom_id).options(
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
