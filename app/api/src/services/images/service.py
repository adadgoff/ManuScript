from uuid import uuid4

import aiofiles
from fastapi import UploadFile

from src.core.base_service import BaseService
from src.services.images.contants import ALLOWED_EXTENSIONS, DEFAULT_CHUNK_SIZE, PATH
from src.services.images.exceptions import ImageIncorrectExtensionException
from src.services.images.model import ImageModel
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
