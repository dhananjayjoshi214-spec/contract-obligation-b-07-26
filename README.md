# Obligation Tracker — feature branch

Restructured to match the team's existing repo conventions (Create React App
under `client/`, feature-folder pattern under `src/features/<feature>/`).

## Structure

```
client/                                  Create React App frontend
├── package.json                         react-scripts, dev proxy -> localhost:8000
├── public/
│   └── index.html
└── src/
    ├── index.js                          ReactDOM root render
    ├── App.js                            top-level app shell
    ├── assets/
    │   └── global.css                    all styling (colors, badges, layout)
    └── features/
        └── obligation-tracker/
            ├── ObligationTracker.js       page component (data fetching + view state)
            ├── hooks/
            │   └── obligationsApi.js      fetch helpers for the obligations API
            └── components/
                ├── Header.js              title, search, notifications, profile
                ├── Toolbar.js             search, Kanban/List toggle, status counters
                ├── ListView.js            table view
                ├── KanbanView.js          5-column board
                ├── Badges.js              Priority + Status pill components
                └── Avatar.js              colored initials avatar

server/                                   FastAPI backend
├── requirements.txt
├── main.py                                app entrypoint + CORS
└── app/
    ├── models.py                          Pydantic models
    ├── data.py                            seed data (10 sample obligations)
    └── routers/
        └── obligations.py                 GET/POST/PATCH/DELETE + /summary
```

## Running locally

**Backend**
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend**
```bash
cd client
npm install
npm start
```
Runs at `http://localhost:3000`. The `"proxy"` field in `client/package.json`
forwards `/api/*` calls to the FastAPI backend on port 8000 automatically
(standard Create React App dev proxy — no extra config needed).

## Notes on the restructuring

- Converted from a standalone Vite app to Create React App conventions to
  match the rest of the repo (`.js` component files, `public/index.html`,
  `src/index.js` entry point, `package.json` proxy field instead of a Vite
  config).
- Page-specific code now lives under `src/features/obligation-tracker/`,
  mirroring the existing `features/authentication/` pattern (its own
  `components/` and `hooks/` subfolders).
- `hooks/obligationsApi.js` holds the fetch calls, following the same idea as
  `useSignup.js` / `useVerifyPassword.js` in the authentication feature —
  data-fetching logic kept separate from the page component itself.
- Global styles moved to `src/assets/global.css` to match the existing
  `assets/global.css` convention shown in the repo.
