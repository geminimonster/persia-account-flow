import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { api } from "@/services/api";

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "",
    balance: 0,
    currency: "ریال"
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      // Assuming API has getAccounts method
      const data = await api.getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      // Mock data for now
      setAccounts([
        { id: 1, name: "حساب بانکی اصلی", type: "بانکی", balance: 5000000, currency: "ریال" },
        { id: 2, name: "صندوق نقدی", type: "نقدی", balance: 200000, currency: "ریال" },
        { id: 3, name: "کارت اعتباری", type: "اعتباری", balance: -500000, currency: "ریال" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async () => {
    try {
      // await api.createAccount(newAccount);
      setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
      setNewAccount({ name: "", type: "", balance: 0, currency: "ریال" });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    try {
      // await api.deleteAccount(id);
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  if (loading) {
    return <div className="p-6">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت حساب‌ها</h1>
          <p className="text-muted-foreground">مدیریت و مشاهده حساب‌های مالی</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              حساب جدید
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>افزودن حساب جدید</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">نام حساب</Label>
                <Input
                  id="name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="نام حساب را وارد کنید"
                />
              </div>
              <div>
                <Label htmlFor="type">نوع حساب</Label>
                <Select value={newAccount.type} onValueChange={(value) => setNewAccount({...newAccount, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="نوع حساب را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="بانکی">بانکی</SelectItem>
                    <SelectItem value="نقدی">نقدی</SelectItem>
                    <SelectItem value="اعتباری">اعتباری</SelectItem>
                    <SelectItem value="سرمایه‌گذاری">سرمایه‌گذاری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="balance">موجودی اولیه</Label>
                <Input
                  id="balance"
                  type="number"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({...newAccount, balance: parseInt(e.target.value) || 0})}
                  placeholder="موجودی را وارد کنید"
                />
              </div>
              <Button onClick={handleAddAccount} className="w-full">
                افزودن حساب
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل حساب‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">حساب‌های بانکی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.filter(a => a.type === 'بانکی').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل موجودی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(totalBalance)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>لیست حساب‌ها</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="جستجو حساب‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام حساب</TableHead>
                <TableHead>نوع</TableHead>
                <TableHead>موجودی</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className={account.balance >= 0 ? 'text-success' : 'text-destructive'}>
                    {formatAmount(account.balance)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
