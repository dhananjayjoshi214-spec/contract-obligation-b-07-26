from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from src.database.core import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=True)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=True)
    type = Column(String, nullable=True)
    is_read = Column(Boolean, default=False)
    sent_at = Column(DateTime, nullable=True)
