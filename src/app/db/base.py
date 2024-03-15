from typing import Annotated

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase

str_1023 = Annotated[str, 1023]
str_email = Annotated[str, 320]


class Base(DeclarativeBase):
    type_annotation_map = {
        str_1023: String(1023),
        str_email: String(320),
    }

    repr_cols_num = 3
    repr_cols = tuple()

    def __repr__(self):
        """Relationships не используются в repr(), т.к. могут вести к неожиданным подгрузкам"""
        cols = []
        for idx, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or idx < self.repr_cols_num:
                cols.append(f"{col}={getattr(self, col)}")

        return f"<{self.__class__.__name__} {', '.join(cols)}>"
