from sqlalchemy.orm import Session
from src.audit_reports.models import AuditReport


def get_all_audit_reports(db: Session):

    return db.query(AuditReport).all()