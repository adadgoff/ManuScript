from app.api.core.base_repository import BaseRepository
from app.api.db.async_session_factory import async_session_factory
from app.api.modules.modules.model import ModuleModel


class ModuleRepository(BaseRepository):
    model = ModuleModel

    @classmethod
    async def create_one(cls, title: str, description: str, classroom_id: int) -> ModuleModel:
        async with async_session_factory(expire_on_commit=False) as session:
            module = ModuleModel(
                title=title,
                description=description,
            )
            module.classroom_id = classroom_id
            session.add(module)
            await session.commit()
            return module
