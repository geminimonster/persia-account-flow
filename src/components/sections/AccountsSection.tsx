import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountCardSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";
import { api, Account } from "../../services/api";

export default function AccountsSection() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await api.getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getAccountTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      'asset': 'دارایی',
      'liability': 'بدهی',
      'income': 'درآمد',
      'expense': 'هزینه',
      'equity': 'حقوق صاحبان سهام'
    };
    return typeLabels[type] || type;
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">فیلتر</Button>
      </div>

      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12">
          <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'هیچ حسابی یافت نشد' : 'هیچ حسابی وجود ندارد'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک حساب جدید ایجاد کنید'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account) => (
            <div key={account.id} className="card-financial p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{getAccountTypeLabel(account.type)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">شناسه:</span>
                  <span className="font-mono text-sm text-foreground">#{account.id}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">تاریخ ایجاد:</span>
                  <span className="text-sm text-foreground">
                    {new Date(account.created_at).toLocaleDateString('fa-IR')}
                  </span>
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
      )}
    </div>
  );
}