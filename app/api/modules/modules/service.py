from app.api.core.base_service import BaseService
from app.api.modules.modules.repository import ModuleRepository


class ModuleService(BaseService):
    repository = ModuleRepository
