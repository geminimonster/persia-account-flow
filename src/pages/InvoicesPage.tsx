import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Download, FileText, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Invoice {
  id: string;
  number: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  description: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      setTimeout(() => {
        setInvoices([
          {
            id: '1',
            number: 'INV-2024-001',
            customer: 'احمد رضایی',
            date: '۱۴۰۳/۰۶/۱۵',
            dueDate: '۱۴۰۳/۰۷/۱۵',
            amount: 15000000,
            status: 'sent',
            description: 'فروش محصولات نرم‌افزاری'
          },
          {
            id: '2',
            number: 'INV-2024-002',
            customer: 'فاطمه احمدی',
            date: '۱۴۰۳/۰۶/۱۴',
            dueDate: '۱۴۰۳/۰۷/۱۴',
            amount: 8500000,
            status: 'paid',
            description: 'خدمات مشاوره'
          },
          {
            id: '3',
            number: 'INV-2024-003',
            customer: 'محمد کریمی',
            date: '۱۴۰۳/۰۶/۱۰',
            dueDate: '۱۴۰۳/۰۷/۱۰',
            amount: 25000000,
            status: 'overdue',
            description: 'تجهیزات سخت‌افزاری'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'پیش‌نویس';
      case 'sent': return 'ارسال شده';
      case 'paid': return 'پرداخت شده';
      case 'overdue': return 'سررسید گذشته';
      default: return status;
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
        <div className="bg-card border border-border rounded-lg">
          <TableSkeleton rows={10} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت فاکتورها</h1>
          <p className="text-muted-foreground">ایجاد، ویرایش و مدیریت فاکتورها</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          فاکتور جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در فاکتورها..." 
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? 'هیچ فاکتوری یافت نشد' : 'هیچ فاکتوری وجود ندارد'}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک فاکتور جدید ایجاد کنید'}
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{invoice.number}</CardTitle>
                    <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {getStatusText(invoice.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">تاریخ:</span>
                    <span>{invoice.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">سررسید:</span>
                    <span>{invoice.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">مبلغ:</span>
                    <span className="font-semibold">{formatAmount(invoice.amount)}</span>
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
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}


