from app.api.core.base_repository import BaseRepository
from app.api.users.models import UserModel


class UserRepository(BaseRepository):
    model = UserModel


