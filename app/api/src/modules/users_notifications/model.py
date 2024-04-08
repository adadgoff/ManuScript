from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.db.base import Base
from src.modules.users_notifications.NotificationStatus import NotificationStatus


class UserNotificationModel(Base):
    __tablename__ = "users_notifications"

    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"), primary_key=True)
    notification_id: Mapped[int] = mapped_column(ForeignKey("notifications.id", ondelete="CASCADE"), primary_key=True)
    status: Mapped[NotificationStatus] = mapped_column(default=NotificationStatus.UNREAD)
