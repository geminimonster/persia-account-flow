import { useState, useEffect } from "react";
import { Plus, Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";
import { api, Transaction, Account } from "../../services/api";

export default function TransactionsSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, accountsData] = await Promise.all([
          api.getTransactions(undefined, 50),
          api.getAccounts()
        ]);
        setTransactions(transactionsData);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.toString().includes(searchTerm)
  );

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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const getAccountName = (accountId: number) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.name || `حساب #${accountId}`;
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="text-right p-4 font-semibold text-foreground">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    {searchTerm ? 'هیچ تراکنشی یافت نشد' : 'هیچ تراکنشی وجود ندارد'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => {
                  const type = getTransactionType(transaction.amount);
                  const category = getTransactionCategory(type);
                  
                  return (
                    <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-muted-foreground">{formatDate(transaction.date)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            type === 'income' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-destructive/10 text-destructive'
                          }`}>
                            {type === 'income' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownLeft className="w-4 h-4" />
                            )}
                          </div>
                          <span className="font-medium text-foreground">
                            {transaction.description || 'تراکنش بدون توضیح'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{category}</td>
                      <td className="p-4 text-muted-foreground">{getAccountName(transaction.account_id)}</td>
                      <td className="p-4">
                        <span className={`font-semibold ${
                          type === 'income' ? 'text-success' : 'text-destructive'
                        }`}>
                          {type === 'income' ? '+' : ''}{formatAmount(transaction.amount)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">ویرایش</Button>
                          <Button size="sm" variant="outline">حذف</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}