from sqlalchemy import Column, Integer, String

from app.database import Base


class Steps(Base):
    __tablename__ = "Steps"

    StepId = Column(Integer, primary_key=True, nullable=False, unique=True)
    StepContentType = Column(String, nullable=False)
    StepDescription = Column(String, nullable=False)
