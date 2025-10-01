import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Download } from "lucide-react";
import { api, ChartPoint } from "@/services/api";

export default function FinancialAnalyticsPage() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const fetchChartData = async () => {
    try {
      const data = await api.getChartData(parseInt(timeRange));
      setChartData(data);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
      // Mock data for now
      setChartData([
        { date: "2024-01-01", value: 100000 },
        { date: "2024-01-02", value: 150000 },
        { date: "2024-01-03", value: 120000 },
        { date: "2024-01-04", value: 180000 },
        { date: "2024-01-05", value: 140000 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (value: number) => {
    return (value / 1000000).toFixed(1) + 'M';
  };

  const formatPersianAmount = (value: number) => {
    return new Intl.NumberFormat('fa-IR').format(value) + ' ریال';
  };

  const transformedData = chartData.map((point, index) => ({
    date: new Date(point.date).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }),
    income: point.value >= 0 ? point.value : 0,
    expense: point.value < 0 ? Math.abs(point.value) : 0,
    balance: point.value
  }));

  const pieData = [
    { name: 'درآمد', value: transformedData.reduce((sum, d) => sum + d.income, 0), color: '#10b981' },
    { name: 'هزینه', value: transformedData.reduce((sum, d) => sum + d.expense, 0), color: '#ef4444' }
  ];

  const totalIncome = transformedData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = transformedData.reduce((sum, d) => sum + d.expense, 0);
  const netIncome = totalIncome - totalExpense;

  if (loading) {
    return <div className="p-6">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تحلیل مالی</h1>
          <p className="text-muted-foreground">نمودارها و تحلیل‌های پیشرفته مالی</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">۷ روز</SelectItem>
              <SelectItem value="30">۳۰ روز</SelectItem>
              <SelectItem value="90">۹۰ روز</SelectItem>
              <SelectItem value="365">۱ سال</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">خطی</SelectItem>
              <SelectItem value="bar">میله‌ای</SelectItem>
              <SelectItem value="pie">دایره‌ای</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            گزارش
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجموع درآمد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatPersianAmount(totalIncome)}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <TrendingUp className="w-4 h-4" />
              +۱۲.۵%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجموع هزینه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatPersianAmount(totalExpense)}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <TrendingDown className="w-4 h-4" />
              -۸.۲%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">سود خالص</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatPersianAmount(netIncome)}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              {netIncome >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {netIncome >= 0 ? '+' : ''}{(netIncome / totalIncome * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نمودار روند مالی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' && (
                  <LineChart data={transformedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={formatAmount} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: number) => [formatPersianAmount(value)]}
                    />
                    <Line type="monotone" dataKey="income" stroke="hsl(var(--success))" strokeWidth={3} />
                    <Line type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" strokeWidth={3} />
                  </LineChart>
                )}
                {chartType === 'bar' && (
                  <BarChart data={transformedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={formatAmount} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value: number) => [formatPersianAmount(value)]}
                    />
                    <Bar dataKey="income" fill="hsl(var(--success))" />
                    <Bar dataKey="expense" fill="hsl(var(--destructive))" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزیع درآمد و هزینه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [formatPersianAmount(value)]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-8 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
