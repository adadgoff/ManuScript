from enum import Enum


class UserAccess(Enum):
    NOT_AUTHENTICATED = 0,
    AUTHENTICATED = 1,
    SELF = 2,
    STUDENT = 3,
    TEACHER = 4,
    # ADMIN = 5,  # TODO: maybe implement.
