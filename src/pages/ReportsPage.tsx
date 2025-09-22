import { useState, useEffect } from "react";
import { Download, Filter, Calendar, FileText, BarChart3, PieChart, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: 'financial' | 'operational' | 'analytical';
  lastGenerated: string;
  status: 'ready' | 'generating' | 'error';
}

const reportCategories = [
  {
    id: 'financial',
    title: 'گزارشات مالی',
    description: 'ترازنامه، سود و زیان، جریان نقدی',
    icon: DollarSign,
    color: 'bg-green-500/10',
    iconColor: 'text-green-500'
  },
  {
    id: 'operational',
    title: 'گزارشات عملیاتی',
    description: 'فروش، خرید، موجودی، مشتریان',
    icon: BarChart3,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-500'
  },
  {
    id: 'analytical',
    title: 'گزارشات تحلیلی',
    description: 'تحلیل عملکرد، پیش‌بینی، روندها',
    icon: TrendingUp,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-500'
  }
];

const sampleData = {
  sales: [
    { month: 'فروردین', amount: 45000000, orders: 120 },
    { month: 'اردیبهشت', amount: 52000000, orders: 145 },
    { month: 'خرداد', amount: 48000000, orders: 135 },
    { month: 'تیر', amount: 61000000, orders: 165 },
    { month: 'مرداد', amount: 55000000, orders: 155 },
    { month: 'شهریور', amount: 67000000, orders: 180 }
  ],
  expenses: [
    { category: 'مواد اولیه', amount: 25000000, percentage: 35 },
    { category: 'حقوق و دستمزد', amount: 18000000, percentage: 25 },
    { category: 'اجاره و خدمات', amount: 12000000, percentage: 17 },
    { category: 'تجهیزات', amount: 10000000, percentage: 14 },
    { category: 'سایر', amount: 5000000, percentage: 9 }
  ]
};

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const fetchReports = async () => {
      setTimeout(() => {
        setReports([
          {
            id: '1',
            title: 'گزارش فروش ماهانه',
            description: 'تحلیل فروش و درآمد ماهانه',
            type: 'financial',
            lastGenerated: '۱۴۰۳/۰۶/۱۵',
            status: 'ready'
          },
          {
            id: '2',
            title: 'گزارش موجودی کالا',
            description: 'وضعیت موجودی و انبار',
            type: 'operational',
            lastGenerated: '۱۴۰۳/۰۶/۱۴',
            status: 'ready'
          },
          {
            id: '3',
            title: 'تحلیل سودآوری',
            description: 'تحلیل سود و زیان و عملکرد',
            type: 'analytical',
            lastGenerated: '۱۴۰۳/۰۶/۱۳',
            status: 'generating'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchReports();
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
          <h1 className="text-2xl font-bold text-foreground">گزارشات مالی</h1>
          <p className="text-muted-foreground">تولید و مشاهده گزارشات مختلف</p>
        </div>
        <div className="flex gap-2">
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
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            فیلتر
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            دانلود
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="financial">مالی</TabsTrigger>
          <TabsTrigger value="operational">عملیاتی</TabsTrigger>
          <TabsTrigger value="analytical">تحلیلی</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 ml-2" />
                    مشاهده گزارشات
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>روند فروش</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData.sales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatChartAmount} />
                      <Tooltip formatter={(value) => [formatAmount(Number(value)), 'مبلغ']} />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزیع هزینه‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sampleData.expenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {sampleData.expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatAmount(Number(value)), 'مبلغ']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.filter(r => r.type === 'financial').map((report) => (
              <Card key={report.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'ready' ? 'bg-green-100 text-green-800' :
                      report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status === 'ready' ? 'آماده' :
                       report.status === 'generating' ? 'در حال تولید' : 'خطا'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>آخرین تولید: {report.lastGenerated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.filter(r => r.type === 'operational').map((report) => (
              <Card key={report.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'ready' ? 'bg-green-100 text-green-800' :
                      report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status === 'ready' ? 'آماده' :
                       report.status === 'generating' ? 'در حال تولید' : 'خطا'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>آخرین تولید: {report.lastGenerated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.filter(r => r.type === 'analytical').map((report) => (
              <Card key={report.id} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'ready' ? 'bg-green-100 text-green-800' :
                      report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status === 'ready' ? 'آماده' :
                       report.status === 'generating' ? 'در حال تولید' : 'خطا'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>آخرین تولید: {report.lastGenerated}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      مشاهده
                    </Button>
                    <Button size="sm" className="flex-1">
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

