from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_50, str_100


class ModuleModel(Base):
    __tablename__ = "modules"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str_50]
    description: Mapped[str_100]
    order: Mapped[int]

    # one to many. parent to child = module to lessons.
    lessons: Mapped[list["LessonModel"]] = relationship(back_populates="module")

    # many to one. child to parent = modules to classroom.
    classroom_id: Mapped[int] = mapped_column(ForeignKey("classrooms.id", ondelete="CASCADE"))
    classroom: Mapped["ClassroomModel"] = relationship(back_populates="modules")
