import { useState, useEffect } from "react";
import { Plus, Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export default function TransactionsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeaderSkeleton />
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="animate-pulse bg-muted h-10 rounded-md"></div>
            </div>
          </div>
          <div className="animate-pulse bg-muted w-20 h-10 rounded-md"></div>
        </div>
        <div className="bg-card border border-border rounded-lg">
          <TableSkeleton rows={10} />
        </div>
      </div>
    );
  }
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '۱۴۰۳/۰۶/۱۵',
      description: 'فروش محصولات به شرکت ABC',
      category: 'فروش',
      account: 'حساب جاری بانک ملی',
      type: 'income',
      amount: 15000000,
      status: 'completed'
    },
    {
      id: '2',
      date: '۱۴۰۳/۰۶/۱۴',
      description: 'خرید مواد اولیه',
      category: 'خرید',
      account: 'حساب جاری بانک ملی',
      type: 'expense',
      amount: 8500000,
      status: 'completed'
    },
    {
      id: '3',
      date: '۱۴۰۳/۰۶/۱۳',
      description: 'دریافت وجه از مشتری',
      category: 'دریافتی',
      account: 'صندوق فروشگاه',
      type: 'income',
      amount: 3200000,
      status: 'pending'
    },
    {
      id: '4',
      date: '۱۴۰۳/۰۶/۱۲',
      description: 'پرداخت حقوق کارکنان',
      category: 'حقوق',
      account: 'حساب جاری بانک ملی',
      type: 'expense',
      amount: 12000000,
      status: 'completed'
    },
    {
      id: '5',
      date: '۱۴۰۳/۰۶/۱۱',
      description: 'فروش خدمات مشاوره',
      category: 'خدمات',
      account: 'حساب پس‌انداز',
      type: 'income',
      amount: 2800000,
      status: 'completed'
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'pending': return 'در انتظار';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تراکنش‌ها</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت تراکنش‌های مالی</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          تراکنش جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در تراکنش‌ها..." 
            className="pr-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          فیلتر
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          تاریخ
        </Button>
      </div>

      <div className="card-financial">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-4 font-semibold text-foreground">تاریخ</th>
                <th className="text-right p-4 font-semibold text-foreground">شرح</th>
                <th className="text-right p-4 font-semibold text-foreground">دسته‌بندی</th>
                <th className="text-right p-4 font-semibold text-foreground">حساب</th>
                <th className="text-right p-4 font-semibold text-foreground">مبلغ</th>
                <th className="text-right p-4 font-semibold text-foreground">وضعیت</th>
                <th className="text-right p-4 font-semibold text-foreground">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-muted-foreground">{transaction.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{transaction.category}</td>
                  <td className="p-4 text-muted-foreground">{transaction.account}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'amount-positive' : 'amount-negative'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">ویرایش</Button>
                      <Button size="sm" variant="outline">حذف</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}