from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ⬅️ tambahkan ini
from app import users, models
from app.database import engine

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # URL frontend Vue
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

# Routing
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to TailStore Backend!"}