from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import FileResponse

from src.auth.helpers.token_helper import get_current_user
from src.services.images.contants import PATH
from src.services.images.exceptions import ImageIncorrectExtensionException, ImageNotFoundException
from src.services.images.schemas import SImagePostOut
from src.services.images.service import ImageService
from src.users.exceptions import UserNotFoundException
from src.users.model import UserModel

router = APIRouter(
    prefix="/image",
)


# TODO: закинуть в celery обработку фотографий.
@router.get(
    path="/{image_uuid}",
    response_model=bytes,
    status_code=status.HTTP_200_OK,
    summary="Get image by uuid.",
    description="Get image by uuid.",
    tags=["Image"],
    responses={
        status.HTTP_200_OK: {
            "model": bytes,
            "description": "Image found successfully."
        },
        ImageNotFoundException.status_code: {
            "model": None,
            "description": ImageNotFoundException.detail,
        }
    }
)
async def get_image_by_uuid(image_uuid: UUID, user: UserModel = Depends(get_current_user)):
    image = await ImageService.read_one_or_none(uuid=image_uuid)
    if not image:
        raise ImageNotFoundException
    return FileResponse(f"{PATH}/{image_uuid}.{image.ImageModel.extension}")


@router.post(
    path="/upload",
    response_model=SImagePostOut,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a new image.",
    description="Upload a new image.",
    tags=["Image"],
    responses={
        status.HTTP_201_CREATED: {
            "model": SImagePostOut,
            "description": "Image uploaded successfully.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        },
        ImageIncorrectExtensionException.status_code: {
            "model": None,
            "description": ImageIncorrectExtensionException.detail,
        }
    }
)
async def upload_image(file: UploadFile, user: UserModel = Depends(get_current_user)):
    return await ImageService.create_one(file, user)
