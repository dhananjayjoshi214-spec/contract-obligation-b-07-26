from sqlalchemy.orm import Session
from src.entities.contract import Contract
from src.entities.obligation import Obligation

CONTRACTS_SEED = [
    dict(id="CTR-2024-001", name="Master Services Agreement — Accenture LLP", type="Vendor",
         party="Accenture LLP", effective="Jan 15, 2024", expiry="Jan 14, 2026",
         status="Active", owner="Sarah Chen", value="$2,400,000"),
    dict(id="CTR-2024-002", name="Executive Employment Agreement — J. Whitfield", type="Employment",
         party="James Whitfield", effective="Mar 1, 2024", expiry="Feb 28, 2026",
         status="Active", owner="David Park", value="$380,000"),
    dict(id="CTR-2024-003", name="Commercial Lease — HQ Tower A, Floors 3-5", type="Lease",
         party="Metropolitan REIT Corp.", effective="Jun 1, 2022", expiry="May 31, 2024",
         status="Expiring Soon", owner="Lisa Torres", value="$1,800,000/yr"),
    dict(id="CTR-2024-004", name="Enterprise SaaS License — Salesforce Corp.", type="Software",
         party="Salesforce Inc.", effective="Jan 1, 2024", expiry="Dec 31, 2024",
         status="Under Review", owner="Mark Johnson", value="$240,000"),
    dict(id="CTR-2024-005", name="Mutual Non-Disclosure Agreement — TechVenture", type="NDA",
         party="TechVenture Group LLC", effective="Apr 10, 2024", expiry="Apr 9, 2025",
         status="Active", owner="Sarah Chen", value="N/A"),
    dict(id="CTR-2024-006", name="APAC Distribution Agreement", type="Vendor",
         party="Pacific Trade Co. Ltd.", effective="Jul 1, 2023", expiry="Jun 30, 2024",
         status="Expiring Soon", owner="James Lee", value="$890,000"),
    dict(id="CTR-2024-007", name="Legal Advisory Consulting Agreement", type="Services",
         party="Morrison & Foerster LLP", effective="Feb 15, 2024", expiry="Aug 14, 2024",
         status="Draft", owner="Lisa Torres", value="$120,000"),
    dict(id="CTR-2024-008", name="GDPR Data Processing Agreement — EU Partners", type="Compliance",
         party="EU Partners Consortium", effective="Jan 1, 2024", expiry="Dec 31, 2025",
         status="Active", owner="David Park", value="N/A"),
    dict(id="CTR-2024-009", name="Cloud Infrastructure Agreement — AWS", type="Software",
         party="Amazon Web Services", effective="Mar 1, 2024", expiry="Feb 28, 2026",
         status="Active", owner="Mark Johnson", value="$560,000"),
    dict(id="CTR-2024-010", name="Marketing Agency Retainer Agreement", type="Services",
         party="Ogilvy & Mather Group", effective="Jan 1, 2024", expiry="Dec 31, 2024",
         status="Under Review", owner="Sarah Chen", value="$180,000"),
]

OBLIGATIONS_SEED = [
    dict(id="OBL-001", contract_id="CTR-2024-001", title="Submit Q1 SLA performance report",
         assignee="Sarah Chen", due="Apr 15, 2024", priority="High", status="Active", category="Reporting"),
    dict(id="OBL-002", contract_id="CTR-2024-001", title="Renew data processing addendum",
         assignee="David Park", due="May 1, 2024", priority="Medium", status="Active", category="Compliance"),
    dict(id="OBL-003", contract_id="CTR-2024-001", title="Conduct annual security audit",
         assignee="Mark Johnson", due="Jun 1, 2024", priority="High", status="Under Review", category="Security"),
    dict(id="OBL-004", contract_id="CTR-2024-001", title="Deliver quarterly business review deck",
         assignee="Lisa Torres", due="Jul 1, 2024", priority="Low", status="Active", category="Reporting"),
    dict(id="OBL-005", contract_id="CTR-2024-001", title="Confirm liability insurance renewal",
         assignee="Sarah Chen", due="Aug 15, 2024", priority="Medium", status="Active", category="Insurance"),
]


def seed_if_empty(db: Session):
    if db.query(Contract).count() == 0:
        db.bulk_insert_mappings(Contract, CONTRACTS_SEED)
        db.commit()
    if db.query(Obligation).count() == 0:
        db.bulk_insert_mappings(Obligation, OBLIGATIONS_SEED)
        db.commit()
