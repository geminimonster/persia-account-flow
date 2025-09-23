import { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, Trash2, Archive, FileText, Calendar, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface ArchiveItem {
  id: string;
  name: string;
  type: 'document' | 'report' | 'backup' | 'export';
  size: string;
  date: string;
  category: string;
  description: string;
  status: 'active' | 'archived' | 'deleted';
}

export default function ArchivePage() {
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchArchiveItems = async () => {
      setTimeout(() => {
        setArchiveItems([
          {
            id: '1',
            name: 'گزارش مالی سال ۱۴۰۲',
            type: 'report',
            size: '2.5 MB',
            date: '۱۴۰۳/۰۶/۱۵',
            category: 'گزارشات مالی',
            description: 'گزارش کامل مالی سال ۱۴۰۲ شامل ترازنامه و سود و زیان',
            status: 'archived'
          },
          {
            id: '2',
            name: 'پشتیبان پایگاه داده - خرداد ۱۴۰۳',
            type: 'backup',
            size: '150 MB',
            date: '۱۴۰۳/۰۶/۱۰',
            category: 'پشتیبان‌گیری',
            description: 'پشتیبان کامل پایگاه داده در تاریخ ۱۰ خرداد ۱۴۰۳',
            status: 'active'
          },
          {
            id: '3',
            name: 'فاکتورهای پرداخت شده - اردیبهشت ۱۴۰۳',
            type: 'document',
            size: '5.2 MB',
            date: '۱۴۰۳/۰۵/۳۰',
            category: 'اسناد',
            description: 'آرشیو فاکتورهای پرداخت شده در اردیبهشت ۱۴۰۳',
            status: 'archived'
          },
          {
            id: '4',
            name: 'صادرات داده مشتریان',
            type: 'export',
            size: '1.8 MB',
            date: '۱۴۰۳/۰۵/۲۵',
            category: 'صادرات',
            description: 'فایل صادرات اطلاعات مشتریان در فرمت Excel',
            status: 'active'
          },
          {
            id: '5',
            name: 'گزارش تحلیل فروش - فصل بهار ۱۴۰۳',
            type: 'report',
            size: '3.1 MB',
            date: '۱۴۰۳/۰۵/۲۰',
            category: 'گزارشات تحلیلی',
            description: 'گزارش تحلیل فروش فصل بهار ۱۴۰۳',
            status: 'archived'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchArchiveItems();
  }, []);

  const categories = [
    { id: 'all', name: 'همه' },
    { id: 'گزارشات مالی', name: 'گزارشات مالی' },
    { id: 'پشتیبان‌گیری', name: 'پشتیبان‌گیری' },
    { id: 'اسناد', name: 'اسناد' },
    { id: 'صادرات', name: 'صادرات' },
    { id: 'گزارشات تحلیلی', name: 'گزارشات تحلیلی' }
  ];

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'report': return <FileText className="w-4 h-4" />;
      case 'backup': return <Archive className="w-4 h-4" />;
      case 'export': return <Download className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'report': return 'bg-green-100 text-green-800';
      case 'backup': return 'bg-purple-100 text-purple-800';
      case 'export': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'document': return 'سند';
      case 'report': return 'گزارش';
      case 'backup': return 'پشتیبان';
      case 'export': return 'صادرات';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-yellow-100 text-yellow-800';
      case 'deleted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'فعال';
      case 'archived': return 'آرشیو شده';
      case 'deleted': return 'حذف شده';
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
          <h1 className="text-2xl font-bold text-foreground">آرشیو اسناد</h1>
          <p className="text-muted-foreground">مدیریت و دسترسی به اسناد آرشیو شده</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            دانلود همه
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در آرشیو..." 
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-3 py-2 border border-border rounded-md bg-background"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          فیلتر
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="reports">گزارشات</TabsTrigger>
          <TabsTrigger value="documents">اسناد</TabsTrigger>
          <TabsTrigger value="backups">پشتیبان‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Archive className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm ? 'هیچ آیتمی یافت نشد' : 'آرشیو خالی است'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'هنوز هیچ سندی در آرشیو وجود ندارد'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <Badge className={getTypeColor(item.type)}>
                        {getTypeText(item.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">اندازه:</span>
                        <span className="font-semibold">{item.size}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">تاریخ:</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">وضعیت:</span>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 ml-1" />
                        مشاهده
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 ml-1" />
                        دانلود
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
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.filter(item => item.type === 'report').map((item) => (
              <Card key={item.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      گزارش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">اندازه:</span>
                    <span className="font-semibold">{item.size}</span>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.filter(item => item.type === 'document').map((item) => (
              <Card key={item.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      سند
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">اندازه:</span>
                    <span className="font-semibold">{item.size}</span>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.filter(item => item.type === 'backup').map((item) => (
              <Card key={item.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Archive className="w-4 h-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      پشتیبان
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">اندازه:</span>
                    <span className="font-semibold">{item.size}</span>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


