from typing import Sequence

from sqlalchemy import insert, select, RowMapping, literal_column, delete

from src.core.abstract_repository import AbstractRepository
from src.db.async_session_factory import async_session_factory


class BaseRepository(AbstractRepository):
    model = None

    @classmethod
    async def create_one(cls, **data) -> dict:
        async with async_session_factory() as session:
            query = insert(cls.model).values(**data).returning(literal_column('*'))
            result = await session.execute(query)
            await session.commit()
            return result.mappings().one_or_none()

    @classmethod
    async def read_one_or_none(cls, **filter_by) -> RowMapping | None:
        async with async_session_factory() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @classmethod
    async def read_all(cls, **filter_by) -> Sequence[RowMapping]:
        async with async_session_factory(expire_on_commit=False) as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().all()

    @classmethod
    async def update_one(cls, model, **data) -> dict:
        async with async_session_factory(expire_on_commit=False) as session:
            for key, value in data.items():
                setattr(model, key, value)
            session.add(model)
            await session.commit()
            return model

    @classmethod
    async def delete_one(cls, **filter_by) -> dict:
        async with async_session_factory() as session:
            query = delete(cls.model).filter_by(**filter_by).returning(literal_column('*'))
            result = await session.execute(query)
            await session.commit()
            return result.mappings().one_or_none()
