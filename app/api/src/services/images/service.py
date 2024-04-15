from uuid import UUID, uuid4

import aiofiles
import aiofiles.os
from fastapi import UploadFile
from sqlalchemy import RowMapping

from src.core.base_service import BaseService
from src.services.images.contants import ALLOWED_EXTENSIONS, DEFAULT_CHUNK_SIZE, PATH
from src.services.images.exceptions import ImageIncorrectExtensionException, ImageNotFoundException
from src.services.images.repository import ImageRepository
from src.users.model import UserModel


class ImageService(BaseService):
    repository = ImageRepository

    @classmethod
    async def create_one(cls, file: UploadFile, user: UserModel, **data) -> dict:
        extension = file.content_type.split('/')[-1]
        if extension not in ALLOWED_EXTENSIONS:
            raise ImageIncorrectExtensionException

        img_uuid = uuid4()
        img_path = f"{PATH}/{img_uuid}.{extension}"

        # TODO: check size.

        async with aiofiles.open(img_path, mode="wb+") as f:
            while chunk := await file.read(DEFAULT_CHUNK_SIZE):
                await f.write(chunk)

        image = await cls.repository.create_one(
            uuid=img_uuid,
            extension=extension,
            user_uuid=user.uuid,
        )

        return image

    @classmethod
    async def delete_one(cls, img_uuid: UUID) -> RowMapping:
        image = await ImageService.delete_img(img_uuid)
        await cls.repository.delete_one(uuid=img_uuid)
        return image

    @classmethod
    async def delete_img(cls, img_uuid: UUID) -> RowMapping:
        image = await cls.repository.read_one_or_none(uuid=img_uuid)

        if not image:
            raise ImageNotFoundException

        img_path = f"{PATH}/{image.ImageModel.uuid}.{image.ImageModel.extension}"
        await aiofiles.os.remove(img_path)
        return image
