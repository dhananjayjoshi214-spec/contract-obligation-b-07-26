# ContractIQ

Contract Repository & Obligation Tracking — React frontend + FastAPI backend,
matching the provided Figma screenshots (Contract Repository list view).

```
project-root/
├── Client/   React frontend
├── server/   FastAPI backend
```

## Quick start

**Backend:**
```bash
cd server
pip install -r requirements.txt
uvicorn src.main:app --reload
```
Runs on http://localhost:8000 (docs at `/docs`). Seeds the 10 contracts and 5
obligations from the screenshot into a local SQLite file on first run.

**Frontend:**
```bash
cd Client
npm install
cp .env.example .env
npm start
```
Runs on http://localhost:3000 and calls the API above.

## What's implemented

- **Contract Repository** (`Client/src/features/contracts/components/ContractRepository.js`)
  — search, type/status filters, summary cards, paginated table — matches screenshot 1:1.
- **Contract Detail** — Overview / Obligations / Versions / Documents tabs, wired to
  live contract + obligation data from the API (versions & approval workflow are
  still frontend-only placeholders since there's no backend model for them yet).
- **FastAPI backend** — Clean Architecture per module (`contracts`, `obligations`):
  `controller.py` (routes) → `service.py` (logic) → `models.py` (schemas), with
  ORM entities in `src/entities/` and SQLite via SQLAlchemy.

## Next steps you'll likely want

- Add auth (guide's folder structure reserves a `Client/src/features/authentication/`
  slot and `server/src/auth/` module for this — not wired up yet since no login
  screen was in the screenshots).
- Add pagination params to `GET /api/contracts` (currently returns full filtered list).
- Model version history / approval workflow on the backend if those need to be dynamic.
