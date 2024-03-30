from app.api.core.base_service import BaseService
from app.api.modules.students.repository import StudentRepository


class StudentService(BaseService):
    repository = StudentRepository
