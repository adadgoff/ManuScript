from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_5


class ImageModel(Base):
    __tablename__ = "images"

    uuid: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    extension: Mapped[str_5]

    # one to one. child to parent = image to user.
    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"))
    user: Mapped["UserModel"] = relationship(back_populates="icon")

    # one to one. child to parent = image to classroom.
    classroom_id: Mapped[int | None] = mapped_column(ForeignKey("classrooms.id", ondelete="CASCADE"))
    classroom: Mapped["ClassroomModel"] = relationship(back_populates="icon")

    # many to one. child to parent = images to comment.
    comment_id: Mapped[int | None] = mapped_column(ForeignKey("comments.id", ondelete="CASCADE"))
    comment: Mapped["CommentModel"] = relationship(back_populates="images")

    # many to one. child to parent = images to comment.
    step_id: Mapped[int | None] = mapped_column(ForeignKey("steps.id", ondelete="CASCADE"))
    step: Mapped["StepModel"] = relationship(back_populates="images")
