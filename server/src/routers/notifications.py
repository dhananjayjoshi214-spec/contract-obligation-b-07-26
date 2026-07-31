from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.notification import Notification

router = APIRouter()


@router.get("/notifications")
def list_notifications(db: Session = Depends(get_db)):
    notifications = db.query(Notification).order_by(Notification.sent_at.desc()).all()
    return [
        {
            "id": n.id,
            "type": n.type,
            "title": n.title,
            "body": n.message,
            "time": n.sent_at.strftime("%b %d, %Y %H:%M") if n.sent_at else None,
            "unread": not n.is_read,
        }
        for n in notifications
    ]


@router.patch("/notifications/mark-all-read")
def mark_all_read(db: Session = Depends(get_db)):
    db.query(Notification).update({Notification.is_read: True})
    db.commit()
    return {"status": "ok"}
