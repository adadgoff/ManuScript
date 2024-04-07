from sqlalchemy.ext.asyncio import create_async_engine

from src.config import settings

async_engine = create_async_engine(
    url=settings.DATABASE_URL,
    # echo=True,  # TODO: remove from prod.
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_OVERFLOW,
)
