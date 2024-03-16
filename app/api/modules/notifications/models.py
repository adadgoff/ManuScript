from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.api.db.base import Base, str_100


class NotificationModel(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str_100]
    send_time: Mapped[datetime] = mapped_column(default=datetime.utcnow())

    # many to one. child to parent = notifications to classroom.
    classroom_id: Mapped[int] = mapped_column(ForeignKey("classrooms.id", ondelete="CASCADE"))
    classroom: Mapped["ClassroomModel"] = relationship(back_populates="notifications")

    # many to many. child to parent = notifications to users.
    users: Mapped["UserModel"] = relationship(secondary="user_notifications", back_populates="notifications")