from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.contracts.models import ContractReport
from src.audit_reports.models import AuditReport
from src.database.core import get_db
from sqlalchemy import case
from src.obligation_reports.models import ObligationReport
from src.reports.models import RecentReport,ReportRole
from src.report.model import ExportOption
from src.notification.models import Notification
router = APIRouter(
    prefix="/api/reports/obligation",
    tags=["Obligation Reports"]
)

# ---------------- KPI ---------------- #

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
        "subtitle":"Total contracts in system",
        "trend":None,
        "type":"blue"
    },

    {
        "title":"Active Obligations",
        "value":active_contracts or 0,
        "subtitle":"Active contract records",
        "trend":None,
        "type":"green"
    },

    {
        "title":"Upcoming Renewals",
        "value":upcoming or 0,
        "subtitle":"Contracts expiring soon",
        "trend":None,
        "type":"orange"
    },

    {
        "title":"Compliance Rate",
        "value":f"{round(compliance or 0)}%",
        "subtitle":"Average compliance score",
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
        "subtitle":"Total generated reports",
        "trend":None,
        "type":"cyan"
    }

]
@router.get("/status")
def get_status(db: Session = Depends(get_db)):

    status = (
        db.query(
            ObligationReport.status,
            func.count(ObligationReport.id).label("value")
        )
        .group_by(
            ObligationReport.status
        )
        .all()
    )


    return [
    {
        "name": str(item.status),
        "value": int(item.value)
    }
    for item in status
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
# ---------------- Summary ---------------- #
@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    total = (
        db.query(func.count(ObligationReport.id))
        .scalar()
    )


    completed = (
        db.query(func.count(ObligationReport.id))
        .filter(
            ObligationReport.status == "Completed"
        )
        .scalar()
    )


    pending = (
        db.query(func.count(ObligationReport.id))
        .filter(
            ObligationReport.status.in_(
                ["Pending", "In Progress"]
            )
        )
        .scalar()
    )


    overdue = (
        db.query(func.count(ObligationReport.id))
        .filter(
            ObligationReport.status == "Overdue"
        )
        .scalar()
    )


    return [

        {
            "title": "Total Obligations",
            "value": total or 0,
            "icon": "📋",
            "type": "blue"
        },

        {
            "title": "Completed",
            "value": completed or 0,
            "icon": "✅",
            "type": "green"
        },

        {
            "title": "Pending / In Progress",
            "value": pending or 0,
            "icon": "⏳",
            "type": "orange"
        },

        {
            "title": "Overdue",
            "value": overdue or 0,
            "icon": "⚠️",
            "type": "red"
        }

    ]
# ---------------- Categories ---------------- #
@router.get("/categories")
def get_categories(
    db: Session = Depends(get_db)
):

    data = (
        db.query(

            ObligationReport.category,

            func.count(
                ObligationReport.id
            ).label("total"),

            func.sum(
                case(
                    (
                        ObligationReport.status == "Completed",
                        1
                    ),
                    else_=0
                )
            ).label("completed")

        )
        .group_by(
            ObligationReport.category
        )
        .all()
    )


    return [
        {
            "category": item.category,
            "total": item.total,
            "completed": item.completed or 0,
            "progress": round(
                ((item.completed or 0) / item.total) * 100
            )
        }
        for item in data
    ]
# ---------------- Trend ---------------- #

@router.get("/trend")
def get_trend(db: Session = Depends(get_db)):

    trends = (
        db.query(
            func.to_char(
                ObligationReport.created_at,
                "Mon"
            ).label("month"),
            func.count(ObligationReport.id).label("completed")
        )
        .filter(
            ObligationReport.status=="Completed"
        )
        .group_by(
            func.to_char(
                ObligationReport.created_at,
                "Mon"
            )
        )
        .order_by(
            func.min(ObligationReport.created_at)
        )
        .all()
    )


    return [
        {
            "month":item.month,
            "completed":item.completed
        }
        for item in trends
    ]
# ---------------- Table ---------------- #
@router.get("/table")
def get_table(db: Session = Depends(get_db)):

    obligations = db.query(
        ObligationReport
    ).all()


    return [
        {
            "id":o.obligation_id,
            "description":o.description,
            "assigned":o.assigned,
            "date":o.due_date,
            "priority":o.priority,
            "status":o.status
        }
        for o in obligations
    ]
# ---------------- Recent ---------------- #
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
# ---------------- Notifications ---------------- #
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