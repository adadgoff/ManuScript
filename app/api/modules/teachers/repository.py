from app.api.core.base_repository import BaseRepository
from app.api.modules.teachers.model import TeacherModel


class TeacherRepository(BaseRepository):
    model = TeacherModel
