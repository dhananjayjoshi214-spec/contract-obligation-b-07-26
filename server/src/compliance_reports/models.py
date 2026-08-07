from sqlalchemy import Column, Integer, String, Date, Text, TIMESTAMP
from src.database.core import Base


class ComplianceReport(Base):

    __tablename__ = "compliance_report"

    id = Column(Integer, primary_key=True)

    obligation = Column(String)

    department = Column(String)

    assigned = Column(String)

    status = Column(String)

    completion = Column(Date)

    compliance_rate = Column(Integer)

    due_date = Column(Date)

    remarks = Column(Text)

    created_at = Column(TIMESTAMP)