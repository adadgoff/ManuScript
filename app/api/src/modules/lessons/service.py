import asyncio

from src.core.base_service import BaseService
from src.modules.lessons.model import LessonModel
from src.modules.lessons.repository import LessonRepository
from src.modules.lessons.schemas import SLessonUpdateInForLesson
from src.modules.steps.service import StepService
from src.services.images.constants import IMAGE_API_REGEX
from src.services.images.service import ImageService


class LessonService(BaseService):
    repository = LessonRepository

    @classmethod
    async def read_one_or_none_with_steps(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_steps(**filter_by)

    @classmethod
    async def update_lesson(cls, lesson_model: LessonModel, data: SLessonUpdateInForLesson) -> LessonModel:
        await cls.repository.update_one(model=lesson_model, title=data.title)

        await StepService.delete_all_by_id(
            ids=[s.id for s in lesson_model.steps if s.id not in {s.id for s in data.steps}])

        for step in data.steps:
            if step.id is None:
                await StepService.create_one(order=step.order, type=step.type,
                                             text=step.text, answer=step.answer,
                                             lesson_id=data.id)
            else:
                step_model = (await StepService.read_one_or_none(id=step.id)).StepModel

                old_image_uuids = set(IMAGE_API_REGEX.findall(step_model.text))
                new_image_uuids = set(IMAGE_API_REGEX.findall(step.text))
                useless_image_uuids = [image for image in old_image_uuids if image not in new_image_uuids]

                delete_tasks = [ImageService.delete_one(img_uuid=image_uuid) for image_uuid in useless_image_uuids]
                await asyncio.gather(*delete_tasks)

                await StepService.update_one(model=step_model,
                                             order=step.order, type=step.type,
                                             text=step.text, answer=step.answer)

        return (await cls.repository.read_one_or_none_with_steps(id=lesson_model.id)).LessonModel
