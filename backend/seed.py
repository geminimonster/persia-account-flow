from datetime import datetime, timedelta
from random import randint, random
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .models import Account, Transaction


def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        if db.query(Account).count() == 0:
            accounts = [
                Account(name="Cash", type="asset"),
                Account(name="Bank", type="asset"),
                Account(name="Revenue", type="income"),
                Account(name="Expenses", type="expense"),
            ]
            db.add_all(accounts)
            db.commit()
            for _ in range(100):
                account = accounts[randint(0, len(accounts) - 1)]
                amt = round((random() - 0.3) * 1000, 2)
                tx = Transaction(
                    account_id=account.id,
                    date=datetime.utcnow() - timedelta(days=randint(0, 60)),
                    description="Auto seed",
                    amount=amt,
                )
                db.add(tx)
            db.commit()
            print("Seeded demo data")
        else:
            print("Data already exists; skipping seed")
    finally:
        db.close()


if __name__ == "__main__":
    seed()



