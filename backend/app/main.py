from fastapi import FastAPI
from app import users, models
from app.database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to TailStore Backend!"}
