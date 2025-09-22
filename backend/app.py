from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import accounts, transactions, stats


def create_app() -> FastAPI:
    app = FastAPI(title="Accounting Backend", version="0.1.0")

    # CORS (adjust as needed)
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"]
,
        allow_headers=["*"]
,
    )

    # Routers
    app.include_router(accounts.router, prefix="/api/accounts", tags=["accounts"]) 
    app.include_router(transactions.router, prefix="/api/transactions", tags=["transactions"]) 
    app.include_router(stats.router, prefix="/api/stats", tags=["stats"]) 

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()



