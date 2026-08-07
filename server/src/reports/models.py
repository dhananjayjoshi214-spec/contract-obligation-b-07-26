from sqlalchemy import Column, Integer, String, Date, TIMESTAMP
from src.database.core import Base


class RecentReport(Base):

    __tablename__ = "recent_reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    type = Column(
        String,
        nullable=False
    )

    generated_by = Column(
        String,
        nullable=False
    )

    generated_date = Column(
        Date,
        nullable=False
    )

    format = Column(
        String,
        nullable=False
    )


class ReportRole(Base):

    __tablename__ = "report_roles"

    id = Column(Integer, primary_key=True)

    role = Column(String)

    access = Column(String)

