from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter(
    prefix="/reviews",
    tags=["reviews"],
)

class Review(BaseModel):
    uploader: str
    status: str
    reviewComment: str

@router.get("/", response_model=List[Review])
def list_reviews():
    # TODO: ganti dengan query database kalau sudah siap
    return [
        {"uploader": "user1", "status": "Pending",  "reviewComment": ""},
        {"uploader": "user2", "status": "Approved", "reviewComment": "OK"},
    ]
