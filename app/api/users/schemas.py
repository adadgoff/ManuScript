from uuid import UUID

from pydantic import BaseModel, EmailStr

# TODO: Implement good schemas.
class SUserInfo(BaseModel):
    uuid: UUID
    email: EmailStr
    username: str

    # icon: UUID  TODO: implement work with image.
