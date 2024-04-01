from app.api.core.base_service import BaseService
from app.api.modules.classrooms.repository import ClassroomRepository


class ClassroomService(BaseService):
    repository = ClassroomRepository

    @classmethod
    async def read_all_with_icon(cls, ids):
        return await cls.repository.read_all_with_icon(ids)
