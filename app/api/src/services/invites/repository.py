from src.core.base_repository import BaseRepository
from src.db.async_session_factory import async_session_factory
from src.services.invites.model import InviteModel


class InviteRepository(BaseRepository):
    model = InviteModel
