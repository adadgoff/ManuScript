from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.app.config import settings

async_engine = create_async_engine(
    url=settings.DATABASE_URL,
    echo=True,  # TODO: remove from prod.
    pool_size=settings.DATABASE_POOL_SIZE,
    max_overflow=settings.DATABASE_MAX_OVERFLOW,
)

async_session_factory = async_sessionmaker(async_engine)
