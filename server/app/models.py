from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Priority(str, Enum):
    critical = "Critical"
    high = "High"
    medium = "Medium"
    low = "Low"


class Status(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    under_review = "Under Review"
    completed = "Completed"
    overdue = "Overdue"


class Assignee(BaseModel):
    name: str
    initials: str
    color: str  # tailwind-style color key used by the frontend avatar (blue, purple, green, orange, red)


class Obligation(BaseModel):
    id: str  # e.g. "OBL-001"
    title: str
    contract: str
    assignee: Assignee
    due_date: str  # kept as display string e.g. "Jun 30, 2024" to match the UI exactly
    priority: Priority
    status: Status
    tag: str


class ObligationCreate(BaseModel):
    title: str
    contract: str
    assignee: Assignee
    due_date: str
    priority: Priority
    status: Status
    tag: str


class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    contract: Optional[str] = None
    assignee: Optional[Assignee] = None
    due_date: Optional[str] = None
    priority: Optional[Priority] = None
    status: Optional[Status] = None
    tag: Optional[str] = None
