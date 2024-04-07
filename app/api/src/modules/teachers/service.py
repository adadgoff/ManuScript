from src.core.base_service import BaseService
from src.modules.teachers.repository import TeacherRepository


class TeacherService(BaseService):
    repository = TeacherRepository
