import uuid
from sqlalchemy.orm import Session
from .models import Renewal, RenewalBase

class RenewalService:
    @staticmethod
    def get_all_renewals(db: Session):
        return db.query(Renewal).all()

    @staticmethod
    def create_renewal(db: Session, renewal_data: RenewalBase):
        # Generate a unique ID like "RNW-A1B2C3D4"
        new_id = f"RNW-{str(uuid.uuid4())[:8].upper()}"
        
        # Save to SQLite
        db_renewal = Renewal(**renewal_data.model_dump(), id=new_id)
        db.add(db_renewal)
        db.commit()
        db.refresh(db_renewal)
        return db_renewal