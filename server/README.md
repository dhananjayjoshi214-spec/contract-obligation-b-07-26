# ContractIQ — Server (FastAPI)

Clean-architecture backend: each module (`contracts`, `obligations`) has its own
`controller.py` (routes), `service.py` (business logic), and `models.py` (Pydantic schemas).
ORM models live in `src/entities/`.

## Run

```bash
pip install -r requirements.txt
uvicorn src.main:app --reload
```

API docs: http://localhost:8000/docs

## Endpoints

- `GET  /api/contracts?search=&type=&status=` — list/filter contracts
- `GET  /api/contracts/summary` — dashboard counts (total/active/expiring/showing)
- `GET  /api/contracts/{id}` — contract detail
- `POST /api/contracts` / `PATCH /api/contracts/{id}` / `DELETE /api/contracts/{id}`
- `GET  /api/obligations?contract_id=` — obligations, optionally scoped to a contract
- `POST /api/obligations` / `PATCH /api/obligations/{id}` / `DELETE /api/obligations/{id}`

Data is seeded automatically into a local SQLite file (`contractiq.db`) on first run,
matching the contracts shown in the Contract Repository screenshot.

## Tests

```bash
pip install -r requirements-dev.txt
pytest
```
