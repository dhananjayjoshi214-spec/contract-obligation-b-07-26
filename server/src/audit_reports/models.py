from sqlalchemy import Column, Integer, String, Date, Text, TIMESTAMP
from src.database.core import Base


class AuditReport(Base):

    __tablename__ = "audit_report"

    id = Column(Integer, primary_key=True, index=True)

    audit_name = Column(String)
    department = Column(String)
    auditor = Column(String)

    audit_date = Column(Date)

    status = Column(String)

    compliance_score = Column(Integer)

    findings = Column(Integer)

    remarks = Column(Text)

    created_at = Column(TIMESTAMP)