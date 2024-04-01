from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.classrooms.model import ClassroomModel
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
    async def read_all_with_icon(cls, ids):
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(ClassroomModel).filter(ClassroomModel.id.in_(ids)).options(joinedload(ClassroomModel.icon))
            result = await session.execute(query)
            return result.mappings().all()

    # @classmethod  # TODO: fix!!!
    # async def delete_one(cls, id: int) -> ClassroomModel:
    #     async with async_session_factory(expire_on_commit=False) as session:
    #
