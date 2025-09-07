import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      description: 'فروش محصولات',
      amount: 5000000,
      date: '۱۴۰۳/۰۶/۱۵',
      category: 'فروش'
    },
    {
      id: '2',
      type: 'expense',
      description: 'خرید مواد اولیه',
      amount: 2500000,
      date: '۱۴۰۳/۰۶/۱۴',
      category: 'خرید'
    },
    {
      id: '3',
      type: 'income',
      description: 'دریافتی از مشتری',
      amount: 3200000,
      date: '۱۴۰۳/۰۶/۱۳',
      category: 'دریافتی'
    },
    {
      id: '4',
      type: 'expense',
      description: 'پرداخت حقوق',
      amount: 8000000,
      date: '۱۴۰۳/۰۶/۱۲',
      category: 'حقوق'
    },
    {
      id: '5',
      type: 'income',
      description: 'فروش خدمات',
      amount: 1800000,
      date: '۱۴۰۳/۰۶/۱۱',
      category: 'خدمات'
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  return (
    <div className="card-financial p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">آخرین تراکنش‌ها</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          مشاهده همه
        </Button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'income' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>{transaction.date}</span>
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'amount-positive' : 'amount-negative'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}