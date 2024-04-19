from uuid import UUID

from src.core.base_service import BaseService
from src.modules.classrooms.schemas import SClassroomTeacherAddIn, SClassroomTeachersUpdateIn
from src.modules.teachers.exceptions import AddingTeacherIsCurrentStudentException, TeacherAlreadyExistException
from src.modules.teachers.repository import TeacherRepository
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel
from src.users.schemas import SUserUpdateOut
from src.users.service import UserService


class TeacherService(BaseService):
    repository = TeacherRepository

    @classmethod
    async def read_classroom_teachers(cls, classroom_id: int) -> list[UserModel]:
        teacher_uuids: list[UUID] = [teacher.TeacherModel.user_uuid for teacher in
                                     await cls.repository.read_all(classroom_id=classroom_id)]
        teachers = await UserService.read_all(uuids=teacher_uuids)
        return [teacher.UserModel for teacher in teachers]

    @classmethod
    async def update_classroom_teachers(cls, data: SClassroomTeachersUpdateIn) -> list[SUserUpdateOut]:
        from src.modules.students.service import StudentService

        current_teacher_uuids = set(teacher.uuid for teacher in await cls.read_classroom_teachers(classroom_id=data.id))
        new_teacher_uuids = set(teacher.uuid for teacher in data.teachers)

        if (len(set(new_user.UserModel for new_user in await UserService.read_all(uuids=new_teacher_uuids))) !=
                len(new_teacher_uuids)):
            raise UserNotFoundException

        deleting_teacher_uuids = [uuid for uuid in current_teacher_uuids if uuid not in new_teacher_uuids]
        for deleting_teacher_uuid in deleting_teacher_uuids:
            await cls.repository.delete_one(classroom_id=data.id, user_uuid=deleting_teacher_uuid)

        for teacher_uuid in new_teacher_uuids:
            await StudentService.delete_one(classroom_id=data.id, user_uuid=teacher_uuid)
            if teacher_uuid not in current_teacher_uuids:
                await cls.repository.create_one(classroom_id=data.id, user_uuid=teacher_uuid)

        return data.teachers

    @classmethod
    async def add_teacher(cls, data: SClassroomTeacherAddIn):
        from src.modules.students.service import StudentService

        user_model = await UserService.read_one_or_none(email=data.student.email)
        if not user_model:
            raise UserNotFoundException

        current_teacher_uuids = set(teacher.uuid for teacher in await cls.read_classroom_teachers(classroom_id=data.id))
        if user_model.UserModel.uuid in current_teacher_uuids:
            raise TeacherAlreadyExistException

        current_student_uuids = set(
            student.uuid for student in await StudentService.read_classroom_students(classroom_id=data.id))
        if user_model.UserModel.uuid in current_student_uuids:
            raise AddingTeacherIsCurrentStudentException

        await StudentService.delete_one(classroom_id=data.id, user_uuid=user_model.UserModel.uuid)
        return await TeacherService.create_one(classroom_id=data.id, user_uuid=user_model.UserModel.uuid)
