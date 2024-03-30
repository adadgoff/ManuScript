from app.api.core.base_repository import BaseRepository
from app.api.modules.students.model import StudentModel


class StudentRepository(BaseRepository):
    model = StudentModel
