from pydantic import BaseModel, EmailStr


class SAuthAccessToken(BaseModel):
    access_token: str


class SAuthEmail(BaseModel):
    email: EmailStr


class SAuthLogin(SAuthEmail):
    password: str


class SAuthRegister(SAuthLogin):
    username: str
