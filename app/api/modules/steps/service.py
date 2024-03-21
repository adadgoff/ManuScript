from app.api.core.base_service import BaseService
from app.api.modules.steps.repository import StepRepository


class StepService(BaseService):
    repository = StepRepository