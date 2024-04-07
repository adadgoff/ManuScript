from typing import Sequence

from sqlalchemy import RowMapping

from src.core.base_repository import BaseRepository


class BaseService:
    """CRUD base service"""
    repository: BaseRepository = None

    @classmethod
    async def create_one(cls, **data) -> dict:
        return await cls.repository.create_one(**data)

    @classmethod
    async def read_one_or_none(cls, **filter_by) -> RowMapping | None:
        return await cls.repository.read_one_or_none(**filter_by)

    @classmethod
    async def read_all(cls, **filter_by) -> Sequence[RowMapping]:
        return await cls.repository.read_all(**filter_by)

    @classmethod
    async def update_one(cls):
        raise NotImplementedError

    @classmethod
    async def delete_one(cls, **filter_by) -> dict:
        return await cls.repository.delete_one(**filter_by)
