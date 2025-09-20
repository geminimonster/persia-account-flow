from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from ..database import get_db, engine
from ..models import Account, Transaction, Base
from ..schemas import AccountCreate, AccountOut, AccountUpdate


router = APIRouter()


@router.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@router.get("/", response_model=list[AccountOut])
def list_accounts(db: Session = Depends(get_db)):
    accounts = db.scalars(select(Account).order_by(Account.name.asc())).all()
    return accounts


@router.post("/", response_model=AccountOut)
def create_account(payload: AccountCreate, db: Session = Depends(get_db)):
    exists = db.scalar(select(Account).where(Account.name == payload.name))
    if exists:
        raise HTTPException(status_code=400, detail="Account with this name already exists")
    account = Account(name=payload.name, type=payload.type)
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


@router.get("/{account_id}", response_model=AccountOut)
def get_account(account_id: int, db: Session = Depends(get_db)):
    account = db.get(Account, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


@router.patch("/{account_id}", response_model=AccountOut)
def update_account(account_id: int, payload: AccountUpdate, db: Session = Depends(get_db)):
    account = db.get(Account, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    if payload.name is not None:
        account.name = payload.name
    if payload.type is not None:
        account.type = payload.type
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


@router.delete("/{account_id}", status_code=204)
def delete_account(account_id: int, db: Session = Depends(get_db)):
    account = db.get(Account, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    db.delete(account)
    db.commit()
    return None



