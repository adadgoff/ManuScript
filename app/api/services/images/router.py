import shutil
import uuid

import aiofiles

from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse

# from os import listdir  # for debugging.

PATH = "../app/resources/static/images"
DEFAULT_CHUNK_SIZE = 16 * 1024 * 1024  # 16 megabytes.

router = APIRouter(
    prefix="/images",
    tags=["Images"],
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
    async with aiofiles.open(img_path, "wb+") as f:
        while chunk := await file.read(DEFAULT_CHUNK_SIZE):
            await f.write(chunk)
    # with open(img_path, "wb+") as file_object:
    #     shutil.copyfileobj(file.file, file_object)
    return img_uuid
