from sqlalchemy import Column, Integer, String

from app.database import Base


class ClassesInfo(Base):
    __tablename__ = "ClassesInfo"

    ClassId = Column(Integer, primary_key=True, nullable=False)
    ClassName = Column(String, nullable=False)
    ClassDescription = Column(String, nullable=True)
    ClassLogotypeLink = Column(String, nullable=True)
