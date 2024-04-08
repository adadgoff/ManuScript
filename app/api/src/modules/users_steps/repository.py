from src.core.base_repository import BaseRepository
from src.modules.users_steps.model import UserStepModel


class UserStepRepository(BaseRepository):
    model = UserStepModel
