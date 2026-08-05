from sqlalchemy import Column, Integer, String
from src.database.core import Base
from pydantic import BaseModel

# ─── DATABASE MODEL (How it saves to SQLite) ───
class Renewal(Base):
    __tablename__ = "renewals"

    id = Column(String, primary_key=True, index=True)
    contractId = Column(String, index=True)
    name = Column(String)
    owner = Column(String)
    initials = Column(String)
    dept = Column(String)
    type = Column(String)
    renewalDate = Column(String)
    daysRemaining = Column(Integer)
    status = Column(String)
    assignedTo = Column(String)
    priority = Column(String)

# ─── PYDANTIC SCHEMAS (How it talks to React) ───
class RenewalBase(BaseModel):
    contractId: str
    name: str
    owner: str
    initials: str
    dept: str
    type: str
    renewalDate: str
    daysRemaining: int
    status: str
    assignedTo: str
    priority: str

class RenewalResponse(RenewalBase):
    id: str

    class Config:
        from_attributes = True