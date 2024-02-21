from sqlalchemy import Column, ForeignKey, Integer, String

from app.database import Base


class Classes(Base):
    __tablename__ = "Classes"

    ClassId = Column(Integer, primary_key=True, nullable=False)
    ModuleId = Column(ForeignKey("Modules.ModuleId"), nullable=False)
    ModuleOrder = Column(Integer, nullable=False)
