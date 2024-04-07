from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.base import Base, str_50
from src.modules.enums.StepStatus import StepStatus


class UserStepModel(Base):
    __tablename__ = "users_steps"

    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid"), primary_key=True)
    step_id: Mapped[UUID] = mapped_column(ForeignKey("steps.id"), primary_key=True)
    user_text: Mapped[str_50]
    status: Mapped[StepStatus] = mapped_column(default=StepStatus.EMPTY_OR_INCORRECT)

    # one to one. parent to child = user_step to image.
    image_uuid: Mapped[UUID] = mapped_column(ForeignKey("images.uuid"))
    image: Mapped["ImageModel"] = relationship("ImageModel", back_populates="user_step")
