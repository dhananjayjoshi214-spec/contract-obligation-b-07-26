from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.database.core import Base


class Obligation(Base):
    __tablename__ = "obligations"

    id = Column(Integer, primary_key=True, index=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    obligation_type = Column(String, nullable=True)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    due_date = Column(DateTime, nullable=True)
    completed_date = Column(DateTime, nullable=True)
    priority = Column(String, nullable=True)
    status = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=True)

    contract = relationship("Contract", backref="obligations")
    assignee = relationship("User", backref="obligations")
