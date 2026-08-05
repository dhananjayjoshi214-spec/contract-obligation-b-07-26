from sqlalchemy import Column, Integer, String
from src.database.core import Base


class DashboardMetric(Base):
    __tablename__ = "dashboard_metrics"

    id = Column(Integer, primary_key=True, index=True)
    overall_compliance = Column(Integer)
    missed_deadlines = Column(Integer)
    risk_flags = Column(Integer)
    audits_completed = Column(String)


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    department = Column(String)
    score = Column(Integer)


class RiskTrend(Base):
    __tablename__ = "risk_trend"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String)
    low = Column(Integer)
    medium = Column(Integer)
    high = Column(Integer)

class Audit(Base):
    __tablename__ = "audits"

    id = Column(Integer, primary_key=True, index=True)
    audit = Column(String)
    department = Column(String)
    auditor = Column(String)
    status = Column(String)
    score = Column(Integer)


class Risk(Base):
    __tablename__ = "risks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    level = Column(String)
    count = Column(Integer)