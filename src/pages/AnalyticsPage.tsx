import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Target, DollarSign, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const analyticsData = {
  overview: [
    { metric: 'کل درآمد', value: 250000000, change: 12.5, trend: 'up' },
    { metric: 'کل هزینه', value: 180000000, change: -5.2, trend: 'down' },
    { metric: 'سود خالص', value: 70000000, change: 25.8, trend: 'up' },
    { metric: 'تعداد مشتریان', value: 1234, change: 8.3, trend: 'up' }
  ],
  sales: [
    { month: 'فروردین', sales: 45000000, target: 50000000 },
    { month: 'اردیبهشت', sales: 52000000, target: 50000000 },
    { month: 'خرداد', sales: 48000000, target: 50000000 },
    { month: 'تیر', sales: 61000000, target: 50000000 },
    { month: 'مرداد', sales: 55000000, target: 50000000 },
    { month: 'شهریور', sales: 67000000, target: 50000000 }
  ],
  expenses: [
    { category: 'مواد اولیه', amount: 25000000, percentage: 35 },
    { category: 'حقوق و دستمزد', amount: 18000000, percentage: 25 },
    { category: 'اجاره و خدمات', amount: 12000000, percentage: 17 },
    { category: 'تجهیزات', amount: 10000000, percentage: 14 },
    { category: 'سایر', amount: 5000000, percentage: 9 }
  ],
  customers: [
    { segment: 'مشتریان جدید', count: 150, percentage: 12 },
    { segment: 'مشتریان وفادار', count: 800, percentage: 65 },
    { segment: 'مشتریان در خطر', count: 200, percentage: 16 },
    { segment: 'مشتریان از دست رفته', count: 84, percentage: 7 }
  ]
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  };

  const formatChartAmount = (value: number) => {
    return (value / 1000000).toFixed(0) + 'M';
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-muted h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-muted h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تحلیل‌ها و آمار</h1>
          <p className="text-muted-foreground">تحلیل عملکرد و آمارهای کلیدی</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">هفتگی</SelectItem>
            <SelectItem value="month">ماهانه</SelectItem>
            <SelectItem value="quarter">فصلی</SelectItem>
            <SelectItem value="year">سالانه</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.metric}
              </CardTitle>
              <div className={`p-2 rounded-lg ${
                item.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {item.trend === 'up' ? (
                  <TrendingUp className={`w-4 h-4 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                ) : (
                  <TrendingDown className={`w-4 h-4 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof item.value === 'number' && item.value > 1000000 
                  ? formatAmount(item.value) 
                  : item.value.toLocaleString('fa-IR')
                }
              </div>
              <p className={`text-xs ${
                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.trend === 'up' ? '+' : ''}{item.change}% نسبت به دوره قبل
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">فروش</TabsTrigger>
          <TabsTrigger value="expenses">هزینه‌ها</TabsTrigger>
          <TabsTrigger value="customers">مشتریان</TabsTrigger>
          <TabsTrigger value="performance">عملکرد</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>روند فروش ماهانه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={analyticsData.sales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatChartAmount} />
                      <Tooltip formatter={(value) => [formatAmount(Number(value)), 'فروش']} />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تحلیل فروش</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">میانگین فروش ماهانه</span>
                    <span className="font-semibold">{formatAmount(54500000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">بیشترین فروش</span>
                    <span className="font-semibold">{formatAmount(67000000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">کمترین فروش</span>
                    <span className="font-semibold">{formatAmount(45000000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">رشد فروش</span>
                    <span className="font-semibold text-green-600">+12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزیع هزینه‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={analyticsData.expenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {analyticsData.expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatAmount(Number(value)), 'مبلغ']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>جزئیات هزینه‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.expenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{expense.category}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{formatAmount(expense.amount)}</div>
                        <div className="text-xs text-muted-foreground">{expense.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقسیم‌بندی مشتریان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={analyticsData.customers}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analyticsData.customers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'تعداد']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آمار مشتریان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.customers.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{segment.segment}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{segment.count}</div>
                        <div className="text-xs text-muted-foreground">{segment.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>شاخص‌های کلیدی عملکرد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">نرخ رشد درآمد</span>
                    <span className="font-semibold text-green-600">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">نرخ رشد مشتریان</span>
                    <span className="font-semibold text-green-600">+8.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">نرخ حفظ مشتری</span>
                    <span className="font-semibold text-blue-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">نرخ تبدیل</span>
                    <span className="font-semibold text-purple-600">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اهداف و دستاوردها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">هدف فروش ماهانه</span>
                    <span className="font-semibold">{formatAmount(50000000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">فروش واقعی</span>
                    <span className="font-semibold text-green-600">{formatAmount(54500000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">درصد دستیابی</span>
                    <span className="font-semibold text-green-600">109%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">وضعیت</span>
                    <span className="font-semibold text-green-600">✅ محقق شده</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
