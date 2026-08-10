from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
import calendar
from src.contracts.models import ContractReport
from src.audit_reports.models import AuditReport
from src.database.core import get_db
from src.renewal_reports.models import RenewalReport
from src.reports.models import RecentReport,ReportRole
from src.report.model import ExportOption
from src.notification.models import Notification
router = APIRouter(
    prefix="/api/reports/renewal",
    tags=["Renewal Reports"]
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
"subtitle":"Generated reports",
"trend":None,
"type":"cyan"
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
# ---------------- Summary ---------------- #

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    today = func.current_date()


    renewing_week = (
        db.query(func.count(RenewalReport.id))
        .filter(
            RenewalReport.renewal_date >= today,
            RenewalReport.renewal_date <= today + 7,
            RenewalReport.status != "Expired"
        )
        .scalar()
    )


    renewing_month = (
        db.query(func.count(RenewalReport.id))
        .filter(
            RenewalReport.renewal_date >= today,
            RenewalReport.renewal_date <= today + 30,
            RenewalReport.status != "Expired"
        )
        .scalar()
    )


    auto_renewals = (
        db.query(func.count(RenewalReport.id))
        .filter(
            RenewalReport.renewal_type == "Auto"
        )
        .scalar()
    )


    manual_renewals = (
        db.query(func.count(RenewalReport.id))
        .filter(
            RenewalReport.renewal_type == "Manual"
        )
        .scalar()
    )


    return [

        {
            "title": "Renewing This Week",
            "value": renewing_week or 0,
            "icon": "📅",
            "type": "blue"
        },

        {
            "title": "Renewing This Month",
            "value": renewing_month or 0,
            "icon": "🗓️",
            "type": "green"
        },

        {
            "title": "Auto Renewals",
            "value": auto_renewals or 0,
            "icon": "🔄",
            "type": "purple"
        },

        {
            "title": "Manual Renewals",
            "value": manual_renewals or 0,
            "icon": "✍️",
            "type": "orange"
        }

    ]
# ---------------- Department Chart ---------------- #

@router.get("/departments")
def get_departments(db: Session = Depends(get_db)):

    data = (
        db.query(
            RenewalReport.department,
            func.count(RenewalReport.id).label("count")
        )
        .group_by(
            RenewalReport.department
        )
        .all()
    )


    return [
        {
            "department":item.department,
            "count":item.count
        }
        for item in data
    ]
# ---------------- Monthly Trend ---------------- #

@router.get("/trend")
def get_trend(db: Session = Depends(get_db)):

    data = (
        db.query(
            func.to_char(
                RenewalReport.created_at,
                "Mon"
            ).label("month"),
            func.count(
                RenewalReport.id
            ).label("renewals")
        )
        .group_by(
            func.to_char(
                RenewalReport.created_at,
                "Mon"
            )
        )
        .order_by(
            func.min(RenewalReport.created_at)
        )
        .all()
    )


    return [
        {
            "month":item.month,
            "renewals":item.renewals
        }
        for item in data
    ]


@router.get("/calendar")
def renewal_calendar(
    db: Session = Depends(get_db)
):

    year = date.today().year
    month = date.today().month

    # Get days in current month
    total_days = calendar.monthrange(year, month)[1]


    # Get renewal records
    records = db.query(
        RenewalReport
    ).all()


    renewal_map = {}

    for r in records:

        if r.renewal_date:

            renewal_map[r.renewal_date.day] = {
                "company": r.vendor,
                "status": r.status.lower()
            }


    calendar_data = []


    # Generate complete calendar days
    for day in range(1, total_days + 1):

        if day in renewal_map:

            calendar_data.append(
                {
                    "day": day,
                    "company": renewal_map[day]["company"],
                    "status": renewal_map[day]["status"]
                }
            )

        else:

            calendar_data.append(
                {
                    "day": day,
                    "company": "",
                    "status": "normal"
                }
            )


    return calendar_data
# ---------------- Table ---------------- #
@router.get("/table")
def get_table(db: Session = Depends(get_db)):

    records = db.query(
        RenewalReport
    ).all()


    return [
        {
            "contract":r.contract,
            "vendor":r.vendor,
            "date":r.renewal_date,
            "reminder":r.reminder,
            "priority":r.priority,
            "status":r.status
        }
        for r in records
    ]
# ---------------- Recent Reports ---------------- #
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