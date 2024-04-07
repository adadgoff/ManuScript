from src.core.base_repository import BaseRepository
from src.modules.teachers.model import TeacherModel


class TeacherRepository(BaseRepository):
    model = TeacherModel
