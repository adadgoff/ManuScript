from app.repository.base import BaseRepository
from app.Classes.models import Classes


class ClassesRepository(BaseRepository):
    model = Classes
