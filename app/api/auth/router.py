from fastapi import APIRouter, Response

from app.api.auth.exceptions import UserAlreadyExistsException
from app.api.auth.hasher import authenticate_user, get_password_hash, create_access_token
from app.api.auth.schemas import SAuthRegister, SAuthLogin
from app.api.users.repository import UserRepository

router = APIRouter(
    prefix="",
    tags=["Auth"],
)


@router.post("/registration")
async def register(user_data: SAuthRegister):
    existing_user = await UserRepository.find_one_or_none(email=user_data.email)
    if existing_user:
        raise UserAlreadyExistsException
    hashed_password = get_password_hash(user_data.password)
    await UserRepository.add(email=user_data.email, username=user_data.username, password=hashed_password)


@router.post("/login")
async def login(response: Response, user_data: SAuthLogin):
    user = await authenticate_user(user_data.email, user_data.password)
    access_token = create_access_token({"sub": str(user.UserModel.uuid)})
    response.set_cookie("access_token", access_token, httponly=True)
    return {"access_token": access_token}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
