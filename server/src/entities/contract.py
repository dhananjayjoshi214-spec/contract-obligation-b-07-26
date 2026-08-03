from sqlalchemy import Column, String, Float
from src.database.core import Base


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(String, primary_key=True, index=True)          # e.g. CTR-2024-001
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)                       # Vendor, Employment, Lease...
    party = Column(String, nullable=False)                       # Counterparty
    effective = Column(String, nullable=False)                   # ISO date string
    expiry = Column(String, nullable=False)
    status = Column(String, nullable=False)                      # Active, Expiring Soon, Under Review, Draft, Terminated
    owner = Column(String, nullable=False)
    value = Column(String, nullable=True)                        # kept as display string e.g. "$2,400,000"
    governing_law = Column(String, default="State of Delaware, USA")
    jurisdiction = Column(String, default="US Federal Court")
    auto_renewal = Column(String, default="Yes — 60 days notice")
