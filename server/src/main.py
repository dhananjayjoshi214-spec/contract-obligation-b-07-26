from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine
from src.renewals import controller
from src.routers.routes import router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ContractIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Renewal Module
app.include_router(controller.router)

# Authentication Module
app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "ContractIQ API Running"
    }