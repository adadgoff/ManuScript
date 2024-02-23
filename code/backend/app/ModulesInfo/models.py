from sqlalchemy import Column, Integer, String

from app.database import Base


class ModulesInfo(Base):
    __tablename__ = "ModulesInfo"

    ModuleId = Column(Integer, primary_key=True, nullable=False, unique=True)
    ModuleName = Column(String, nullable=False)
    ModuleDescription = Column(String, nullable=True)
