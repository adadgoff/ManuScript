from sqlalchemy import Column, Integer

from app.database import Base


class StepsSolved(Base):
    __tablename__ = "StepsSolved"

    Email = Column(Integer, primary_key=True, nullable=False)
    StepId = Column(Integer, nullable=False)
