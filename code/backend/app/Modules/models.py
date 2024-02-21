from sqlalchemy import Column, ForeignKey, Integer

from app.database import Base


class Modules(Base):
    __tablename__ = "Modules"

    ModuleId = Column(Integer, primary_key=True, nullable=False)
    LessonId = Column(ForeignKey("Lessons.LessonId"), nullable=False)
    LessonOrder = Column(Integer, nullable=False)
