from src.auth.exceptions import AccessDeniedException
from src.modules.steps.model import StepModel
from src.users.model import UserModel


def check_rights(
        step: StepModel,
        user: UserModel,
        is_for_students: bool = False,
        is_for_teachers: bool = False) -> bool:
    student_steps_ids = (
        step_.id
        for classroom in user.student_classrooms
        for module in classroom.modules
        for lesson in module.lessons
        for step_ in lesson.steps
    )
    teacher_steps_ids = (
        step_.id
        for classroom in user.teacher_classrooms
        for module in classroom.modules
        for lesson in module.lessons
        for step_ in lesson.steps
    )

    result = (
            (is_for_students and step.id in student_steps_ids) or
            (is_for_teachers and step.id in teacher_steps_ids)
    )

    if not result:
        raise AccessDeniedException

    return result  # True.
