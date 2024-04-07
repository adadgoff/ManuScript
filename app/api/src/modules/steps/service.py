from src.core.base_service import BaseService
from src.modules.steps.repository import StepRepository


class StepService(BaseService):
    repository = StepRepository