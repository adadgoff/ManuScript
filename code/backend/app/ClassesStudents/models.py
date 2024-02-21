from sqlalchemy import Boolean, Column, ForeignKey, String

from app.database import Base


class ClassesStudents(Base):
    __tablename__ = "ClassesStudents"

    Email = Column(String, primary_key=True, nullable=False)
    ClassId = Column(ForeignKey("Classes.ClassId"), nullable=False)
    IsActive = Column(Boolean, nullable=False)
