from typing import Optional

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.obligations import service
from src.obligations.models import ObligationCreate, ObligationResponse, ObligationUpdate, StatusSummary

router = APIRouter(prefix="/api/obligations", tags=["obligations"])


@router.get("", response_model=list[ObligationResponse])
def list_obligations(
    search: Optional[str] = Query(None, max_length=200),
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
):
    return service.get_obligations(db, search=search, status=status_filter)


@router.get("/summary", response_model=list[StatusSummary])
def obligations_summary(db: Session = Depends(get_db)):
    return service.get_summary(db)


@router.get("/display-user")
def display_user(db: Session = Depends(get_db)):
    return service.get_display_user(db)


@router.get("/{obligation_id}", response_model=ObligationResponse)
def get_obligation(obligation_id: int, db: Session = Depends(get_db)):
    return service._serialize(service.get_obligation(db, obligation_id))


@router.post("", response_model=ObligationResponse, status_code=status.HTTP_201_CREATED)
def create_obligation(payload: ObligationCreate, db: Session = Depends(get_db)):
    return service.create_obligation(db, payload)


@router.patch("/{obligation_id}", response_model=ObligationResponse)
def update_obligation(obligation_id: int, payload: ObligationUpdate, db: Session = Depends(get_db)):
    return service.update_obligation(db, obligation_id, payload)


@router.delete("/{obligation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_obligation(obligation_id: int, db: Session = Depends(get_db)):
    service.delete_obligation(db, obligation_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)



