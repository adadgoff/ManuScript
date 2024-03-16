from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_2047, str_50
from app.api.modules.enums.StepType import StepType


class StepModel(Base):
    __tablename__ = "steps"

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[StepType]
    text: Mapped[str_2047]
    answer: Mapped[str_50 | None]
    order: Mapped[int]

    # one to many. parent to child = step to images.
    images: Mapped[list["ImageModel"]] = relationship(back_populates="step")

    # one to many. parent to child = step to comments.
    comments: Mapped[list["CommentModel"]] = relationship(back_populates="step")

    # many to one. child to parent = steps to lesson.
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"))
    lesson: Mapped["LessonModel"] = relationship(back_populates="steps")