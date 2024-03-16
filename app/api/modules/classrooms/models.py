from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_50, str_100


class ClassroomModel(Base):
    __tablename__ = "classrooms"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str_50]
    description: Mapped[str_100]

    # one to many. parent to child = class to modules.
    modules: Mapped[list["ModuleModel"]] = relationship(back_populates="classroom")

    # many to many. parent to child = classes to teachers.
    teachers: Mapped[list["UserModel"]] = relationship(secondary="teachers", back_populates="teacher_classrooms")

    # many to many. parent to child = class to students.
    students: Mapped[list["UserModel"]] = relationship(secondary="students", back_populates="student_classrooms")

    # one to many. parent to child = class to notifications.
    notifications: Mapped[list["NotificationModel"]] = relationship(back_populates="classroom")
