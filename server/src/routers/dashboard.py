from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from sqlalchemy import func

from src.database.core import get_db

from src.contracts.models import ContractReport
from src.obligation_reports.models import ObligationReport
from src.renewal_reports.models import RenewalReport
from src.compliance_reports.models import ComplianceReport
from src.audit_reports.models import AuditReport
from src.reports.models import RecentReport


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):


    # Total contracts
    total_contracts = db.query(
        func.count(ContractReport.id)
    ).scalar()


    # Active obligations
    active_obligations = db.query(
    func.count(ObligationReport.id)
    ).filter(
    ObligationReport.status=="Active"
        ).scalar()


    completed_obligations = db.query(
    func.count(ObligationReport.id)
    ).filter(
    ObligationReport.status=="Completed"
    ).scalar()


    # Upcoming renewals
    upcoming_renewals = db.query(
        func.count(RenewalReport.id)
    ).filter(
        RenewalReport.status=="Upcoming"
    ).scalar()


    # Compliance average
    compliance_rate = db.query(
        func.avg(ComplianceReport.compliance_rate)
    ).scalar()


    # Pending audits
    pending_audits = db.query(
        func.count(AuditReport.id)
    ).filter(
        AuditReport.status=="Pending"
    ).scalar()


    # Reports generated
    reports_generated = db.query(
        func.count(RecentReport.id)
    ).scalar()


    pdf_count = db.query(
        func.count(RecentReport.id)
    ).filter(
        RecentReport.format=="PDF"
    ).scalar()


    excel_count = db.query(
        func.count(RecentReport.id)
    ).filter(
        RecentReport.format=="Excel"
    ).scalar()



    return [

    {
        "title":"Total Contracts",
        "value":str(total_contracts or 0),
        "subtitle":"Contracts",
        "trend":None,
        "type":"blue"
    },

    {
        "title":"Active Obligations",
        "value":str(active_obligations or 0),
        "subtitle":"Completed obligations",
        "trend":None,
        "type":"green"
    },

    {
        "title":"Upcoming Renewals",
        "value":str(upcoming_renewals or 0),
        "subtitle":"Upcoming renewals",
        "trend":None,
        "type":"orange"
    },

    {
        "title":"Compliance Rate",
        "value":f"{round(compliance_rate or 0)}%",
        "subtitle":"Average compliance",
        "trend":None,
        "type":"purple"
    },

    {
        "title":"Pending Audits",
        "value":str(pending_audits or 0),
        "subtitle":"Pending audit records",
        "trend":None,
        "type":"red"
    },

    {
        "title":"Reports Generated",
        "value":str(reports_generated or 0),
        "subtitle":f"PDF: {pdf_count} · Excel: {excel_count}",
        "trend":None,
        "type":"cyan"
    }

]


from src.database.core import get_db
from src.entities.dashboard import (
    DashboardMetric,
    Department,
    RiskTrend,
    Audit,
    Risk,
)

router = APIRouter()


@router.get("/dashboard/metrics")
def get_metrics(db: Session = Depends(get_db)):

    metric = db.query(DashboardMetric).order_by(DashboardMetric.id.desc()).first()

    if metric is None:
        return {"message": "No data found"}

    return {
        "overallCompliance": metric.overall_compliance,
        "missedDeadlines": metric.missed_deadlines,
        "riskFlags": metric.risk_flags,
        "auditsCompleted": metric.audits_completed
    }



@router.get("/dashboard/departments")
def get_departments(db: Session = Depends(get_db)):
    return [
        {
            "department": d.department,
            "score": d.score,
        }
        for d in db.query(Department).all()
    ]


@router.get("/dashboard/risk-trend")
def get_risk_trend(db: Session = Depends(get_db)):

    return [
        {
            "month": r.month,
            "low": r.low,
            "medium": r.medium,
            "high": r.high,
        }
        for r in db.query(RiskTrend).all()
    ]
@router.get("/dashboard/audits")
def get_audits(db: Session = Depends(get_db)):
    return [
        {
            "audit": a.audit,
            "department": a.department,
            "auditor": a.auditor,
            "status": a.status,
            "score": a.score,
        }
        for a in db.query(Audit).all()
    ]


@router.get("/dashboard/risks")
def get_risks(db: Session = Depends(get_db)):
    return [
        {
            "title": r.title,
            "level": r.level,
            "count": r.count,
        }
        for r in db.query(Risk).all()
    ]

