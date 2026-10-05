from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine
from app.routers import persons


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


app.include_router(persons.router)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "Freedom Fighter API is running",
    }


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