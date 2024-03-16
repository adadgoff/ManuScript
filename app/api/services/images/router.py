import shutil
import uuid

from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse

# from os import listdir  # for debugging.

PATH = "../app/resources/static/images"

router = APIRouter(
    prefix="/api/images",
    tags=["images"],
)


# TODO: закинуть в celery обработку фотографий.
@router.get("/{filename}")
async def get_image(filename: str) -> FileResponse:
    return FileResponse(f"{PATH}/{filename}")


@router.post("/upload")
async def upload_image(file: UploadFile) -> uuid.UUID:
    img_uuid = uuid.uuid4()
    extension = file.content_type.split('/')[-1]
    img_path = f"{PATH}/{img_uuid}.{extension}"
    with open(img_path, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return img_uuid
