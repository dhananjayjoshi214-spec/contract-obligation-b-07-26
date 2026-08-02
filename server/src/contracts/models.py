from sqlalchemy import Column, Integer, String, Date, Float, TIMESTAMP
from src.database.core import Base


class ContractReport(Base):

    __tablename__ = "contract_report"

    id = Column(Integer, primary_key=True)

    contract_id = Column(String)

    vendor = Column(String)

    department = Column(String)

    status = Column(String)

    contract_value = Column(Float)

    expiry_date = Column(Date)

    compliance_rate = Column(Float)


    # ADD THESE COLUMNS

    priority = Column(String)

    compliance_status = Column(String)

    renewal_status = Column(String)

    assigned_user = Column(String)


    created_at = Column(TIMESTAMP)