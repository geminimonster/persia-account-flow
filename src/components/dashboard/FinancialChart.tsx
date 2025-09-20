import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import { api, ChartPoint } from "../../services/api";

export default function FinancialChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await api.getChartData(30);
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const formatAmount = (value: number) => {
    return (value / 1000000).toFixed(0) + 'M';
  };

  const formatPersianAmount = (value: number) => {
    return new Intl.NumberFormat('fa-IR').format(value) + ' ریال';
  };

  if (loading) {
    return (
      <div className="card-financial p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">نمودار درآمد و هزینه</h2>
          <p className="text-muted-foreground">مقایسه درآمد و هزینه‌های ماهانه</p>
        </div>
        <div className="h-80 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  // Transform API data to chart format
  const transformedData = chartData.map((point, index) => ({
    date: new Date(point.date).toLocaleDateString('fa-IR', { month: 'short' }),
    income: point.value >= 0 ? point.value : 0,
    expense: point.value < 0 ? Math.abs(point.value) : 0,
  }));

  return (
    <div className="card-financial p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">نمودار درآمد و هزینه</h2>
        <p className="text-muted-foreground">مقایسه درآمد و هزینه‌های ماهانه</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatAmount}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              formatter={(value: number, name: string) => [
                formatPersianAmount(value),
                name === 'income' ? 'درآمد' : 'هزینه'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-muted-foreground">درآمد</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span className="text-sm text-muted-foreground">هزینه</span>
        </div>
      </div>
    </div>
  );
}