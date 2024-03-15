from uuid import uuid4, UUID

from sqlalchemy.orm import Mapped, mapped_column

from src.app.db.base import Base, str_email


class UsersModel(Base):
    __tablename__ = "users"

    uuid: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    email: Mapped[str_email] = mapped_column(unique=True)
    username: Mapped[str]
    password: Mapped[str]
