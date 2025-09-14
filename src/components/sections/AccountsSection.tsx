import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountCardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  change: number;
  currency: string;
}

export default function AccountsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <AccountCardSkeleton />
          </div>
          <div className="flex gap-2">
            <AccountCardSkeleton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <AccountCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  const accounts: Account[] = [
    {
      id: '1',
      name: 'حساب جاری بانک ملی',
      type: 'بانکی',
      balance: 125000000,
      change: 5.2,
      currency: 'ریال'
    },
    {
      id: '2', 
      name: 'صندوق فروشگاه',
      type: 'نقدی',
      balance: 8500000,
      change: -2.1,
      currency: 'ریال'
    },
    {
      id: '3',
      name: 'حساب پس‌انداز',
      type: 'بانکی', 
      balance: 450000000,
      change: 12.8,
      currency: 'ریال'
    },
    {
      id: '4',
      name: 'حساب ارزی',
      type: 'ارزی',
      balance: 5000,
      change: 8.5,
      currency: 'دلار'
    }
  ];

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'دلار') {
      return '$' + new Intl.NumberFormat('en-US').format(amount);
    }
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت حساب‌ها</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت حساب‌های مالی</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          حساب جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در حساب‌ها..." 
            className="pr-10"
          />
        </div>
        <Button variant="outline">فیلتر</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="card-financial p-6 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">موجودی:</span>
                <span className="font-bold text-lg text-foreground">
                  {formatAmount(account.balance, account.currency)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">تغییرات:</span>
                <div className={`flex items-center gap-1 text-sm ${
                  account.change > 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {account.change > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {account.change > 0 ? '+' : ''}{account.change}%
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="flex-1">
                جزئیات
              </Button>
              <Button size="sm" className="flex-1">
                تراکنش
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}