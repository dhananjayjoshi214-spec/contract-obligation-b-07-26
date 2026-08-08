from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from src.database.core import Base


class Contract(Base):
    __tablename__ = "contracts"

    # Primary key & Identifiers
    id = Column(Integer, primary_key=True, index=True)
    contract_no = Column(String, nullable=True) # e.g. CTR-2024-001

    # Main details
    title = Column(String, nullable=True)
    name = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    type = Column(String, nullable=True) # Vendor, Employment, Lease...
    category = Column(String, nullable=True)
    party = Column(String, nullable=True) # Counterparty
    status = Column(String, nullable=True) # Active, Expiring Soon, Under Review, Draft, Terminated

    # Dates
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    effective = Column(String, nullable=True) # ISO date string
    expiry = Column(String, nullable=True)

    # Ownership & Values
    owner = Column(String, nullable=True)
    owner_id = Column(Integer, nullable=True)
    value = Column(String, nullable=True) # kept as display string e.g. "$2,400,000"

    # Legal & Terms
    governing_law = Column(String, default="State of Delaware, USA")
    jurisdiction = Column(String, default="US Federal Court")
    auto_renewal = Column(String, default="Yes - 60 days notice")

    # Audit & Tracking
    created_by = Column(Integer, nullable=True)
    created_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, nullable=True)

    # Convenience helper to retrieve contract title/name seamlessly
    @property
    def display_title(self):
        return self.title or self.name or ""
