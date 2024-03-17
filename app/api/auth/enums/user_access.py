from enum import Enum


class UserAccess(Enum):
    view_free = 0,
    view_authenticated = 1,
    view_self = 2,
    view_student = 3,
    view_teacher = 4,
    # view_admin = 5,  # TODO: maybe implement.
