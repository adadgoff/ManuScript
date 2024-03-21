from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.classrooms.model import ClassroomModel
from app.api.modules.teachers.model import TeacherModel
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

    # @classmethod  # TODO: fix!!!
    # async def delete_one(cls, id: int) -> ClassroomModel:
    #     async with async_session_factory(expire_on_commit=False) as session:
    #
