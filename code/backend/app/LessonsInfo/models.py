from sqlalchemy import Column, Integer, String

from app.database import Base


class LessonsInfo(Base):
    __tablename__ = "LessonsInfo"

    LessonId = Column(Integer, primary_key=True, nullable=False)
    LessonName = Column(String, nullable=False)
