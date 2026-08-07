from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.audit_reports.models import AuditReport
from src.contracts.models import ContractReport
from src.database.core import get_db
from src.audit_reports.service import get_all_audit_reports
from src.audit_logs.models import AuditLog
from src.renewal_reports.models import RenewalReport
from src.reports.models import RecentReport,ReportRole
from src.notification.models import Notification
from src.report.model import ExportOption
router = APIRouter(
    prefix="/api/reports/audit",
    tags=["Audit Reports"]
)

@router.get("/dashboard-metrics")
def get_dashboard_metrics(
    db: Session = Depends(get_db)
):

    # Total contracts
    total_contracts = (
        db.query(
            func.count(ContractReport.id)
        )
        .scalar()
    )


    # Active contracts
    active_contracts = (
        db.query(
            func.count(ContractReport.id)
        )
        .filter(
            ContractReport.status=="Active"
        )
        .scalar()
    )


    # Upcoming renewals
    upcoming = (
        db.query(
            func.count(ContractReport.id)
        )
        .filter(
            ContractReport.status=="Expiring"
        )
        .scalar()
    )


    # Compliance rate
    compliance = (
        db.query(
            func.avg(
                ContractReport.compliance_rate
            )
        )
        .scalar()
    )


    # Pending audits
    pending_audits = (
        db.query(
            func.count(AuditReport.id)
        )
        .filter(
            AuditReport.status=="Pending"
        )
        .scalar()
    )


    # Generated reports
    reports_generated = (
        db.query(
            func.count(RecentReport.id)
        )
        .scalar()
    )
    return [

    {
        "title":"Total Contracts",
        "value":total_contracts or 0,
        "subtitle":"Total contracts",
        "trend":None,
        "type":"blue"
    },

    {
        "title":"Active Obligations",
        "value":active_contracts or 0,
        "subtitle":"Active contracts",
        "trend":None,
        "type":"green"
    },

    {
        "title":"Upcoming Renewals",
        "value":upcoming or 0,
        "subtitle":"Expiring contracts",
        "trend":None,
        "type":"orange"
    },

    {
        "title":"Compliance Rate",
        "value":f"{round(compliance or 0)}%",
        "subtitle":"Average compliance",
        "trend":None,
        "type":"purple"
    },

    {
        "title":"Pending Audits",
        "value":pending_audits or 0,
        "subtitle":"Pending audit records",
        "trend":None,
        "type":"red"
    },

    {
        "title":"Reports Generated",
        "value":reports_generated or 0,
        "subtitle":"Report history",
        "trend":None,
        "type":"cyan"
    }

]
@router.get("/roles")
def get_roles(db: Session = Depends(get_db)):

    roles = db.query(ReportRole).all()

    return {
        
        "roles": [
            {
                "role": r.role,
                "access": r.access
            }
            for r in roles
        ]
    }
@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    total_audits = db.query(
        func.count(AuditReport.id)
    ).scalar()

    completed_audits = db.query(
        func.count(AuditReport.id)
    ).filter(
        AuditReport.status=="Completed"
    ).scalar()

    departments = db.query(
        func.count(func.distinct(AuditReport.department))
    ).scalar()

    findings = db.query(
        func.sum(AuditReport.findings)
    ).scalar()


    return [

        {
            "title":"Total Audits",
            "value":str(total_audits or 0),
            "icon":"📋",
            "type":"blue"
        },

        {
            "title":"Completed Audits",
            "value":str(completed_audits or 0),
            "icon":"✅",
            "type":"green"
        },

        {
            "title":"Departments Audited",
            "value":str(departments or 0),
            "icon":"🏢",
            "type":"purple"
        },

        {
            "title":"Audit Findings",
            "value":str(findings or 0),
            "icon":"⚠️",
            "type":"orange"
        }

    ]
@router.get("/timeline")
def get_timeline(db: Session = Depends(get_db)):

    logs = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .limit(6)
        .all()
    )

    return [
        {
            "user": log.user_name,
            "action": f"{log.action} {log.module}",
            "time": log.created_at.strftime("%H:%M")
        }
        for log in logs
    ]
@router.get("/activity")
def get_activity(db: Session = Depends(get_db)):

    activities = (
        db.query(
            func.to_char(AuditReport.audit_date, 'Dy').label("day"),
            func.count(AuditReport.id).label("events")
        )
        .group_by(
            func.to_char(AuditReport.audit_date, 'Dy')
        )
        .all()
    )


    return [
        {
            "day": item.day.strip(),
            "events": item.events
        }
        for item in activities
    ]

@router.get("/trail")
def get_trail(db: Session = Depends(get_db)):

    logs = (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )

    return [
        {
            "timestamp": log.created_at,
            "user": log.user_name,
            "module": log.module,
            "action": log.action,
            "previous": log.previous_value,
            "updated": log.updated_value,
            "ip": log.ip_address
        }
        for log in logs
    ]
@router.get("/recent")
def get_recent(db:Session=Depends(get_db)):

    reports = db.query(
        RecentReport
    ).all()


    return [
    {
        "name": r.name,
        "type": r.type,
        "user": r.generated_by,
        "date": r.generated_date,
        "format": r.format
    }
    for r in reports
]
@router.get("/excel-options")
def get_excel_options(
    db:Session=Depends(get_db)
):

    options = (
        db.query(ExportOption)
        .filter(
            ExportOption.report_type=="audit",
            ExportOption.format=="excel"
        )
        .all()
    )


    return [
        {
            "label":o.label,
            "checked":o.checked
        }
        for o in options
    ]
@router.get("/pdf-options")
def get_pdf_options(
    db:Session=Depends(get_db)
):

    options = (
        db.query(ExportOption)
        .filter(
            ExportOption.report_type=="audit",
            ExportOption.format=="pdf"
        )
        .all()
    )


    return [
        {
            "label":o.label,
            "checked":o.checked
        }
        for o in options
    ]
@router.get("/notifications")
def get_notifications(db: Session = Depends(get_db)):

    notifications = (
        db.query(Notification)
        .order_by(Notification.created_at.desc())
        .all()
    )

    return [
        {
            "title": n.title,
            "message": n.message,
            "time": (
                n.created_at.strftime("%d %b %Y")
                if n.created_at
                else ""
            ),
            "type": n.type
        }
        for n in notifications
    ]
@router.get("/list")
def get_reports(db: Session = Depends(get_db)):

    reports = get_all_audit_reports(db)

    return reports