from pydantic import BaseModel, EmailStr, Field


class SUser(BaseModel):
    Email: EmailStr
    SurnameName: str
    HashedPassword: str

    # class Config:
    #     from_attributes = True


class SUserLogin(BaseModel):
    Email: EmailStr
    Password: str

    # class Config:
    #     from_attributes = True


class SUserRegistry(BaseModel):
    Email: EmailStr
    SurnameName: str
    Password: str

    # class Config:
    #     from_attributes = True


class SUserResponse(BaseModel):
    Users: SUser = Field()
