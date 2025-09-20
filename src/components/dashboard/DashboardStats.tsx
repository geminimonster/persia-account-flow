import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, Receipt } from "lucide-react";
import { useState, useEffect } from "react";
import { api, DashboardSummary } from "../../services/api";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="card-financial p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          changeType === 'positive' ? 'text-success' : 'text-destructive'
        }`}>
          {changeType === 'positive' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );
}

export default function DashboardStats() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await api.getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card-financial p-6 animate-pulse">
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "کل موجودی",
      value: summary ? formatAmount(summary.total_balance) : "۰ ریال",
      change: "+۱۲.۵%",
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-primary" />
    },
    {
      title: "تعداد حساب‌ها",
      value: summary ? summary.accounts_count.toString() : "۰",
      change: "+۸.۳%",
      changeType: 'positive' as const,
      icon: <CreditCard className="w-6 h-6 text-primary" />
    },
    {
      title: "تعداد تراکنش‌ها",
      value: summary ? summary.transactions_count.toString() : "۰",
      change: "+۸.۳%",
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: "تراکنش‌های اخیر",
      value: "۱۰",
      change: "-۲.۱%",
      changeType: 'negative' as const,
      icon: <Receipt className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}