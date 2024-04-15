from datetime import datetime
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_1_048_575


class CommentModel(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str_1_048_575]
    send_time: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    # one to many. parent to child = comment to images.
    images: Mapped[list["ImageModel"]] = relationship(back_populates="comment")

    # many to one. child to parent = comments to user.
    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"))
    user: Mapped["UserModel"] = relationship(back_populates="comments")

    # many to one. child to parent = comments to step.
    step_id: Mapped[int] = mapped_column(ForeignKey("steps.id", ondelete="CASCADE"))
    step: Mapped["StepModel"] = relationship(back_populates="comments")
