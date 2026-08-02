from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.audit_reports import router as audit_router
from src.routers.contract_reports import router as contract_router
from src.routers.compliance_reports import router as compliance_router
from src.routers.renewal_reports import router as renewal_router
from src.routers.obligation_reports import router as obligation_router
from src.routers.dashboard import router as dashboard_router
from src.routers.reports_router import router as report_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit_router)
app.include_router(contract_router)
app.include_router(compliance_router)
app.include_router(renewal_router)
app.include_router(obligation_router)
app.include_router(report_router)
@app.get("/")
def hello_world():
    return {"Hello": "World"}