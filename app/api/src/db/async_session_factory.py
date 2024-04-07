from sqlalchemy.ext.asyncio import async_sessionmaker
from src.db.async_engine import async_engine

async_session_factory = async_sessionmaker(async_engine)
