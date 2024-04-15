from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_1_048_575, str_50
from src.modules.steps.StepType import StepType


class StepModel(Base):
    __tablename__ = "steps"

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[StepType]
    text: Mapped[str_1_048_575]
    answer: Mapped[str_50 | None]
    order: Mapped[int]

    # one to many. parent to child = step to images.
    images: Mapped[list["ImageModel"]] = relationship(back_populates="step")

    # one to many. parent to child = step to comments.
    comments: Mapped[list["CommentModel"]] = relationship(back_populates="step")

    # many to one. child to parent = steps to lesson.
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"))
    lesson: Mapped["LessonModel"] = relationship(back_populates="steps")

    # many to many. child to parent = steps to users.
    users: Mapped[list["UserModel"]] = relationship(secondary="users_steps", back_populates="steps",
                                                    cascade="all, delete", passive_deletes=True)
