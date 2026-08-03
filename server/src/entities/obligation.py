from sqlalchemy import Column, String, ForeignKey
from src.database.core import Base


class Obligation(Base):
    __tablename__ = "obligations"

    id = Column(String, primary_key=True, index=True)            # e.g. OBL-001
    contract_id = Column(String, ForeignKey("contracts.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    assignee = Column(String, nullable=False)
    due = Column(String, nullable=False)
    priority = Column(String, nullable=False)                    # High, Medium, Low
    status = Column(String, nullable=False)                      # Active, Under Review, Completed...
    category = Column(String, nullable=False)
