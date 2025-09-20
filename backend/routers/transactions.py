from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select, desc

from ..database import get_db
from ..models import Transaction, Account
from ..schemas import TransactionCreate, TransactionOut, TransactionUpdate


router = APIRouter()


@router.get("/", response_model=list[TransactionOut])
def list_transactions(
    account_id: int | None = None,
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    stmt = select(Transaction)
    if account_id is not None:
        stmt = stmt.where(Transaction.account_id == account_id)
    stmt = stmt.order_by(desc(Transaction.date), desc(Transaction.id)).limit(limit)
    return db.scalars(stmt).all()


@router.post("/", response_model=TransactionOut)
def create_transaction(payload: TransactionCreate, db: Session = Depends(get_db)):
    account = db.get(Account, payload.account_id)
    if not account:
        raise HTTPException(status_code=400, detail="Account does not exist")
    tx = Transaction(
        account_id=payload.account_id,
        date=payload.date or datetime.utcnow(),
        description=payload.description,
        amount=payload.amount,
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx


@router.get("/{transaction_id}", response_model=TransactionOut)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    tx = db.get(Transaction, transaction_id)
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return tx


@router.patch("/{transaction_id}", response_model=TransactionOut)
def update_transaction(transaction_id: int, payload: TransactionUpdate, db: Session = Depends(get_db)):
    tx = db.get(Transaction, transaction_id)
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if payload.date is not None:
        tx.date = payload.date
    if payload.description is not None:
        tx.description = payload.description
    if payload.amount is not None:
        tx.amount = payload.amount
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx


@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    tx = db.get(Transaction, transaction_id)
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(tx)
    db.commit()
    return None



