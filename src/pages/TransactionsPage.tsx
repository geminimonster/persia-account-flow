import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter } from "lucide-react";
import { api, Transaction } from "@/services/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAccount, setFilterAccount] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      // Mock data for now
      setTransactions([
        { id: 1, account_id: 1, date: "2024-01-15", description: "فروش کالا", amount: 150000, created_at: "2024-01-15T10:00:00Z" },
        { id: 2, account_id: 1, date: "2024-01-14", description: "خرید تجهیزات", amount: -75000, created_at: "2024-01-14T10:00:00Z" },
        { id: 3, account_id: 2, date: "2024-01-13", description: "دریافت حقوق", amount: 200000, created_at: "2024-01-13T10:00:00Z" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesType = filterType === "all" ||
      (filterType === "income" && transaction.amount > 0) ||
      (filterType === "expense" && transaction.amount < 0);
    const matchesAccount = filterAccount === "all" || transaction.account_id.toString() === filterAccount;

    return matchesSearch && matchesType && matchesAccount;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(Math.abs(amount)) + ' ریال';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  const getTransactionType = (amount: number) => {
    return amount >= 0 ? 'income' : 'expense';
  };

  const getTransactionTypeLabel = (amount: number) => {
    return amount >= 0 ? 'درآمد' : 'هزینه';
  };

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  if (loading) {
    return <div className="p-6">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تراکنش‌ها</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت تراکنش‌های مالی</p>
        </div>
        <Button className="gap-2">
          <Calendar className="w-4 h-4" />
          فیلتر تاریخ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل تراکنش‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجموع درآمد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatAmount(totalIncome)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجموع هزینه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatAmount(totalExpense)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>لیست تراکنش‌ها</CardTitle>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو تراکنش‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="income">درآمد</SelectItem>
                  <SelectItem value="expense">هزینه</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAccount} onValueChange={setFilterAccount}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="حساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه حساب‌ها</SelectItem>
                  <SelectItem value="1">حساب بانکی</SelectItem>
                  <SelectItem value="2">صندوق نقدی</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تاریخ</TableHead>
                <TableHead>توضیحات</TableHead>
                <TableHead>نوع</TableHead>
                <TableHead>مبلغ</TableHead>
                <TableHead>حساب</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const type = getTransactionType(transaction.amount);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.description || 'بدون توضیح'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={type === 'income' ? 'default' : 'destructive'}>
                        {getTransactionTypeLabel(transaction.amount)}
                      </Badge>
                    </TableCell>
                    <TableCell className={type === 'income' ? 'text-success' : 'text-destructive'}>
                      {type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </TableCell>
                    <TableCell>حساب {transaction.account_id}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
