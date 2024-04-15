from src.core.base_service import BaseService
from src.modules.classrooms.model import ClassroomModel
from src.modules.classrooms.repository import ClassroomRepository
from src.modules.classrooms.schemas import SClassroomUpdateIn
from src.modules.modules.service import ModuleService


class ClassroomService(BaseService):
    repository = ClassroomRepository

    @classmethod
    async def read_one_or_none_with_icon_and_modules(cls, **filter_by) -> ClassroomModel:
        return await cls.repository.read_one_or_none_with_icon_and_modules(**filter_by)

    @classmethod
    async def read_all_with_icon(cls, ids: list[int]) -> list[ClassroomModel]:
        return await cls.repository.read_all_with_icon(ids)

    @classmethod
    async def update_classroom(cls, classroom_model: ClassroomModel, data: SClassroomUpdateIn) -> ClassroomModel:
        await cls.repository.update_one(classroom_model,
                                        title=data.title,
                                        description=data.description)
        # Update classroom icon.

        await ModuleService.delete_all_by_id(
            ids=[m.id for m in classroom_model.modules if m.id not in {m.id for m in data.modules}])

        for module in data.modules:
            await ModuleService.create_or_update_one_with_lessons(classroom_id=data.id,
                                                                  id=module.id,
                                                                  order=module.order,
                                                                  title=module.title,
                                                                  description=module.description,
                                                                  lessons=module.lessons)

        return (await cls.repository.read_one_or_none_with_icon_and_modules(id=classroom_model.id)).ClassroomModel
