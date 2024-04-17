from fastapi import UploadFile

from src.auth.helpers.hasher_helper import get_password_hash, verify_password
from src.core.base_service import BaseService
from src.services.images.service import ImageService
from src.users.exceptions import UserUpdatePasswordException
from src.users.model import UserModel
from src.users.repository import UserRepository
from src.users.schemas import SUserUpdateInWithIcon


class UserService(BaseService):
    repository = UserRepository

    @classmethod
    async def read_one_or_none_with_classrooms(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_classrooms(**filter_by)

    @classmethod
    async def read_one_or_none_with_lessons(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_lessons(**filter_by)

    @classmethod
    async def read_one_or_none_with_steps(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_steps(**filter_by)

    @classmethod
    async def read_one_or_none_with_icon(cls, **filter_by):
        return await cls.repository.read_one_or_none_with_icon(**filter_by)

    @classmethod
    async def update_user_with_icon(cls, user_model: UserModel,
                                    data: SUserUpdateInWithIcon,
                                    user_icon: UploadFile | str | None
                                    ) -> UserModel:
        if not verify_password(data.password, user_model.password):
            raise UserUpdatePasswordException

        await UserService.update_one(model=user_model,
                                     username=data.username,
                                     password=get_password_hash(data.new_password))

        if user_icon is not None and user_icon != "null":
            if user_model.icon is not None:
                await ImageService.delete_one(img_uuid=user_model.icon.uuid)
            image_dict = await ImageService.create_one(user_icon)
            image_model = (await ImageService.read_one_or_none(uuid=image_dict.get("uuid"))).ImageModel
            await ImageService.update_one(model=image_model, user_uuid=user_model.uuid)

        return (await cls.repository.read_one_or_none_with_icon(uuid=user_model.uuid)).UserModel
