import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, Receipt } from "lucide-react";

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
  const stats = [
    {
      title: "کل درآمد",
      value: "۲۵۰,۰۰۰,۰۰۰ ریال",
      change: "+۱۲.۵%",
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-primary" />
    },
    {
      title: "کل هزینه‌ها",
      value: "۱۸۰,۰۰۰,۰۰۰ ریال",
      change: "-۵.۲%",
      changeType: 'positive' as const,
      icon: <CreditCard className="w-6 h-6 text-primary" />
    },
    {
      title: "تعداد مشتریان",
      value: "۱,۲۳۴",
      change: "+۸.۳%",
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: "تراکنش‌های امروز",
      value: "۸۷",
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