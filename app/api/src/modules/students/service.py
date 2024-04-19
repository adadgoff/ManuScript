from uuid import UUID

from src.core.base_service import BaseService
from src.modules.classrooms.schemas import SClassroomStudentAddIn, SClassroomStudentsUpdateIn
from src.modules.students.exceptions import AddingStudentIsCurrentTeacherException, StudentAlreadyExistException
from src.modules.students.repository import StudentRepository
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel
from src.users.schemas import SUserUpdateOut
from src.users.service import UserService


class StudentService(BaseService):
    repository = StudentRepository

    @classmethod
    async def read_classroom_students(cls, classroom_id: int) -> list[UserModel]:
        student_uuids: list[UUID] = [student.StudentModel.user_uuid for student in
                                     await cls.repository.read_all(classroom_id=classroom_id)]
        students = await UserService.read_all(uuids=student_uuids)
        return [student.UserModel for student in students]

    @classmethod
    async def update_classroom_students(cls, data: SClassroomStudentsUpdateIn) -> list[SUserUpdateOut]:
        from src.modules.teachers.service import TeacherService

        current_student_uuids = set(student.uuid for student in await cls.read_classroom_students(classroom_id=data.id))
        new_student_uuids = set(student.uuid for student in data.students)

        if (len(set(new_user.UserModel for new_user in await UserService.read_all(uuids=new_student_uuids))) !=
                len(new_student_uuids)):
            raise UserNotFoundException

        deleting_student_uuids = [uuid for uuid in current_student_uuids if uuid not in new_student_uuids]
        for deleting_student_uuid in deleting_student_uuids:
            await cls.repository.delete_one(classroom_id=data.id, user_uuid=deleting_student_uuid)

        for student_uuid in new_student_uuids:
            await TeacherService.delete_one(classroom_id=data.id, user_uuid=student_uuid)
            if student_uuid not in current_student_uuids:
                await cls.repository.create_one(classroom_id=data.id, user_uuid=student_uuid)

        return data.students

    @classmethod
    async def add_student(cls, data: SClassroomStudentAddIn):
        from src.modules.teachers.service import TeacherService

        user_model = await UserService.read_one_or_none(email=data.student.email)
        if not user_model:
            raise UserNotFoundException

        current_student_uuids = set(student.uuid for student in await cls.read_classroom_students(classroom_id=data.id))
        if user_model.UserModel.uuid in current_student_uuids:
            raise StudentAlreadyExistException

        current_teacher_uuids = set(teacher.uuid for teacher in await TeacherService.read_classroom_teachers(classroom_id=data.id))
        if user_model.UserModel.uuid in current_teacher_uuids:
            raise AddingStudentIsCurrentTeacherException

        await TeacherService.delete_one(classroom_id=data.id, user_uuid=user_model.UserModel.uuid)
        return await StudentService.create_one(classroom_id=data.id, user_uuid=user_model.UserModel.uuid)
