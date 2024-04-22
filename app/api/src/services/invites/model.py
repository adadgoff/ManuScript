from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base


class InviteModel(Base):
    __tablename__ = "invites"

    uuid: Mapped[UUID] = mapped_column(default=uuid4)

    # one to one. child to parent = invite to classroom.
    classroom_id: Mapped[int | None] = mapped_column(ForeignKey("classrooms.id", ondelete="CASCADE"), primary_key=True)
    classroom: Mapped["ClassroomModel"] = relationship(back_populates="invite")
