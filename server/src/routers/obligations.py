from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.obligation import Obligation
from src.entities.contract import Contract
from src.entities.user import User

router = APIRouter()

ASSIGNEE_COLORS = ["blue", "purple", "green", "orange", "red"]


def _format_obligation(o: Obligation, db: Session):
    contract = db.query(Contract).filter(Contract.id == o.contract_id).first() if o.contract_id else None
    user = db.query(User).filter(User.id == o.assigned_to).first() if o.assigned_to else None

    assignee = None
    if user:
        initials = f"{(user.first_name or '')[:1]}{(user.last_name or '')[:1]}".upper()
        color = ASSIGNEE_COLORS[user.id % len(ASSIGNEE_COLORS)]
        assignee = {"name": f"{user.first_name} {user.last_name}", "initials": initials, "color": color}

    return {
        "id": f"OBL-{o.id:03d}",
        "title": o.title,
        "contract": contract.title if contract else "",
        "assignee": assignee,
        "due_date": o.due_date.strftime("%b %d, %Y") if o.due_date else None,
        "priority": o.priority,
        "status": o.status,
        "tag": o.obligation_type,
    }


@router.get("/obligations")
def list_obligations(search: str | None = None, status: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Obligation)
    if status:
        query = query.filter(Obligation.status == status)
    results = [_format_obligation(o, db) for o in query.all()]
    if search:
        s = search.lower()
        results = [r for r in results if s in r["title"].lower() or s in (r["contract"] or "").lower() or s in r["id"].lower()]
    return results


@router.get("/obligations/summary")
def status_summary(db: Session = Depends(get_db)):
    order = ["Pending", "In Progress", "Under Review", "Completed", "Overdue"]
    counts = {status: 0 for status in order}
    for o in db.query(Obligation).all():
        if o.status in counts:
            counts[o.status] += 1
    return [{"status": s, "count": counts[s]} for s in order]


@router.get("/obligations/{obligation_id}")
def get_obligation(obligation_id: int, db: Session = Depends(get_db)):
    o = db.query(Obligation).filter(Obligation.id == obligation_id).first()
    if not o:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return _format_obligation(o, db)


@router.post("/obligations")
def create_obligation(payload: dict, db: Session = Depends(get_db)):
    o = Obligation(
        contract_id=payload.get("contract_id"),
        title=payload.get("title"),
        description=payload.get("description"),
        obligation_type=payload.get("tag"),
        assigned_to=payload.get("assigned_to"),
        due_date=payload.get("due_date"),
        priority=payload.get("priority"),
        status=payload.get("status"),
    )
    db.add(o)
    db.commit()
    db.refresh(o)
    return _format_obligation(o, db)


@router.patch("/obligations/{obligation_id}")
def update_obligation(obligation_id: int, payload: dict, db: Session = Depends(get_db)):
    o = db.query(Obligation).filter(Obligation.id == obligation_id).first()
    if not o:
        raise HTTPException(status_code=404, detail="Obligation not found")
    for key, value in payload.items():
        if hasattr(o, key) and value is not None:
            setattr(o, key, value)
    db.commit()
    db.refresh(o)
    return _format_obligation(o, db)


@router.delete("/obligations/{obligation_id}")
def delete_obligation(obligation_id: int, db: Session = Depends(get_db)):
    o = db.query(Obligation).filter(Obligation.id == obligation_id).first()
    if not o:
        raise HTTPException(status_code=404, detail="Obligation not found")
    db.delete(o)
    db.commit()
    return {"deleted": obligation_id}
