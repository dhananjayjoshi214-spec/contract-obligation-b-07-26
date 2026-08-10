from fastapi import FastAPI

from src.contracts.controller import router as contracts_router
from src.obligations.controller import router as obligations_router
from src.routers.notifications import router as notifications_router


def register_routes(app: FastAPI):
    app.include_router(contracts_router)
    app.include_router(obligations_router)
    app.include_router(notifications_router)
