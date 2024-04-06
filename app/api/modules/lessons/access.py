from app.api.auth.exceptions import AccessDeniedException
from app.api.modules.lessons.model import LessonModel
from app.api.users.model import UserModel


def check_rights(
        lesson: LessonModel,
        user: UserModel,
        is_for_students: bool = False,
        is_for_teachers: bool = False) -> bool:
    student_lessons_ids = (
        lesson_.id
        for classroom in user.student_classrooms
        for module in classroom.modules
        for lesson_ in module.lessons
    )
    teacher_lessons_ids = (
        lesson_.id
        for classroom in user.teacher_classrooms
        for module in classroom.modules
        for lesson_ in module.lessons
    )

    result = (
            (is_for_students and lesson.id in student_lessons_ids) or
            (is_for_teachers and lesson.id in teacher_lessons_ids)
    )

    if not result:
        raise AccessDeniedException

    return result  # True.
