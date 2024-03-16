from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.api.db.base import Base
from app.api.modules.enums.StepStatus import StepStatus


class SolvedSteps(Base):
    __tablename__ = "user_steps"

    user_uuid: Mapped[UUID] = mapped_column(ForeignKey("users.uuid"), primary_key=True)
    step_id: Mapped[UUID] = mapped_column(ForeignKey("steps.id"), primary_key=True)
    status: Mapped[StepStatus] = mapped_column(default=StepStatus.EMPTY_OR_INCORRECT)
