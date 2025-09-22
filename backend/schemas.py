from datetime import datetime
from pydantic import BaseModel, Field


class AccountBase(BaseModel):
    name: str
    type: str = Field(description="asset, liability, income, expense, equity")


class AccountCreate(AccountBase):
    pass


class AccountUpdate(BaseModel):
    name: str | None = None
    type: str | None = None


class AccountOut(AccountBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TransactionBase(BaseModel):
    account_id: int
    date: datetime | None = None
    description: str | None = None
    amount: float


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    date: datetime | None = None
    description: str | None = None
    amount: float | None = None


class TransactionOut(TransactionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class DashboardSummary(BaseModel):
    total_balance: float
    accounts_count: int
    transactions_count: int


class ChartPoint(BaseModel):
    date: str
    value: float



