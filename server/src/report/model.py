from sqlalchemy import Column, Integer, String, Boolean
from src.database.core import Base

class ExportOption(Base):

    __tablename__ = "export_options"

    id = Column(
        Integer,
        primary_key=True
    )

    report_type = Column(
        String
    )

    format = Column(
        String
    )

    label = Column(
        String
    )

    checked = Column(
        Boolean,
        default=True
    )