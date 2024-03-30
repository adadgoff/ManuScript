from fastapi import APIRouter, status

from app.api.modules.classrooms.exceptions import ClassroomNotFoundException
from app.api.modules.classrooms.service import ClassroomService
from app.api.modules.modules.exceptions import ModuleNotFoundException
from app.api.modules.modules.schemas import SModuleGetOut, SModulePostOut, SModulePostIn
from app.api.modules.modules.service import ModuleService

router = APIRouter(
    prefix="/module",
)


# @router.get(
#     path="/{module_id}",
#     response_model=SModuleGetOut,
#     status_code=status.HTTP_200_OK,
#     summary="Get module information.",
#     description="Get module by id. If lesson with module_id not found/exist, raise ModuleNotFoundException",
#     tags=["Module"],
#     responses={
#         status.HTTP_200_OK: {
#             "model": SModuleGetOut,
#             "description": "Module found.",
#         },
#         ModuleNotFoundException.status_code: {
#             "model": SModuleGetOut,
#             "description": ModuleNotFoundException.detail,
#         }
#     }
# )
# async def get_module(module_id: int):
#     module = await ModuleService.read_one_or_none(id=module_id)
#     if not module:
#         raise ModuleNotFoundException
#     return module.ModuleModel


@router.get(
    path="/{classroom_id}",
    response_model=list[SModuleGetOut],
    status_code=status.HTTP_200_OK,
    summary="Get modules information by classroom_id.",
    description="Get modules by classroom_id. If lesson with classroom_id not found/exist, raise ModuleNotFoundException",
    tags=["Module"],
    responses={
        status.HTTP_200_OK: {
            "model": list[SModuleGetOut],
            "description": "Modules found.",
        },
        ClassroomNotFoundException.status_code: {
            "model": None,
            "description": ClassroomNotFoundException.detail,
        }
    }
)
async def get_modules_in_classroom(classroom_id: int):
    classroom = await ClassroomService.read_one_or_none(id=classroom_id)
    if not classroom:
        raise ClassroomNotFoundException
    modules = [
        model.ModuleModel for model in await ModuleService.read_all(classroom_id=classroom_id)
    ]
    return modules


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
