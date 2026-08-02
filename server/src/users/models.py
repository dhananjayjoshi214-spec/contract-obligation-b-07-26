from sqlalchemy import Column, Integer, String
from src.database.core import Base


class UserRole(Base):

    __tablename__ = "user_roles"

    id = Column(
        Integer,
        primary_key=True
    )

    username = Column(
        String
    )

    role = Column(
        String
    )

    access = Column(
        String
    )