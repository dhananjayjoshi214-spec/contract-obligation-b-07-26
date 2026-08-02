from src.database.core import Base, engine

# Import all models
from src.audit_reports.models import AuditReport

from src.contracts.models import ContractReport
from src.compliance_reports.models import ComplianceReport
from src.renewal_reports.models import RenewalReport
from src.reports.models import RecentReport ,ReportRole


Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")