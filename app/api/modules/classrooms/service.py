from app.api.core.base_service import BaseService
from app.api.modules.classrooms.repository import ClassroomRepository


class ClassroomService(BaseService):
    repository = ClassroomRepository
