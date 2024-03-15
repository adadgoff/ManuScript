from sqlalchemy.orm import Mapped

from src.app.db.database import Base, str_1023
from src.app.modules.helper import int_pk


class CommentsModel(Base):
    __tablename__ = "comments"

    id: Mapped[int_pk]
    text: Mapped[str_1023]
    images: ...
    send_time: ...

    sender: ...
