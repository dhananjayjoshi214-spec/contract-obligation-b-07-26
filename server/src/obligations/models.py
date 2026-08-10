from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class ObligationCreate(BaseModel):
    contract_id: int
    title: str = Field(min_length=1, max_length=500)
    description: Optional[str] = None
    obligation_type: Optional[str] = Field(default=None, max_length=100)
    assigned_to: Optional[int] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None


class ObligationUpdate(BaseModel):
    contract_id: Optional[int] = None
    title: Optional[str] = Field(default=None, min_length=1, max_length=500)
    description: Optional[str] = None
    obligation_type: Optional[str] = Field(default=None, max_length=100)
    assigned_to: Optional[int] = None
    due_date: Optional[date] = None
    completed_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None


class AssigneeResponse(BaseModel):
    id: int
    name: str
    initials: str
    color_index: int


class ObligationResponse(BaseModel):
    id: int
    reference: str
    title: str
    contract: str
    assignee: Optional[AssigneeResponse] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class StatusSummary(BaseModel):
    status: str
    count: int

    
