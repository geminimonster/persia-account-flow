import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalAmount: number;
  lastOrderDate: string;
  registrationDate: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulate API call
      setTimeout(() => {
        setCustomers([
          {
            id: '1',
            name: 'احمد رضایی',
            email: 'ahmad@example.com',
            phone: '09123456789',
            address: 'تهران، خیابان ولیعصر',
            company: 'شرکت فناوری پارس',
            status: 'active',
            totalOrders: 15,
            totalAmount: 25000000,
            lastOrderDate: '۱۴۰۳/۰۶/۱۵',
            registrationDate: '۱۴۰۲/۰۱/۱۰'
          },
          {
            id: '2',
            name: 'فاطمه احمدی',
            email: 'fatemeh@example.com',
            phone: '09187654321',
            address: 'اصفهان، خیابان چهارباغ',
            company: 'موسسه فرهنگی هنری',
            status: 'active',
            totalOrders: 8,
            totalAmount: 12000000,
            lastOrderDate: '۱۴۰۳/۰۶/۱۰',
            registrationDate: '۱۴۰۲/۰۳/۱۵'
          },
          {
            id: '3',
            name: 'محمد کریمی',
            email: 'mohammad@example.com',
            phone: '09111111111',
            address: 'شیراز، خیابان زندیه',
            company: 'کارخانه تولیدی کریم',
            status: 'inactive',
            totalOrders: 3,
            totalAmount: 5000000,
            lastOrderDate: '۱۴۰۳/۰۵/۲۰',
            registrationDate: '۱۴۰۱/۱۲/۰۱'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
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
          <h1 className="text-2xl font-bold text-foreground">مدیریت مشتریان</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت اطلاعات مشتریان</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          مشتری جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در مشتریان..." 
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

      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'هیچ مشتری یافت نشد' : 'هیچ مشتری وجود ندارد'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک مشتری جدید اضافه کنید'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{customer.company}</p>
                    </div>
                  </div>
                  <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                    {customer.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{customer.address}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">تعداد سفارش</p>
                    <p className="font-semibold">{customer.totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">مجموع خرید</p>
                    <p className="font-semibold">{formatAmount(customer.totalAmount)}</p>
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


