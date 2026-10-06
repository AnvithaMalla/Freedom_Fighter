from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.database import engine
from app.routers import persons
from app.routers.stamps import router as stamps_router


app = FastAPI(
    title="Freedom Fighter API",
    description="API for the Freedom Fighter database",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Serve stamp images from the existing Stamps folder
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
STAMPS_DIR = BASE_DIR.parent / "Stamps"

app.mount(
    "/stamps",
    StaticFiles(directory=STAMPS_DIR),
    name="stamps",
)


# --------------------------------------------------
# Routers
# --------------------------------------------------

app.include_router(persons.router)
app.include_router(stamps_router)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "success": True,
        "message": "Freedom Fighter API is running",
    }


# --------------------------------------------------
# Database test
# --------------------------------------------------

@app.get("/api/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT NOW()")
            )

            current_time = result.scalar()

        return {
            "success": True,
            "message": "PostgreSQL connected successfully",
            "database": "freedom_database",
            "time": current_time,
        }

    except Exception as error:
        return {
            "success": False,
            "message": "PostgreSQL connection failed",
            "error": str(error),
        }