from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_1_048_575, str_50
from src.modules.users_steps.UserStepStatus import UserStepStatus


class UserStepModel(Base):
    __tablename__ = "users_steps"

    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid", ondelete="CASCADE"), primary_key=True)
    step_id: Mapped[int] = mapped_column(ForeignKey("steps.id", ondelete="CASCADE"), primary_key=True)
    user_answer: Mapped[str_50]
    status: Mapped[UserStepStatus]
    teacher_comment: Mapped[str_1_048_575 | None]

    # one to one. parent to child = user_step to image.
    user_image_uuid: Mapped[UUID] = mapped_column(ForeignKey("images.uuid"))
    user_image: Mapped["ImageModel"] = relationship("ImageModel", back_populates="user_step")
