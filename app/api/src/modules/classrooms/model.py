from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_100, str_50
from src.services.invites.model import InviteModel


class ClassroomModel(Base):
    __tablename__ = "classrooms"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str_50]
    description: Mapped[str_100]

    # one to one. parent to child = classroom to image.
    icon: Mapped["ImageModel"] = relationship(back_populates="classroom", cascade="all, delete", passive_deletes=True)

    # one to many. parent to child = class to modules.
    modules: Mapped[list["ModuleModel"]] = relationship(back_populates="classroom", cascade="all, delete", passive_deletes=True)

    # many to many. parent to child = class to students.
    students: Mapped[list["UserModel"]] = relationship(secondary="students", back_populates="student_classrooms", cascade="all, delete")

    # many to many. parent to child = classes to teachers.
    teachers: Mapped[list["UserModel"]] = relationship(secondary="teachers", back_populates="teacher_classrooms", cascade="all, delete")

    # one to many. parent to child = class to notifications.
    notifications: Mapped[list["NotificationModel"]] = relationship(back_populates="classroom")

    # one to one. parent to child = classroom to invite.
    invite: Mapped["InviteModel"] = relationship(back_populates="classroom", cascade="all, delete", passive_deletes=True)
