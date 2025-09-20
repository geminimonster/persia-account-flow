from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select, func

from ..database import get_db
from ..models import Transaction, Account
from ..schemas import DashboardSummary, ChartPoint, TransactionOut


router = APIRouter()


@router.get("/summary", response_model=DashboardSummary)
def summary(db: Session = Depends(get_db)):
    total_balance = db.scalar(select(func.coalesce(func.sum(Transaction.amount), 0))) or 0
    accounts_count = db.scalar(select(func.count(Account.id))) or 0
    transactions_count = db.scalar(select(func.count(Transaction.id))) or 0
    return DashboardSummary(
        total_balance=float(total_balance),
        accounts_count=int(accounts_count),
        transactions_count=int(transactions_count),
    )


@router.get("/recent", response_model=list[TransactionOut])
def recent(db: Session = Depends(get_db)):
    stmt = select(Transaction).order_by(Transaction.date.desc(), Transaction.id.desc()).limit(10)
    return db.scalars(stmt).all()


@router.get("/chart", response_model=list[ChartPoint])
def chart(db: Session = Depends(get_db), days: int = 30):
    start_date = datetime.utcnow() - timedelta(days=days)
    rows = db.execute(
        select(
            func.strftime('%Y-%m-%d', Transaction.date),
            func.coalesce(func.sum(Transaction.amount), 0)
        ).where(Transaction.date >= start_date)
         .group_by(func.strftime('%Y-%m-%d', Transaction.date))
         .order_by(func.strftime('%Y-%m-%d', Transaction.date))
    ).all()
    return [ChartPoint(date=r[0], value=float(r[1])) for r in rows]



