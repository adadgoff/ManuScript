from app.api.core.base_service import BaseService
from app.api.users.repository import UserRepository


class UserService(BaseService):
    repository = UserRepository
