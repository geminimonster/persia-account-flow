# Accounting Backend (FastAPI)

## Quickstart

1. Create and activate venv (Windows PowerShell):
```
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install -r backend/requirements.txt
```

2. Run dev server:
```
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

3. Seed demo data (optional):
```
python -m backend.seed
```

4. Open docs: http://localhost:8000/docs

## CORS / Frontend integration
- Default allowed origins: http://localhost:5173
- Update `backend/config.py` `Settings.cors_origins` for production.

## Endpoints
- GET /api/health
- GET/POST /api/accounts
- GET/PATCH/DELETE /api/accounts/{id}
- GET/POST /api/transactions
- GET/PATCH/DELETE /api/transactions/{id}
- GET /api/stats/summary
- GET /api/stats/recent
- GET /api/stats/chart?days=30



