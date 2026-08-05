from src.database.core import SessionLocal
from src.entities.dashboard import (
    DashboardMetric,
    Department,
    RiskTrend,
    Audit,
    Risk,
)

db = SessionLocal()

db.query(DashboardMetric).delete()
db.query(Department).delete()
db.query(RiskTrend).delete()
db.query(Audit).delete()
db.query(Risk).delete()

db.add(
    DashboardMetric(
        overall_compliance=50,
        missed_deadlines=3,
        risk_flags=5,
        audits_completed="18/22",
    )
)

db.add_all([
    Department(department="Legal", score=98),
    Department(department="Finance", score=91),
    Department(department="HR", score=87),
    Department(department="IT", score=95),
    Department(department="Operations", score=80),
    Department(department="Procurement", score=89),
])

db.add_all([
    RiskTrend(month="Jan", risk=85),
    RiskTrend(month="Feb", risk=78),
    RiskTrend(month="Mar", risk=45),
    RiskTrend(month="Apr", risk=70),
    RiskTrend(month="May", risk=75),
    RiskTrend(month="Jun", risk=65),
])

db.add_all([
    Audit(
        audit="Q2 Vendor Contracts Audit",
        department="Procurement",
        auditor="David Park",
        status="Completed",
        score=97,
    ),
    Audit(
        audit="GDPR Compliance Audit",
        department="IT",
        auditor="Sarah Chen",
        status="In Progress",
        score=85,
    ),
    Audit(
        audit="HR Policy Review",
        department="HR",
        auditor="John Smith",
        status="Terminated",
        score=60,
    ),
])

db.add_all([
    Risk(title="Expired Contracts", level="High", count=2),
    Risk(title="Contracts Without Owner", level="Medium", count=7),
    Risk(title="Past Due Obligations", level="High", count=3),
    Risk(title="Missing Documentation", level="Medium", count=5),
    Risk(title="Renewal Notices", level="Low", count=4),
])

db.commit()
db.close()

print("Data inserted successfully!")