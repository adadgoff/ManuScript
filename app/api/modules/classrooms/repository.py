from app.api.core.base_repository import BaseRepository
from app.api.modules.classrooms.models import ClassroomModel


class ClassroomRepository(BaseRepository):
    model = ClassroomModel