from app.repository.base import BaseRepository
from app.Users.models import Users


class UsersRepository(BaseRepository):
    model = Users
