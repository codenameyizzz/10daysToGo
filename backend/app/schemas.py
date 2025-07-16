from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    username: str | None = None
    email: str | None = None
    password: str | None = None

class Token(BaseModel):
    access_token: str
    token_type: str
