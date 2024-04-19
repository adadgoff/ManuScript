from fastapi import APIRouter, Body, Depends, File, UploadFile, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.classrooms.access import check_rights
from src.modules.classrooms.exceptions import ClassroomNotFoundException
from src.modules.classrooms.schemas import SClassroomDeleteOut, SClassroomGetOut, \
    SClassroomGetOutWithModules, SClassroomPostIn, SClassroomPostOut, SClassroomStudentAddIn, \
    SClassroomStudentsUpdateIn, \
    SClassroomTeacherAddIn, SClassroomTeachersUpdateIn, SClassroomUpdateIn, \
    SClassroomUpdateOut
from src.modules.classrooms.service import ClassroomService
from src.modules.students.service import StudentService
from src.modules.teachers.exceptions import TeacherCountInClassroomException, TeacherSelfDowngradeException, \
    TeacherSelfRemoveException
from src.modules.teachers.service import TeacherService
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel
from src.users.schemas import SUserGetOut, SUserUpdateOut
from src.users.service import UserService

router = APIRouter(
    prefix="/classroom",
)


@router.get(
    path="/my_student_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user student classrooms.",
    description="Get user classrooms.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SClassroomGetOut],
            "description": "Student classrooms found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def get_my_student_classrooms(user: UserModel = Depends(get_current_user)):
    my_student_classroom_ids = [
        model.StudentModel.classroom_id for model in await StudentService.read_all(user_uuid=user.uuid)
    ]
    student_classrooms = [
        model.ClassroomModel for model in await ClassroomService.read_all_with_icon(ids=my_student_classroom_ids)
    ]
    return student_classrooms


@router.get(
    path="/my_teacher_classrooms",
    response_model=list[SClassroomGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get user teacher classrooms.",
    description="Get user classrooms.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SClassroomGetOut],
            "description": "Teacher classrooms found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
async def get_my_teacher_classrooms(user: UserModel = Depends(get_current_user)):
    my_teacher_classroom_ids = [
        model.TeacherModel.classroom_id for model in await TeacherService.read_all(user_uuid=user.uuid)
    ]

    teacher_classrooms = [
        model.ClassroomModel for model in await ClassroomService.read_all_with_icon(ids=my_teacher_classroom_ids)
    ]

    return teacher_classrooms


@router.get(
    path="/{classroom_id}/students",
    response_model=list[SUserGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get classroom students.",
    description="Get classroom students.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SUserGetOut],
            "description": "Students found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_students(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    return await StudentService.read_classroom_students(classroom_id=classroom_id)


@router.get(
    path="/{classroom_id}/teachers",
    response_model=list[SUserGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get classroom teachers.",
    description="Get classroom teachers.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SUserGetOut],
            "description": "Teachers found successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_teachers(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    return await TeacherService.read_classroom_teachers(classroom_id=classroom_id)


@router.get(
    path="/{classroom_id}",
    response_model=SClassroomGetOutWithModules,
    status_code=status.HTTP_200_OK,
    summary="Get classroom with modules and lessons.",
    description="Get classroom with modules and lessons. If classroom with classroom_id not found/exist, raise ClassroomNotFoundException. info = [classroom + modules with lessons].",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGetOutWithModules,
            "description": "Classroom found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_classroom_with_lessons(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=True, is_for_teachers=True)

    return classroom.ClassroomModel


@router.get(
    path="/{classroom_id}/edit",
    response_model=SClassroomGetOutWithModules,
    status_code=status.HTTP_200_OK,
    summary="Get classroom with modules and lessons only for teachers.",
    description="Get classroom with modules and lessons only for teachers.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomGetOutWithModules,
            "description": "Classroom found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def get_classroom_with_lessons_for_teachers(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    return classroom.ClassroomModel


@router.post(
    path="/create",
    response_model=SClassroomPostOut,
    status_code=status.HTTP_200_OK,
    summary="Create a new classroom.",
    description="Create a classroom and return it to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomPostOut,
            "description": "Classroom created successfully.",
        },
    }
)
async def create_classroom(data: SClassroomPostIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.create_one(
        title=data.title,
        description=data.description,
        user=user,
    )
    return classroom


@router.put(
    path="/update",
    response_model=SClassroomUpdateOut,
    status_code=status.HTTP_200_OK,
    summary="Update a classroom.",
    description="Update a classroom and return it to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomUpdateOut,
            "description": "Classroom updated successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
    }
)
async def update_classroom(
        data: SClassroomUpdateIn = Body(),
        classroom_icon: UploadFile | str | None = File(None, media_type="image/*"),
        user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none_with_icon_and_modules(id=data.id)

    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    updated_classroom = await ClassroomService.update_classroom(classroom.ClassroomModel,
                                                                data,
                                                                classroom_icon)
    return updated_classroom


@router.put(
    path="/update/students",
    response_model=list[SUserUpdateOut],
    status_code=status.HTTP_200_OK,
    summary="Update classroom students.",
    description="Update classroom students.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SUserUpdateOut],
            "description": "Students updated successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def update_students(data: SClassroomStudentsUpdateIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=data.id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    await StudentService.update_classroom_students(data)

    return await StudentService.read_classroom_students(classroom_id=data.id)


@router.put(
    path="/update/teachers",
    response_model=list[SUserGetOut],
    status_code=status.HTTP_200_OK,
    summary="Update classroom teachers.",
    description="Update classroom teachers.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SUserGetOut],
            "description": "Teachers updated successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        TeacherCountInClassroomException.status_code: {
            "model": None,
            "description": TeacherCountInClassroomException.detail,
        }
    }
)
async def update_teachers(data: SClassroomTeachersUpdateIn, user: UserModel = Depends(get_current_user)):
    if len(data.teachers) == 0:
        raise TeacherCountInClassroomException

    classroom = await ClassroomService.read_one_or_none(id=data.id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    new_teacher_uuids = set(teacher.uuid for teacher in data.teachers)
    if user.UserModel.uuid not in new_teacher_uuids:
        raise TeacherSelfRemoveException

    await TeacherService.update_classroom_teachers(data)

    return await TeacherService.read_classroom_teachers(classroom_id=data.id)


@router.put(
    path="/add/student",
    response_model=SUserGetOut,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new student to classroom.",
    description="Add a new student to classroom.",
    tags=["Classroom"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SUserGetOut,
            "description": "Student added to classroom successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def add_student(data: SClassroomStudentAddIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=data.id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    if user.UserModel.email == data.student.email:
        raise TeacherSelfDowngradeException

    await StudentService.add_student(data)
    return (await UserService.read_one_or_none(email=data.student.email)).UserModel


@router.put(
    path="/add/teacher",
    response_model=SUserGetOut,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new teacher to classroom.",
    description="Add a new teacher to classroom.",
    tags=["Classroom"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SUserGetOut,
            "description": "Teacher added to classroom successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        }
    }
)
async def add_teacher(data: SClassroomTeacherAddIn, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=data.id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    await TeacherService.add_teacher(data)
    return (await UserService.read_one_or_none(email=data.student.email)).UserModel


@router.delete(
    path="/{classroom_id}/delete",
    response_model=SClassroomDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete a classroom.",
    description="Delete a classroom and return id of deleted classroom to the client.",
    tags=["Classroom"],
    responses={
        status.HTTP_200_OK: {
            "model": SClassroomDeleteOut,
            "description": "Deleted classroom successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def delete_classroom(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    if not classroom:
        raise ClassroomNotFoundException

    classroom = await ClassroomService.delete_one(id=classroom_id)
    return classroom
