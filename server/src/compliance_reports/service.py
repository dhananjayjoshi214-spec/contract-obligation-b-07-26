from sqlalchemy.orm import Session
from .models import ComplianceReport


def get_all_compliance_reports(db: Session):

    return db.query(ComplianceReport).all()