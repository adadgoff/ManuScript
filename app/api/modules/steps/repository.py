from app.api.core.base_repository import BaseRepository
from app.api.modules.steps.models import StepModel


class StepRepository(BaseRepository):
    model = StepModel