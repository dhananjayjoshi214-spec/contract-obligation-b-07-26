from typing import Optional
from sqlalchemy.orm import Session

from src.entities.obligation import Obligation
from src.obligations.models import ObligationCreate, ObligationUpdate
from src.exceptions import NotFoundException


def _next_id(db: Session) -> str:
    obligations = db.query(Obligation.id).all()
    max_num = 0
    for (oid,) in obligations:
        parts = oid.split("-")
        if len(parts) >= 2 and parts[-1].isdigit():
            max_num = max(max_num, int(parts[-1]))
    return f"OBL-{max_num + 1:03d}"


def get_obligations(db: Session, contract_id: Optional[str] = None):
    query = db.query(Obligation)
    if contract_id:
        query = query.filter(Obligation.contract_id == contract_id)
    return query.order_by(Obligation.id).all()


def get_obligation(db: Session, obligation_id: str) -> Obligation:
    obligation = db.query(Obligation).filter(Obligation.id == obligation_id).first()
    if not obligation:
        raise NotFoundException(f"Obligation '{obligation_id}' not found")
    return obligation


def create_obligation(db: Session, payload: ObligationCreate) -> Obligation:
    obligation_id = payload.id or _next_id(db)
    obligation = Obligation(id=obligation_id, **payload.model_dump(exclude={"id"}))
    db.add(obligation)
    db.commit()
    db.refresh(obligation)
    return obligation


def update_obligation(db: Session, obligation_id: str, payload: ObligationUpdate) -> Obligation:
    obligation = get_obligation(db, obligation_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(obligation, field, value)
    db.commit()
    db.refresh(obligation)
    return obligation


def delete_obligation(db: Session, obligation_id: str) -> None:
    obligation = get_obligation(db, obligation_id)
    db.delete(obligation)
    db.commit()
