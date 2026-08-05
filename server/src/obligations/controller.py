from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.obligations import service
from src.obligations.models import ObligationResponse, ObligationCreate, ObligationUpdate

router = APIRouter(prefix="/api/obligations", tags=["obligations"])


@router.get("", response_model=list[ObligationResponse])
def list_obligations(
    contract_id: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return service.get_obligations(db, contract_id=contract_id)


@router.get("/{obligation_id}", response_model=ObligationResponse)
def get_obligation(obligation_id: str, db: Session = Depends(get_db)):
    return service.get_obligation(db, obligation_id)


@router.post("", response_model=ObligationResponse, status_code=201)
def create_obligation(payload: ObligationCreate, db: Session = Depends(get_db)):
    return service.create_obligation(db, payload)


@router.patch("/{obligation_id}", response_model=ObligationResponse)
def update_obligation(obligation_id: str, payload: ObligationUpdate, db: Session = Depends(get_db)):
    return service.update_obligation(db, obligation_id, payload)


@router.delete("/{obligation_id}", status_code=204)
def delete_obligation(obligation_id: str, db: Session = Depends(get_db)):
    service.delete_obligation(db, obligation_id)
