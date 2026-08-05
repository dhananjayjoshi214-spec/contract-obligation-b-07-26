

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://postgres:postgres123@localhost:5432/contract_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

"""Database engine/session setup (SQLite for local dev)."""

"""Database engine/session setup (PostgreSQL)."""
import os


from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Set DATABASE_URL in your environment, e.g.:
# postgresql://<user>:<password>@<host>:<port>/<database>
SQLALCHEMY_DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://contractiq:contractiq@localhost:5432/contractiq",
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,  # recycles dead connections instead of erroring on stale ones
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()


def get_db():

    """FastAPI dependency that yields a DB session and closes it after use."""

    db = SessionLocal()
    try:
        yield db
    finally:

        db.close()

        db.close()

