from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from src.database.core import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    user_name = Column(String)

    module = Column(String)

    action = Column(String)

    previous_value = Column(Text)

    updated_value = Column(Text)

    ip_address = Column(String)

    created_at = Column(TIMESTAMP)