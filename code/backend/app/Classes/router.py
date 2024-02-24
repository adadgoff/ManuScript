from fastapi import APIRouter, Depends

from app.Classes.repository import ClassesRepository
from app.Users.dependencies import get_current_user
from app.Users.schemas import SUserResponse

router = APIRouter(
    prefix="/classes",
    tags=["Classes"],
)


@router.get("")
async def get_classes(user: SUserResponse = Depends(get_current_user)):
    return await ClassesRepository.find_all(Email=user.Users.Email)
