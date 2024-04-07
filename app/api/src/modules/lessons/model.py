from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_50


class LessonModel(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str_50]
    order: Mapped[int] = mapped_column(default=-1)

    # one to many. parent to child = lesson to steps.
    steps: Mapped[list["StepModel"]] = relationship(back_populates="lesson")

    # many to one. child to parent = lessons to module.
    module_id: Mapped[int] = mapped_column(ForeignKey("modules.id", ondelete="CASCADE"))
    module: Mapped["ModuleModel"] = relationship(back_populates="lessons")
