from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.audit_reports.models import AuditReport
from src.database.core import get_db
from src.contracts.models import ContractReport
from src.reports.models import RecentReport, ReportRole
from src.notification.models import Notification
from src.compliance_reports.models import ComplianceReport
from src.renewal_reports.models import RenewalReport
from src.report.model import ExportOption
from src.obligation_reports.models import ObligationReport
from typing import Optional
from fastapi import Query
router = APIRouter(
    prefix="/api/reports/contracts",
    tags=["Contract Reports"]
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
    "subtitle":"Contracts",
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
    "subtitle":"Report history",
    "trend":None,
    "type":"cyan"
}

]
@router.get("/filters")
def get_contract_filters(
    db: Session = Depends(get_db)
):

    return {

        "contract_status": [
            row[0]
            for row in db.query(
                ContractReport.status
            ).distinct().all()
            if row[0]
        ],

        "vendor": [
            row[0]
            for row in db.query(
                ContractReport.vendor
            ).distinct().all()
            if row[0]
        ],

        "department": [
            row[0]
            for row in db.query(
                ContractReport.department
            ).distinct().all()
            if row[0]
        ],

        "priority": [
            row[0]
            for row in db.query(
                ContractReport.priority
            ).distinct().all()
            if row[0]
        ],

        "compliance_status": [
            row[0]
            for row in db.query(
                ContractReport.compliance_status
            ).distinct().all()
            if row[0]
        ],

        "renewal_status": [
            row[0]
            for row in db.query(
                ContractReport.renewal_status
            ).distinct().all()
            if row[0]
        ],

        "assigned_user": [
            row[0]
            for row in db.query(
                ContractReport.assigned_user
            ).distinct().all()
            if row[0]
        ],

        "report_type": [
            "Contract",
            "Compliance",
            "Renewal",
            "Obligation",
            "Audit"
        ]
    }
@router.get("/table")
def get_table(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    vendor: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(ContractReport)

    if status:
        query = query.filter(ContractReport.status == status)

    if vendor:
        query = query.filter(ContractReport.vendor == vendor)

    if department:
        query = query.filter(ContractReport.department == department)

    # Filter by expiry date (adjust the column if you use a different date field)
    if start_date:
        query = query.filter(ContractReport.expiry_date >= start_date)

    if end_date:
        query = query.filter(ContractReport.expiry_date <= end_date)

    contracts = query.all()

    return [
        {
            "id": c.contract_id,
            "vendor": c.vendor,
            "department": c.department,
            "status": c.status,
            "value": f"${c.contract_value}",
            "expiry": c.expiry_date
        }
        for c in contracts
    ]
@router.get("/status")
def get_status(db: Session = Depends(get_db)):

    status = (
        db.query(
            ContractReport.status,
            func.count(ContractReport.id).label("value")
        )
        .group_by(
            ContractReport.status
        )
        .all()
    )


    return [
        {
            "name": item.status,
            "value": item.value
        }
        for item in status
    ]
@router.get("/tab-counts")
def get_report_tab_counts(
    db: Session = Depends(get_db)
):

    contract_count = (
        db.query(func.count(ContractReport.id))
        .scalar()
    )

    compliance_count = (
        db.query(func.count(ComplianceReport.id))
        .scalar()
    )

    renewal_count = (
        db.query(func.count(RenewalReport.id))
        .scalar()
    )

    obligation_count = (
        db.query(func.count(ObligationReport.id))
        .scalar()
    )

    audit_count = (
        db.query(func.count(AuditReport.id))
        .scalar()
    )


    return {
        "contract": contract_count or 0,
        "compliance": compliance_count or 0,
        "renewal": renewal_count or 0,
        "obligation": obligation_count or 0,
        "audit": audit_count or 0
    }
@router.get("/departments")
def get_departments(db: Session = Depends(get_db)):

    departments = (
        db.query(
            ContractReport.department,
            func.count(ContractReport.id).label("count")
        )
        .group_by(
            ContractReport.department
        )
        .all()
    )


    return [
        {
            "department": item.department,
            "count": item.count
        }
        for item in departments
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
@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):


    total = db.query(
        func.count(ContractReport.id)
    ).scalar()


    active = db.query(
        func.count(ContractReport.id)
    ).filter(
        ContractReport.status=="Active"
    ).scalar()


    expiring = db.query(
        func.count(ContractReport.id)
    ).filter(
        ContractReport.status=="Expiring"
    ).scalar()


    expired = db.query(
        func.count(ContractReport.id)
    ).filter(
        ContractReport.status=="Expired"
    ).scalar()


    terminated = db.query(
        func.count(ContractReport.id)
    ).filter(
        ContractReport.status=="Terminated"
    ).scalar()


    draft = db.query(
        func.count(ContractReport.id)
    ).filter(
        ContractReport.status=="Draft"
    ).scalar()


    return [
        {"title":"Total Contracts","value":total,"type":"blue"},
        {"title":"Active","value":active,"type":"green"},
        {"title":"Expiring Soon","value":expiring,"type":"orange"},
        {"title":"Expired","value":expired,"type":"red"},
        {"title":"Terminated","value":terminated,"type":"red"},
        {"title":"Draft","value":draft,"type":"purple"}
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