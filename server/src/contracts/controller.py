from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.contracts import service
from src.contracts.models import ContractResponse, ContractCreate, ContractUpdate

router = APIRouter(prefix="/api/contracts", tags=["contracts"])


@router.get("", response_model=list[ContractResponse])
def list_contracts(
    search: Optional[str] = Query(None, description="Search by name, party, or ID"),
    type: Optional[str] = Query(None, alias="type"),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return service.get_contracts(db, search=search, type_filter=type, status_filter=status)


@router.get("/summary")
def contracts_summary(
    search: Optional[str] = Query(None),
    type: Optional[str] = Query(None, alias="type"),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    filtered = service.get_contracts(db, search=search, type_filter=type, status_filter=status)
    return service.get_summary(db, filtered_count=len(filtered))


@router.get("/{contract_id}", response_model=ContractResponse)
def get_contract(contract_id: str, db: Session = Depends(get_db)):
    return service.get_contract(db, contract_id)


@router.post("", response_model=ContractResponse, status_code=201)
def create_contract(payload: ContractCreate, db: Session = Depends(get_db)):
    return service.create_contract(db, payload)


@router.patch("/{contract_id}", response_model=ContractResponse)
def update_contract(contract_id: str, payload: ContractUpdate, db: Session = Depends(get_db)):
    return service.update_contract(db, contract_id, payload)


@router.delete("/{contract_id}", status_code=204)
def delete_contract(contract_id: str, db: Session = Depends(get_db)):
    service.delete_contract(db, contract_id)
