from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.db.base import Base


class StudentModel(Base):
    __tablename__ = "students"

    classroom_id: Mapped[int] = mapped_column(ForeignKey("classrooms.id", ondelete="CASCADE"), primary_key=True)
    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"), primary_key=True)
