from datetime import date, datetime, timedelta
from typing import Optional

from sqlalchemy import or_
from sqlalchemy.orm import Session

from src.contracts.models import ContractCreate, ContractUpdate
from src.entities.contract import Contract
from src.exceptions import NotFoundException


def get_contracts(
    db: Session,
    search: Optional[str] = None,
    category_filter: Optional[str] = None,
    status_filter: Optional[str] = None,
) -> list[Contract]:
    query = db.query(Contract)
    if search:
        term = f"%{search.strip()}%"
        query = query.filter(or_(Contract.contract_no.ilike(term), Contract.title.ilike(term), Contract.category.ilike(term)))
    if category_filter:
        query = query.filter(Contract.category == category_filter)
    if status_filter:
        query = query.filter(Contract.status == status_filter)
    return query.order_by(Contract.id.asc()).all()


def get_contract(db: Session, contract_id: int) -> Contract:
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise NotFoundException(f"Contract {contract_id} was not found")
    return contract


def get_summary(db: Session, filtered_count: int) -> dict:
    today = date.today()
    upcoming_date = today + timedelta(days=30)
    return {
        "total": db.query(Contract).count(),
        "active": db.query(Contract).filter(Contract.status == "Active").count(),
        "expiring_soon": db.query(Contract).filter(
            Contract.end_date.between(
                datetime.combine(today, datetime.min.time()),
                datetime.combine(upcoming_date, datetime.max.time()),
            )
        ).count(),
        "showing": filtered_count,
    }


def create_contract(db: Session, payload: ContractCreate) -> Contract:
    contract = Contract(**payload.model_dump())
    db.add(contract)
    db.commit()
    db.refresh(contract)
    return contract


def update_contract(db: Session, contract_id: int, payload: ContractUpdate) -> Contract:
    contract = get_contract(db, contract_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(contract, field, value)
    db.commit()
    db.refresh(contract)
    return contract


def delete_contract(db: Session, contract_id: int) -> None:
    contract = get_contract(db, contract_id)
    db.delete(contract)
    db.commit()
