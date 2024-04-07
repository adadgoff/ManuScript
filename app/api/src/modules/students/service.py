from src.core.base_service import BaseService
from src.modules.students.repository import StudentRepository


class StudentService(BaseService):
    repository = StudentRepository
