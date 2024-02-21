from sqlalchemy import Column, Integer, String
from app.database import Base

class Users(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, nullable=False)
    surname_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
