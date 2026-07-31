from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import engine, Base
from src.entities import dashboard, user, contract, obligation, notification

from src.routers.dashboard import router as dashboard_router
from src.routers.obligations import router as obligations_router
from src.routers.notifications import router as notifications_router

app = FastAPI(title="Obligation Tracker API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api")
app.include_router(obligations_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "service": "obligation-tracker-api"}
