import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Phone, Mail, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  status: 'active' | 'inactive';
  category: string;
  totalOrders: number;
  totalAmount: number;
  lastOrderDate: string;
  registrationDate: string;
  rating: number;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      // Simulate API call
      setTimeout(() => {
        setSuppliers([
          {
            id: '1',
            name: 'شرکت مواد اولیه پارس',
            email: 'info@parsmaterials.com',
            phone: '02112345678',
            address: 'تهران، شهرک صنعتی پیکان‌شهر',
            company: 'شرکت مواد اولیه پارس',
            status: 'active',
            category: 'مواد اولیه',
            totalOrders: 25,
            totalAmount: 45000000,
            lastOrderDate: '۱۴۰۳/۰۶/۱۲',
            registrationDate: '۱۴۰۱/۰۶/۱۵',
            rating: 4.8
          },
          {
            id: '2',
            name: 'تامین‌کننده تجهیزات فنی',
            email: 'sales@techsupplier.com',
            phone: '02187654321',
            address: 'اصفهان، خیابان چهارباغ',
            company: 'شرکت تجهیزات فنی اصفهان',
            status: 'active',
            category: 'تجهیزات',
            totalOrders: 12,
            totalAmount: 32000000,
            lastOrderDate: '۱۴۰۳/۰۶/۰۸',
            registrationDate: '۱۴۰۲/۰۲/۲۰',
            rating: 4.5
          },
          {
            id: '3',
            name: 'خدمات حمل و نقل سریع',
            email: 'logistics@fastlogistics.com',
            phone: '02155555555',
            address: 'کرج، جاده مخصوص',
            company: 'شرکت حمل و نقل سریع',
            status: 'inactive',
            category: 'حمل و نقل',
            totalOrders: 8,
            totalAmount: 15000000,
            lastOrderDate: '۱۴۰۳/۰۵/۲۵',
            registrationDate: '۱۴۰۱/۱۱/۱۰',
            rating: 3.9
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
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
          <h1 className="text-2xl font-bold text-foreground">مدیریت تامین‌کنندگان</h1>
          <p className="text-muted-foreground">مشاهده و مدیریت اطلاعات تامین‌کنندگان</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          تامین‌کننده جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در تامین‌کنندگان..." 
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

      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'هیچ تامین‌کننده‌ای یافت نشد' : 'هیچ تامین‌کننده‌ای وجود ندارد'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک تامین‌کننده جدید اضافه کنید'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{supplier.category}</p>
                    </div>
                  </div>
                  <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                    {supplier.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{supplier.address}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">امتیاز:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">{getRatingStars(supplier.rating)}</span>
                    <span className="text-sm text-muted-foreground">({supplier.rating})</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">تعداد سفارش</p>
                    <p className="font-semibold">{supplier.totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">مجموع خرید</p>
                    <p className="font-semibold">{formatAmount(supplier.totalAmount)}</p>
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

