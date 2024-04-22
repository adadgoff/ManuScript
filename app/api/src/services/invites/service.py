from src.core.base_service import BaseService
from src.services.invites.repository import InviteRepository


class InviteService(BaseService):
    repository = InviteRepository
