from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from typing import Optional
from fastapi import Query
from src.database.core import get_db
from src.compliance_reports.models import ComplianceReport
from src.reports.models import RecentReport, ReportRole
from src.contracts.models import ContractReport
from src.audit_reports.models import AuditReport
from src.report.model import ExportOption
from src.notification.models import Notification
router = APIRouter(
    prefix="/api/reports/compliance",
    tags=["Compliance Reports"]
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
    "subtitle":"Pending audits",
    "trend":None,
    "type":"red"
},

{
    "title":"Reports Generated",
    "value":reports_generated or 0,
    "subtitle":"Generated reports",
    "trend":None,
    "type":"cyan"
}

]
@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    # Total compliance tasks
    total_tasks = (
        db.query(func.count(ComplianceReport.id))
        .scalar()
    )


    # Completed compliance tasks
    completed = (
        db.query(func.count(ComplianceReport.id))
        .filter(
            ComplianceReport.status=="Completed"
        )
        .scalar()
    )


    # Pending compliance tasks
    pending = (
        db.query(func.count(ComplianceReport.id))
        .filter(
            ComplianceReport.status=="Pending"
        )
        .scalar()
    )


    # Overdue compliance tasks
    overdue = (
        db.query(func.count(ComplianceReport.id))
        .filter(
            ComplianceReport.status=="Overdue"
        )
        .scalar()
    )


    # Compliance percentage
    compliance_rate = 0

    if total_tasks > 0:
        compliance_rate = round(
            (completed / total_tasks) * 100
        )


    return [

        {
            "title":"Completed",
            "value":completed,
            "description":"Tasks completed successfully",
            "type":"green"
        },

        {
            "title":"Pending",
            "value":pending,
            "description":"Tasks awaiting action",
            "type":"orange"
        },

        {
            "title":"Overdue",
            "value":overdue,
            "description":"Tasks beyond deadline",
            "type":"red"
        },

        {
            "title":"Compliance Rate",
            "value":f"{compliance_rate}%",
            "description":"Overall compliance achievement",
            "type":"blue"
        }

    ]
@router.get("/roles")
def get_roles(db: Session = Depends(get_db)):

    roles = db.query(ReportRole).all()

    return {
        "current_role": "Legal Manager",
        "roles": [
            {
                "role": r.role,
                "access": r.access
            }
            for r in roles
        ]
    }
@router.get("/departments")
def get_departments(db: Session = Depends(get_db)):

    departments = (
        db.query(
            ComplianceReport.department,
            func.avg(ComplianceReport.compliance_rate).label("rate")
        )
        .group_by(ComplianceReport.department)
        .all()
    )

    return [
        {
            "department": item.department,
            "rate": round(item.rate)
        }
        for item in departments
    ]
@router.get("/table")
def get_table(
    department: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = db.query(ComplianceReport)


    if department:
        query = query.filter(
            ComplianceReport.department == department
        )


    if status:
        query = query.filter(
            ComplianceReport.status == status
        )


    if search:
        query = query.filter(
            (ComplianceReport.obligation.ilike(f"%{search}%")) |
            (ComplianceReport.assigned.ilike(f"%{search}%")) |
            (ComplianceReport.status.ilike(f"%{search}%"))
        )


    reports = query.all()


    return [
        {
            "obligation": report.obligation,
            "dueDate": report.due_date,
            "assigned": report.assigned,
            "status": report.status,
            "completion": report.completion
        }
        for report in reports
    ]
@router.get("/trends")
def get_trends(db: Session = Depends(get_db)):

    trends = (
        db.query(
            func.to_char(
                ComplianceReport.created_at,
                'Mon'
            ).label("month"),
            func.avg(
                ComplianceReport.compliance_rate
            ).label("rate")
        )
        .group_by(
            func.to_char(
                ComplianceReport.created_at,
                'Mon'
            )
        )
        .order_by(
            func.min(ComplianceReport.created_at)
        )
        .all()
    )

    return [
        {
            "month": item.month,
            "rate": round(item.rate)
        }
        for item in trends
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