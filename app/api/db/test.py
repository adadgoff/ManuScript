from app.api.db.async_engine import async_engine
from app.api.db.base import Base

from app.api.modules.comments.models import CommentModel    # noqa
from app.api.services.images.models import ImageModel       # noqa
from app.api.users.models import UserModel                  # noqa


async def init_db():
    print(Base.metadata.tables)
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
