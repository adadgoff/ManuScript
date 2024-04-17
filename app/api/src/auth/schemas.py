from pydantic import BaseModel, EmailStr


class SAuthAccessToken(BaseModel):
    access_token: str | None


class SAuthEmail(BaseModel):
    email: EmailStr


class SAuthLogin(BaseModel):
    email: EmailStr
    password: str


class SAuthRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
