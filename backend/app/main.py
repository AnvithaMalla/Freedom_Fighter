
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.database import engine
from app.routers import persons
from app.routers.stamps import router as stamps_router
from app.routers.articles import router as articles_router


# --------------------------------------------------
# Directory paths
# --------------------------------------------------

# Project root: Freedom_Fighter/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

ARTICLES_DIR = PROJECT_ROOT / "ARTICLES"
STAMPS_DIR = PROJECT_ROOT / "Stamps"


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="Freedom Fighter API",
    description="API for the Freedom Fighter database",
    version="1.0.0",
)


# --------------------------------------------------
# CORS configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://freedom-fighter-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Serve stamp images
# --------------------------------------------------

if STAMPS_DIR.is_dir():
    app.mount(
        "/stamps",
        StaticFiles(directory=str(STAMPS_DIR)),
        name="stamps",
    )
else:
    print(f"WARNING: Stamps directory not found: {STAMPS_DIR}")


# --------------------------------------------------
# Serve article images and files
# --------------------------------------------------

if ARTICLES_DIR.is_dir():
    app.mount(
        "/articles",
        StaticFiles(directory=str(ARTICLES_DIR)),
        name="article-files",
    )
else:
    print(f"WARNING: Articles directory not found: {ARTICLES_DIR}")


# --------------------------------------------------
# API routers
# --------------------------------------------------

app.include_router(persons.router)
app.include_router(stamps_router)
app.include_router(articles_router)


# --------------------------------------------------
# Root endpoint
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "success": True,
        "message": "Freedom Fighter API is running",
    }


# --------------------------------------------------
# Database connection test
# --------------------------------------------------

@app.get("/api/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT NOW()"))
            current_time = result.scalar()

        return {
            "success": True,
            "message": "PostgreSQL connected successfully",
            "database": "freedom_database",
            "time": current_time,
        }

    except Exception as error:
        # Log the actual error on the server.
        print(f"Database connection failed: {error}")

        return {
            "success": False,
            "message": "PostgreSQL connection failed",
        }
