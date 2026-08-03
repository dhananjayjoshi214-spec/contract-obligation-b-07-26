from typing import Optional
from pydantic import BaseModel, ConfigDict


class ContractBase(BaseModel):
    name: str
    type: str
    party: str
    effective: str
    expiry: str
    status: str
    owner: str
    value: Optional[str] = None
    governing_law: Optional[str] = "State of Delaware, USA"
    jurisdiction: Optional[str] = "US Federal Court"
    auto_renewal: Optional[str] = "Yes — 60 days notice"


class ContractCreate(ContractBase):
    id: Optional[str] = None  # auto-generated if omitted


class ContractUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    party: Optional[str] = None
    effective: Optional[str] = None
    expiry: Optional[str] = None
    status: Optional[str] = None
    owner: Optional[str] = None
    value: Optional[str] = None
    governing_law: Optional[str] = None
    jurisdiction: Optional[str] = None
    auto_renewal: Optional[str] = None


class ContractResponse(ContractBase):
    id: str
    model_config = ConfigDict(from_attributes=True)


class ContractSummary(BaseModel):
    total: int
    active: int
    expiring_soon: int
    showing: int
