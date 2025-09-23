import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, CreditCard, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Payment {
  id: string;
  number: string;
  payee: string;
  amount: number;
  date: string;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setTimeout(() => {
        setPayments([
          {
            id: '1',
            number: 'PAY-2024-001',
            payee: 'احمد رضایی',
            amount: 15000000,
            date: '۱۴۰۳/۰۶/۱۵',
            method: 'کارت به کارت',
            status: 'completed',
            description: 'پرداخت فاکتور شماره ۱۲۳',
            reference: 'REF-123456'
          },
          {
            id: '2',
            number: 'PAY-2024-002',
            payee: 'شرکت مواد اولیه پارس',
            amount: 8500000,
            date: '۱۴۰۳/۰۶/۱۴',
            method: 'حواله بانکی',
            status: 'pending',
            description: 'پرداخت خرید مواد اولیه',
            reference: 'REF-123457'
          },
          {
            id: '3',
            number: 'PAY-2024-003',
            payee: 'تامین‌کننده تجهیزات',
            amount: 25000000,
            date: '۱۴۰۳/۰۶/۱۰',
            method: 'چک',
            status: 'failed',
            description: 'پرداخت تجهیزات فنی',
            reference: 'REF-123458'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment =>
    payment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'pending': return 'در انتظار';
      case 'failed': return 'ناموفق';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Calendar className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-muted h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت پرداخت‌ها</h1>
          <p className="text-muted-foreground">ثبت و پیگیری پرداخت‌ها</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          پرداخت جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در پرداخت‌ها..." 
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          فیلتر
        </Button>
      </div>

      {filteredPayments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'هیچ پرداختی یافت نشد' : 'هیچ پرداختی وجود ندارد'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک پرداخت جدید ثبت کنید'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{payment.number}</CardTitle>
                    <p className="text-sm text-muted-foreground">{payment.payee}</p>
                  </div>
                  <Badge className={getStatusColor(payment.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{payment.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">تاریخ:</span>
                    <span>{payment.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">روش پرداخت:</span>
                    <span>{payment.method}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">مبلغ:</span>
                    <span className="font-semibold">{formatAmount(payment.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">مرجع:</span>
                    <span className="font-mono text-xs">{payment.reference}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 ml-1" />
                    مشاهده
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 ml-1" />
                    ویرایش
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


