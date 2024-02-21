from sqlalchemy import Column, ForeignKey, String

from app.database import Base


class ClassesTeachers(Base):
    __tablename__ = "ClassesTeachers"

    Email = Column(String, primary_key=True, nullable=False)
    ClassId = Column(ForeignKey("Classes.ClassId"), nullable=False)
