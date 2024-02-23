from fastapi import APIRouter, HTTPException, Response, status
from pydantic import EmailStr

from app.Users.auth import authenticate_user, create_access_token, get_password_hash
from app.Users.repository import UsersRepository
from app.Users.schemas import SUserLogin, SUserRegistry

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/register")
async def register_user(user_data: SUserRegistry) -> None:
    existing_user = await UsersRepository.find_one_or_none(Email=user_data.Email)
    if existing_user:
        raise HTTPException(status_code=500, detail="User with this Email already exists")
    hashed_password = get_password_hash(user_data.Password)
    await UsersRepository.add(Email=user_data.Email, SurnameName=user_data.SurnameName, HashedPassword=hashed_password)


@router.post("/login")
async def login_user(response: Response, user_data: SUserLogin) -> str:
    user = await authenticate_user(user_data.Email, user_data.Password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    access_token = create_access_token({"subject": user.Users.Email})
    response.set_cookie("user_access_token", access_token, httponly=True)
    return access_token
