from fastapi import APIRouter, HTTPException
from app.models import Obligation, ObligationCreate, ObligationUpdate
from app.data import OBLIGATIONS

router = APIRouter(prefix="/api/obligations", tags=["obligations"])


def _next_id() -> str:
    nums = [int(o.id.split("-")[1]) for o in OBLIGATIONS]
    return f"OBL-{(max(nums) + 1):03d}"


@router.get("", response_model=list[Obligation])
def list_obligations(search: str | None = None, status: str | None = None):
    results = OBLIGATIONS
    if search:
        s = search.lower()
        results = [
            o for o in results
            if s in o.title.lower() or s in o.contract.lower() or s in o.id.lower()
        ]
    if status:
        results = [o for o in results if o.status == status]
    return results


@router.get("/summary")
def status_summary():
    """Counts per status, matching the colored dot counters in the toolbar
    (Pending, In Progress, Under Review, Completed, Overdue)."""
    order = ["Pending", "In Progress", "Under Review", "Completed", "Overdue"]
    counts = {status: 0 for status in order}
    for o in OBLIGATIONS:
        counts[o.status] = counts.get(o.status, 0) + 1
    return [{"status": s, "count": counts[s]} for s in order]


@router.get("/{obligation_id}", response_model=Obligation)
def get_obligation(obligation_id: str):
    for o in OBLIGATIONS:
        if o.id == obligation_id:
            return o
    raise HTTPException(status_code=404, detail="Obligation not found")


@router.post("", response_model=Obligation)
def create_obligation(payload: ObligationCreate):
    new_ob = Obligation(id=_next_id(), **payload.dict())
    OBLIGATIONS.append(new_ob)
    return new_ob


@router.patch("/{obligation_id}", response_model=Obligation)
def update_obligation(obligation_id: str, payload: ObligationUpdate):
    for idx, o in enumerate(OBLIGATIONS):
        if o.id == obligation_id:
            updated = o.copy(update={k: v for k, v in payload.dict().items() if v is not None})
            OBLIGATIONS[idx] = updated
            return updated
    raise HTTPException(status_code=404, detail="Obligation not found")


@router.delete("/{obligation_id}")
def delete_obligation(obligation_id: str):
    for idx, o in enumerate(OBLIGATIONS):
        if o.id == obligation_id:
            OBLIGATIONS.pop(idx)
            return {"deleted": obligation_id}
    raise HTTPException(status_code=404, detail="Obligation not found")
