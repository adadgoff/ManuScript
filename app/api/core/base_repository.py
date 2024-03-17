from sqlalchemy import insert, select

from app.api.db.async_session_factory import async_session_factory


class BaseRepository:
    model = None

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_factory() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_factory() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().all()

    @classmethod
    async def add(cls, **data):
        query = insert(cls.model).values(**data)
        async with async_session_factory() as session:
            await session.execute(query)
            await session.commit()
