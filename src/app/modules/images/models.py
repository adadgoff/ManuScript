from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image

from src.app.db.base import Base


class ImagesModel(Base, Image):
    __tablename__ = "images"

    uuid


    user = relationship("UsersModel", back_populates="images")
