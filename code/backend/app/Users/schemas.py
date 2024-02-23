from pydantic import BaseModel, EmailStr, Field


class SUser(BaseModel):
    Email: EmailStr
    SurnameName: str
    HashedPassword: str

    class Config:
        from_attributes = True


class SUserRegister(BaseModel):
    Email: EmailStr
    SurnameName: str
    Password: str


class SUserResponse(BaseModel):
    Users: SUser = Field()
