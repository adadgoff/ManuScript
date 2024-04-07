from src.core.base_repository import BaseRepository
from src.modules.students.model import StudentModel


class StudentRepository(BaseRepository):
    model = StudentModel
