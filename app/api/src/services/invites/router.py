from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, status

from src.auth.exceptions import AccessDeniedException
from src.auth.helpers.token_helper import get_current_user
from src.modules.classrooms.access import check_rights
from src.modules.classrooms.exceptions import ClassroomNotFoundException
from src.modules.classrooms.schemas import SClassroomStudentAddIn
from src.modules.classrooms.service import ClassroomService
from src.modules.students.exceptions import AddingStudentIsCurrentTeacherException, StudentAlreadyExistException
from src.modules.students.service import StudentService
from src.services.invites.exceptions import InviteAlreadyExistException, InviteNotFoundException
from src.services.invites.schemas import SInviteDeleteOut, SInviteGetOut, SInvitePostOut, SInviteUpdateOut
from src.services.invites.service import InviteService
from src.users.model import UserModel
from src.users.schemas import SUserAddIn
from src.users.service import UserService

router = APIRouter(
    prefix="/invite",
)


@router.get(
    path="/{classroom_id}",
    response_model=SInviteGetOut,
    status_code=status.HTTP_200_OK,
    summary="Get classroom invite.",
    description="Get classroom invite. Only teachers are allowed to get invitation.",
    tags=["Invite"],
    responses={
        status.HTTP_200_OK: {
            "model": SInviteGetOut,
            "description": "Invite found successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        InviteNotFoundException.status_code: {
            "model": None,
            "description": InviteNotFoundException.detail,
        },
    }
)
async def get_invite(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    invite = await InviteService.read_one_or_none(classroom_id=classroom_id)
    if not invite:
        raise InviteNotFoundException

    return invite.InviteModel


@router.post(
    path="/{invite_uuid}",
    response_model=SInviteGetOut,
    status_code=status.HTTP_201_CREATED,
    summary="Join classroom with invite uuid.",
    description="Join classroom with invite uuid. Only students from other classrooms are allowed to join.",
    tags=["Invite"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SInviteGetOut,
            "description": "Invite created successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        InviteNotFoundException.status_code: {
            "model": None,
            "description": InviteAlreadyExistException.detail,
        },
        StudentAlreadyExistException.status_code: {
            "model": None,
            "description": StudentAlreadyExistException.detail,
        },
        AddingStudentIsCurrentTeacherException.status_code: {
            "model": None,
            "description": AddingStudentIsCurrentTeacherException.detail,
        },
    }
)
async def join_classroom(invite_uuid: UUID, user: UserModel = Depends(get_current_user)):
    invite = await InviteService.read_one_or_none(uuid=invite_uuid)
    if not invite:
        raise InviteNotFoundException

    classroom = await ClassroomService.read_one_or_none(id=invite.InviteModel.classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    await StudentService.add_student(SClassroomStudentAddIn(id=invite.InviteModel.classroom_id,
                                                            student=SUserAddIn(email=user.email)))
    return invite.InviteModel


@router.post(
    path="/{classroom_id}/create",
    response_model=SInvitePostOut,
    status_code=status.HTTP_201_CREATED,
    summary="Create classroom invite.",
    description="Create classroom invite. Only teachers are allowed to create invitation.",
    tags=["Invite"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SInvitePostOut,
            "description": "Invite created successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        InviteAlreadyExistException.status_code: {
            "model": None,
            "description": InviteAlreadyExistException.detail,
        },
    }
)
async def create_invite(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    invite = await InviteService.read_one_or_none(classroom_id=classroom_id)
    if invite:
        raise InviteAlreadyExistException

    return await InviteService.create_one(classroom_id=classroom_id)


@router.put(
    path="/{classroom_id}/update",
    response_model=SInviteUpdateOut,
    status_code=status.HTTP_200_OK,
    summary="Update classroom invite.",
    description="Update classroom invite. Only teachers are allowed to update invitation.",
    tags=["Invite"],
    responses={
        status.HTTP_200_OK: {
            "model": SInviteUpdateOut,
            "description": "Invite updated successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        InviteNotFoundException.status_code: {
            "model": None,
            "description": InviteNotFoundException.detail,
        },
    }
)
async def update_invite(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    invite = await InviteService.read_one_or_none(classroom_id=classroom_id)
    if not invite:
        raise InviteNotFoundException

    return await InviteService.update_one(model=invite.InviteModel, uuid=uuid4())


@router.delete(
    path="/{classroom_id}/delete",
    response_model=SInviteDeleteOut,
    status_code=status.HTTP_200_OK,
    summary="Delete classroom invite.",
    description="Delete classroom invite. Only teachers are allowed to delete invitation.",
    tags=["Invite"],
    responses={
        status.HTTP_200_OK: {
            "model": SInviteDeleteOut,
            "description": "Invite updated successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        },
        AccessDeniedException.status_code: {
            "model": None,
            "description": AccessDeniedException.detail,
        },
        InviteNotFoundException.status_code: {
            "model": None,
            "description": InviteNotFoundException.detail,
        },
    }
)
async def delete_invite(classroom_id: int, user: UserModel = Depends(get_current_user)):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    user = await UserService.read_one_or_none_with_classrooms(uuid=user.uuid)
    check_rights(classroom.ClassroomModel, user.UserModel, is_for_students=False, is_for_teachers=True)

    invite = await InviteService.read_one_or_none(classroom_id=classroom_id)
    if not invite:
        raise InviteNotFoundException

    return await InviteService.delete_one(classroom_id=classroom_id)
