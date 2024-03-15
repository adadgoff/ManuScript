from sqlalchemy import text

from src.app.db.base import Base
from src.app.db.database import async_engine, async_session_factory
from src.app.users.models import UsersModel


async def test_connection():
    async with async_engine.connect() as conn:
        res = await conn.execute(text("SELECT 1,2,3 union select 4,5,6"))
        print(f"connection: {res.all()}")


async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


async def insert_data():
    async with async_session_factory() as session:
        user_Kostya = UsersModel(email="kdadgoff@mail.ru", username="Kostya", password="228")
        user_Artem = UsersModel(email="adadgoff@mail.ru", username="Artem", password="1337")
        user_Liza = UsersModel(email="SuperL1za@gmail.com", username="Liza", password="777777")
        session.add_all([user_Kostya, user_Artem, user_Liza])
        await session.commit()
