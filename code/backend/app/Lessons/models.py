from sqlalchemy import Column, ForeignKey, Integer

from app.database import Base


class Lessons(Base):
    __tablename__ = "Lessons"

    LessonId = Column(Integer, primary_key=True, nullable=False)
    StepId = Column(ForeignKey("Steps.StepId"), nullable=False)
    StepOrder = Column(Integer, nullable=False)
