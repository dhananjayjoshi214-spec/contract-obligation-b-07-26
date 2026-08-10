from datetime import datetime
from typing import Optional

from sqlalchemy import func, or_
from sqlalchemy.orm import Session, joinedload

from src.entities.contract import Contract
from src.entities.obligation import Obligation
from src.entities.user import User
from src.exceptions import NotFoundException
from src.obligations.models import ObligationCreate, ObligationUpdate


def _reference(obligation_id: int) -> str:
    return f"OBL-{obligation_id:03d}"


def _serialize(obligation: Obligation) -> dict:
    assignee = None
    if obligation.assignee:
        first_name = obligation.assignee.first_name or ""
        last_name = obligation.assignee.last_name or ""
        assignee = {
            "id": obligation.assignee.id,
            "name": " ".join(part for part in (first_name, last_name) if part),
            "initials": f"{first_name[:1]}{last_name[:1]}".upper(),
            "color_index": obligation.assignee.id % 5,
        }

    return {
        "id": obligation.id,
        "reference": _reference(obligation.id),
        "title": obligation.title,
        "contract": obligation.contract.title if obligation.contract else "",
        "assignee": assignee,
        "due_date": obligation.due_date.date() if obligation.due_date else None,
        "priority": obligation.priority,
        "status": obligation.status,
        "category": obligation.obligation_type,
    }


def get_obligations(db: Session, search: Optional[str] = None, status: Optional[str] = None) -> list[dict]:
    query = db.query(Obligation).options(joinedload(Obligation.contract), joinedload(Obligation.assignee))
    if status:
        query = query.filter(Obligation.status == status)
    if search:
        term = f"%{search.strip()}%"
        query = query.join(Contract).filter(or_(Obligation.title.ilike(term), Contract.title.ilike(term)))
    return [_serialize(obligation) for obligation in query.order_by(Obligation.id.asc()).all()]


def get_obligation(db: Session, obligation_id: int) -> Obligation:
    obligation = (
        db.query(Obligation)
        .options(joinedload(Obligation.contract), joinedload(Obligation.assignee))
        .filter(Obligation.id == obligation_id)
        .first()
    )
    if not obligation:
        raise NotFoundException(f"Obligation {obligation_id} was not found")
    return obligation


def create_obligation(db: Session, payload: ObligationCreate) -> dict:
    values = payload.model_dump()
    if values["due_date"] is not None:
        values["due_date"] = datetime.combine(values["due_date"], datetime.min.time())
    obligation = Obligation(**values)
    db.add(obligation)
    db.commit()
    return _serialize(get_obligation(db, obligation.id))


def update_obligation(db: Session, obligation_id: int, payload: ObligationUpdate) -> dict:
    obligation = get_obligation(db, obligation_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        if field in {"due_date", "completed_date"} and value is not None:
            value = datetime.combine(value, datetime.min.time())
        setattr(obligation, field, value)
    db.commit()
    return _serialize(get_obligation(db, obligation.id))


def delete_obligation(db: Session, obligation_id: int) -> None:
    obligation = get_obligation(db, obligation_id)
    db.delete(obligation)
    db.commit()


def get_summary(db: Session) -> list[dict]:
    status_order = ["Pending", "In Progress", "Under Review", "Completed", "Overdue"]
    counts = dict(db.query(Obligation.status, func.count(Obligation.id)).group_by(Obligation.status).all())
    return [{"status": status, "count": counts.get(status, 0)} for status in status_order]


def get_display_user(db: Session) -> Optional[dict]:
    user = db.query(User).filter(User.is_active.is_(True)).order_by(User.id.asc()).first()
    if not user:
        return None
    return {
        "id": user.id,
        "name": " ".join(part for part in (user.first_name, user.last_name) if part),
        "role": user.role,
        "initials": f"{(user.first_name or '')[:1]}{(user.last_name or '')[:1]}".upper(),
    }
