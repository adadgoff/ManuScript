from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext
from pydantic import EmailStr

from app.config import settings

from app.Users.repository import UsersRepository

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def authenticate_user(email: EmailStr, password: str):
    user = await UsersRepository.find_one_or_none(Email=email)
    if user and verify_password(password, user.Users.HashedPassword):
        return user
    return None


def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)) -> str:
    to_encode = data.copy()
    to_encode.update({"exp": datetime.now(timezone.utc) + expires_delta})
    encoded_jwt = jwt.encode(to_encode, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
