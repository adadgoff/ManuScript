from sqlalchemy import Column, String

from app.database import Base


class Users(Base):
    __tablename__ = "Users"

    Email = Column(String, primary_key=True, nullable=False, unique=True)
    SurnameName = Column(String, nullable=False)
    HashedPassword = Column(String, nullable=False)
