from typing import Optional
from pydantic import BaseModel, ConfigDict


class ObligationBase(BaseModel):
    contract_id: str
    title: str
    assignee: str
    due: str
    priority: str
    status: str
    category: str


class ObligationCreate(ObligationBase):
    id: Optional[str] = None


class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    assignee: Optional[str] = None
    due: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None


class ObligationResponse(ObligationBase):
    id: str
    model_config = ConfigDict(from_attributes=True)
