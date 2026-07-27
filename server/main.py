from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import obligations

app = FastAPI(title="Obligation Tracker API")

# Allow the Vite dev server (and any origin during development) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(obligations.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "obligation-tracker-api"}
