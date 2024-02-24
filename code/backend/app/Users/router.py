from fastapi import APIRouter, HTTPException, Response, status, Depends

from app.Users.auth import authenticate_user, create_access_token, get_password_hash
from app.Users.models import Users
from app.Users.repository import UsersRepository
from app.Users.schemas import SUserLogin, SUserRegistry

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("/register")
async def register_user(user_data: SUserRegistry) -> None:
    existing_user = await UsersRepository.find_one_or_none(Email=user_data.Email)
    if existing_user:
        raise HTTPException(status_code=500, detail="User with this Email already exists")
    hashed_password = get_password_hash(user_data.Password)
    await UsersRepository.add(Email=user_data.Email, SurnameName=user_data.SurnameName, HashedPassword=hashed_password)


@router.post("/login")
async def login_user(response: Response, user_data: SUserLogin) -> dict:
    user = await authenticate_user(user_data.Email, user_data.Password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    access_token = create_access_token({"sub": str(user.Users.Email)})
    response.set_cookie("user_access_token", access_token, httponly=True)
    return {"access_token": access_token}


@router.post("/logout")
async def logout_user(response: Response) -> None:
    response.delete_cookie("user_access_token")


# @router.get("/me")
# async def read_users_me(current_user: Users = Depends()):
#     return current_user
