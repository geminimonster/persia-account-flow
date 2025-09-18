import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'فروردین', income: 45000000, expense: 32000000 },
  { month: 'اردیبهشت', income: 52000000, expense: 38000000 },
  { month: 'خرداد', income: 48000000, expense: 35000000 },
  { month: 'تیر', income: 61000000, expense: 42000000 },
  { month: 'مرداد', income: 55000000, expense: 40000000 },
  { month: 'شهریور', income: 67000000, expense: 45000000 },
];

export default function FinancialChart() {
  const formatAmount = (value: number) => {
    return (value / 1000000).toFixed(0) + 'M';
  };

  return (
    <div className="card-financial p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">نمودار درآمد و هزینه</h2>
        <p className="text-muted-foreground">مقایسه درآمد و هزینه‌های ماهانه</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
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
                new Intl.NumberFormat('fa-IR').format(value) + ' ریال',
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