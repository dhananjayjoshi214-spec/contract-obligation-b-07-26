from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine, SessionLocal
from src.database.seed import seed_if_empty
from src.api import register_routes
from src.exceptions import register_exception_handlers
from src.logging import configure_logging

configure_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()
    yield


app = FastAPI(title="ContractIQ API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)
register_routes(app)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
