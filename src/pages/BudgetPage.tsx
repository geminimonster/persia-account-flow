import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Target, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TableSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton-layouts";

interface Budget {
  id: string;
  name: string;
  category: string;
  plannedAmount: number;
  actualAmount: number;
  period: string;
  status: 'on-track' | 'over-budget' | 'under-budget';
  progress: number;
  variance: number;
}

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBudgets = async () => {
      setTimeout(() => {
        setBudgets([
          {
            id: '1',
            name: 'بودجه بازاریابی',
            category: 'بازاریابی',
            plannedAmount: 50000000,
            actualAmount: 35000000,
            period: '۱۴۰۳',
            status: 'under-budget',
            progress: 70,
            variance: -15000000
          },
          {
            id: '2',
            name: 'بودجه عملیاتی',
            category: 'عملیات',
            plannedAmount: 200000000,
            actualAmount: 180000000,
            period: '۱۴۰۳',
            status: 'on-track',
            progress: 90,
            variance: -20000000
          },
          {
            id: '3',
            name: 'بودجه تحقیق و توسعه',
            category: 'R&D',
            plannedAmount: 80000000,
            actualAmount: 95000000,
            period: '۱۴۰۳',
            status: 'over-budget',
            progress: 119,
            variance: 15000000
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchBudgets();
  }, []);

  const filteredBudgets = budgets.filter(budget =>
    budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'در مسیر';
      case 'over-budget': return 'فراتر از بودجه';
      case 'under-budget': return 'زیر بودجه';
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
          <h1 className="text-2xl font-bold text-foreground">مدیریت بودجه</h1>
          <p className="text-muted-foreground">برنامه‌ریزی و نظارت بر بودجه</p>
        </div>
        <Button className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          بودجه جدید
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="جستجو در بودجه‌ها..." 
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

      {filteredBudgets.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'هیچ بودجه‌ای یافت نشد' : 'هیچ بودجه‌ای وجود ندارد'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'لطفاً عبارت جستجو را تغییر دهید' : 'برای شروع، یک بودجه جدید ایجاد کنید'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBudgets.map((budget) => (
            <Card key={budget.id} className="hover:shadow-medium transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{budget.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{budget.category}</p>
                  </div>
                  <Badge className={getStatusColor(budget.status)}>
                    {getStatusText(budget.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">بودجه برنامه‌ریزی شده:</span>
                    <span className="font-semibold">{formatAmount(budget.plannedAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">مبلغ واقعی:</span>
                    <span className="font-semibold">{formatAmount(budget.actualAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">انحراف:</span>
                    <span className={`font-semibold ${
                      budget.variance >= 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {budget.variance >= 0 ? '+' : ''}{formatAmount(budget.variance)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">پیشرفت:</span>
                    <span className="font-semibold">{budget.progress}%</span>
                  </div>
                  <Progress value={Math.min(budget.progress, 100)} className="h-2" />
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


