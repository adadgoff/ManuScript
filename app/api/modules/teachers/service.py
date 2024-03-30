from app.api.core.base_service import BaseService
from app.api.modules.teachers.repository import TeacherRepository


class TeacherService(BaseService):
    repository = TeacherRepository
