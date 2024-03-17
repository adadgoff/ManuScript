from typing import Annotated

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase

str_5 = Annotated[str, 5]
str_50 = Annotated[str, 50]
str_100 = Annotated[str, 100]
str_320 = Annotated[str, 320]
str_2047 = Annotated[str, 2047]


class Base(DeclarativeBase):
    type_annotation_map = {
        str_5: String(5),
        str_50: String(50),
        str_100: String(100),
        str_320: String(320),
        str_2047: String(2047),
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
