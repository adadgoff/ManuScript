from app.api.core.base_service import BaseService
from app.api.modules.lessons.repository import LessonRepository


class LessonService(BaseService):
    repository = LessonRepository
