import pytest
from fastapi.testclient import TestClient

from src.main import app


@pytest.fixture(scope="module")
def client():
    """
    Using TestClient as a context manager triggers FastAPI's startup event,
    which creates the SQLite tables and seeds demo data. Without the `with`
    block, `on_startup` never fires and endpoints hit a database with no
    tables yet.
    """
    with TestClient(app) as c:
        yield c
