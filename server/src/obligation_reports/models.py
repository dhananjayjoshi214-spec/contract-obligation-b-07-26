from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime

from src.database.core import Base


class ObligationReport(Base):

    __tablename__ = "obligation_report"

    id = Column(Integer, primary_key=True)

    obligation_id = Column(
        String,
        unique=True,
        nullable=False
    )

    description = Column(String)

    category = Column(
        String,
        nullable=False
    )

    department = Column(String)

    assigned = Column(String)

    due_date = Column(Date)

    priority = Column(String)

    status = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )