from datetime import datetime
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.api.db.base import Base, str_1023


class CommentModel(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str_1023]
    send_time: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    # many to one. child to parent = comments to user.
    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"))
    user: Mapped["UserModel"] = relationship(back_populates="comments")

    # one to many. parent to child = comment to images.
    images: Mapped[list["ImageModel"]] = relationship(back_populates="comment")
