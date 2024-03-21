from abc import ABC, abstractmethod


class AbstractRepository(ABC):
    @abstractmethod
    async def create_one(self):
        raise NotImplementedError

    @abstractmethod
    async def read_one_or_none(self):
        raise NotImplementedError

    @abstractmethod
    async def read_all(self):
        raise NotImplementedError
