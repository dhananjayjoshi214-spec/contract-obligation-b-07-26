from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .models import RenewalResponse, RenewalBase
from .service import RenewalService
from src.database.core import get_db 

router = APIRouter(prefix="/renewals", tags=["Renewals"])

@router.get("", response_model=List[RenewalResponse])
def get_all_renewals(db: Session = Depends(get_db)):
    return RenewalService.get_all_renewals(db)

# THIS IS THE NEW ROUTE THAT CREATES THE POST BUTTON
@router.post("", response_model=RenewalResponse)
def create_renewal(renewal: RenewalBase, db: Session = Depends(get_db)):
    return RenewalService.create_renewal(db, renewal)
