from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.classrooms.models import ClassroomModel
from app.api.modules.classrooms.schemas import SClassroomPost
from app.api.users.models import UserModel


class ClassroomRepository(BaseRepository):
    model = ClassroomModel

    @classmethod
    async def create(cls, data: SClassroomPost, user: UserModel):
        async with async_session_factory() as session:
            classroom = ClassroomModel(title=data.title, description=data.description)
            user.teacher_classrooms.append(classroom)
            classroom.teachers.append(user)
            session.add(classroom)
            await session.commit()
