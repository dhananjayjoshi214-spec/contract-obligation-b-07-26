from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.audit_reports.service import get_all_audit_reports

router = APIRouter(
    prefix="/audit-reports",
    tags=["Audit Reports"]
)


@router.get("/trail")
def get_audit_trail(db: Session = Depends(get_db)):
    return get_all_audit_reports(db)