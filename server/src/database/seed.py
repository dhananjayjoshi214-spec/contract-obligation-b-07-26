from sqlalchemy.orm import Session


def seed_if_empty(db: Session) -> None:
    """Retained for backwards compatibility; production data is never seeded by the application."""
    return None
