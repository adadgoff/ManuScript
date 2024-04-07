from src.core.base_service import BaseService
from src.modules.modules.repository import ModuleRepository


class ModuleService(BaseService):
    repository = ModuleRepository
