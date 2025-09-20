import { useState, useEffect } from "react";
import { api, Transaction } from "../../services/api";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await api.getRecentTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch recent transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  const getTransactionType = (amount: number) => {
    return amount >= 0 ? 'income' : 'expense';
  };

  const getTransactionCategory = (type: string) => {
    switch (type) {
      case 'income': return 'درآمد';
      case 'expense': return 'هزینه';
      default: return 'سایر';
    }
  };

  if (loading) {
    return (
      <div className="card-financial p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">تراکنش‌های اخیر</h2>
          <p className="text-muted-foreground">آخرین تراکنش‌های انجام شده</p>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
              <div className="text-left">
                <div className="h-4 bg-muted rounded w-20 mb-1"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-financial p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">تراکنش‌های اخیر</h2>
        <p className="text-muted-foreground">آخرین تراکنش‌های انجام شده</p>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            هیچ تراکنشی یافت نشد
          </div>
        ) : (
          transactions.map((transaction) => {
            const type = getTransactionType(transaction.amount);
            const category = getTransactionCategory(type);
            
            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    type === 'income' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {type === 'income' ? '↑' : '↓'}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {transaction.description || 'تراکنش بدون توضیح'}
                    </p>
                    <p className="text-sm text-muted-foreground">{category}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${
                    type === 'income' ? 'text-success' : 'text-destructive'
                  }`}>
                    {type === 'income' ? '+' : ''}{formatAmount(transaction.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}