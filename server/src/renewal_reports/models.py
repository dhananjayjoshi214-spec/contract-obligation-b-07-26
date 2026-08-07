from sqlalchemy import Column, Integer, String, Date, DateTime, Float
from datetime import datetime

from src.database.core import Base


class RenewalReport(Base):

    __tablename__ = "renewal_report"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    contract = Column(
        String,
        nullable=False
    )

    vendor = Column(
        String,
        nullable=False
    )

    renewal_date = Column(
        Date,
        nullable=False
    )

    reminder = Column(
        String,
        nullable=False
    )

    priority = Column(
        String,
        nullable=False
    )
    renewal_type = Column(
        String,
        nullable=False)
    
    status = Column(
        String,
        nullable=False
    )

    department = Column(
        String,
        nullable=False
    )

    renewal_value = Column(
        Float,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
