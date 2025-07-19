from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import users, models
from app.database import engine
from app.reviews import router as reviews_router

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # URL frontend Vue
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Buat semua tabel yang didefinisikan di models
models.Base.metadata.create_all(bind=engine)

# Daftarkan router dengan prefix '/api'
app.include_router(users.router,   prefix="/api", tags=["users"])
app.include_router(reviews_router, prefix="/api", tags=["reviews"])

@app.get("/")
def read_root():
    return {"message": "Welcome to TailStore Backend!"}
