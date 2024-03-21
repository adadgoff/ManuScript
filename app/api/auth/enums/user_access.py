from enum import Enum


class UserAccess(Enum):
    NOT_AUTHENTICATED = 2 ** 0,
    AUTHENTICATED = 2 ** 1,
    SELF = 2 ** 2,
    STUDENTS_AND_TEACHERS = 2 ** 3,
    TEACHERS = 2 ** 4,
