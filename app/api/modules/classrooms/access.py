from app.api.auth.exceptions import AccessDeniedException
from app.api.modules.classrooms.model import ClassroomModel
from app.api.users.model import UserModel


def check_rights(
        classroom: ClassroomModel,
        user: UserModel,
        is_for_students: bool = False,
        is_for_teachers: bool = False) -> bool:

    result = (
            (is_for_students and classroom.id in map(lambda classroom_: classroom_.id, user.student_classrooms)) or
            (is_for_teachers and classroom.id in map(lambda classroom_: classroom_.id, user.teacher_classrooms))
    )

    if not result:
        raise AccessDeniedException

    return result  # True.
