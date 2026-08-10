from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import relationship

from src.database.core import Base


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(BigInteger, primary_key=True, index=True)
    contract_no = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    status = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    owner_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    created_by = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    owner = relationship("User", foreign_keys=[owner_id])
    creator = relationship("User", foreign_keys=[created_by])
