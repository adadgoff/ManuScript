from fastapi import APIRouter, HTTPException

from app.Users.auth import get_password_hash
from app.Users.repository import UsersRepository
from app.Users.schemas import SUserRegister, SUserResponse

# router = APIRouter(
#     prefix="/users",
#     tags=["Users"],
# )
#
#
# @router.get("")
# async def get_users() -> list[SUserResponse]:
#     return await UsersRepository.find_all()
#
#
# @router.get("/{email}")
# async def get_user_by_email(email: str) -> SUserResponse | None:
#     return await UsersRepository.find_one_or_none(Email=email)


router = APIRouter(
    prefix="/auth",
    tags=["Auth", "Users"],
)


@router.post("/register")
async def register_user(user_data: SUserRegister):
    existing_user = await UsersRepository.find_one_or_none(Email=user_data.Email)
    if existing_user:
        raise HTTPException(status_code=500, detail="User with this Email already exists")
    hashed_password = get_password_hash(user_data.Password)
    await UsersRepository.add(Email=user_data.Email, SurnameName=user_data.SurnameName, HashedPassword=hashed_password)
