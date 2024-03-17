from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_320, str_50, str_100


class UserModel(Base):
    __tablename__ = "users"

    uuid: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    email: Mapped[str_320] = mapped_column(unique=True)
    username: Mapped[str_50] = mapped_column()
    password: Mapped[str_100] = mapped_column()

    # one to one. parent to child = user to image.
    icon: Mapped["ImageModel"] = relationship(back_populates="user")

    # one to many. parent to child = user to comments.
    comments: Mapped[list["CommentModel"]] = relationship(back_populates="user")

    # many to many. child to parent = teachers to classes.
    teacher_classrooms: Mapped[list["ClassroomModel"]] = relationship(secondary="teachers", back_populates="teachers")

    # many to many. child to parent = students to classes.
    student_classrooms: Mapped[list["ClassroomModel"]] = relationship(secondary="students", back_populates="students")

    # many to many. parent to child = users to notifications.
    notifications: Mapped[list["NotificationModel"]] = relationship(secondary="users_notifications",
                                                                    back_populates="users")

    # many to many. parent to child = users to steps.
    steps: Mapped[list["StepModel"]] = relationship(secondary="users_steps", back_populates="users")
