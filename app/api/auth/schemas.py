from pydantic import BaseModel, EmailStr


class SAuthLogin(BaseModel):
    email: EmailStr
    password: str


class SAuthRegister(SAuthLogin):
    username: str
