from fastapi import APIRouter, status

from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.service import ClassroomService
from app.api.modules.lessons.schemas import SLessonGetOut
from app.api.modules.lessons.service import LessonService
from app.api.modules.modules.exceptions import ModuleNotFoundException
from app.api.modules.modules.schemas import SModulePostOut, SModulePostIn, SModuleGetOutBase
from app.api.modules.modules.service import ModuleService

router = APIRouter(
    prefix="/module",
)


@router.get(
    path="/{module_id}/base",
    response_model=SModuleGetOutBase,
    status_code=status.HTTP_200_OK,
    summary="Get module order.",
    description="Helper handle for getting module order.",
    tags=["Module"],
    responses={
        status.HTTP_200_OK: {
            "model": SModuleGetOutBase,
            "description": "Module found.",
        },
        ModuleNotFoundException.status_code: {
            "model": None,
            "description": ModuleNotFoundException.detail,
        }
    }
)
async def get_module_base(module_id: int):
    module = await ModuleService.read_one_or_none(id=module_id)
    if not module:
        raise ModuleNotFoundException
    return module.ModuleModel


@router.get(
    path="/{module_id}",
    response_model=list[SLessonGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get lessons in module.",
    description="Get lessons in module. If module with module_id not found/exist, raise ModuleNotFoundException",
    tags=["Module"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SLessonGetOut],
            "description": "Module found.",
        },
        ModuleNotFoundException.status_code: {
            "model": None,
            "description": ModuleNotFoundException.detail,
        }
    }
)
async def get_lessons_in_module(module_id: int):
    # TODO: add access check.
    module = await ModuleService.read_one_or_none(id=module_id)
    if not module:
        raise ModuleNotFoundException
    lessons = [
        model.LessonModel for model in await LessonService.read_all(module_id=module_id)
    ]
    return lessons


@router.post(
    path="/create",
    response_model=SModulePostOut,
    status_code=status.HTTP_201_CREATED,
    summary="Teacher create module.",
    description="Create module by teacher.",
    tags=["Module"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SModulePostOut,
            "description": "Module created successfully.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def create_module(data: SModulePostIn):
    classroom = await ClassroomService.read_one_or_none(id=data.classroom_id)
    if not classroom:
        raise ClassroomNotFoundException

    module = await ModuleService.create_one(
        title=data.title,
        description=data.description,
        classroom_id=data.classroom_id,
    )
    return module
