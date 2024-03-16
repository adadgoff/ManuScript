from sqlalchemy.ext.asyncio import async_sessionmaker
from app.api.db.async_engine import async_engine

async_session_factory = async_sessionmaker(async_engine)
