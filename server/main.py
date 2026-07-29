from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine, Base
from src.entities import dashboard
from src.routers.dashboard import router as dashboard_router
from app.routers import obligations

app = FastAPI(title="Obligation Tracker API")

app = FastAPI()
Base.metadata.create_all(bind=engine)
# Allow React frontend
# Allow the Vite dev server (and any origin during development) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[

        "http://localhost:5173"

    ],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(obligations.router)
# Dashboard APIs
app.include_router(
    dashboard_router,
    prefix="/api"
)

@app.get("/")
def root():
    return {"status": "ok", "service": "obligation-tracker-api"}
