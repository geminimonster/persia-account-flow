import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, TrendingUp, DollarSign, Receipt } from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly");
  const [dateRange, setDateRange] = useState("current-month");

  const reportTypes = [
    {
      id: "monthly",
      title: "گزارش ماهانه",
      description: "خلاصه عملکرد مالی ماه جاری",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      id: "quarterly",
      title: "گزارش سه ماهه",
      description: "تحلیل عملکرد سه ماه اخیر",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      id: "annual",
      title: "گزارش سالانه",
      description: "بررسی عملکرد سال مالی",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      id: "profit-loss",
      title: "گزارش سود و زیان",
      description: "تحلیل سودآوری و هزینه‌ها",
      icon: <Receipt className="w-6 h-6" />,
      color: "bg-orange-500"
    }
  ];

  const handleGenerateReport = (type: string) => {
    // Mock report generation
    console.log(`Generating ${type} report for ${dateRange}`);
    // In a real app, this would trigger report generation and download
  };

  const handleDownloadReport = (type: string) => {
    // Mock download
    console.log(`Downloading ${type} report`);
    // In a real app, this would download the generated report
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">گزارش‌ها</h1>
          <p className="text-muted-foreground">تولید و دانلود گزارش‌های مالی</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">ماه جاری</SelectItem>
              <SelectItem value="last-month">ماه گذشته</SelectItem>
              <SelectItem value="current-quarter">سه ماه جاری</SelectItem>
              <SelectItem value="last-quarter">سه ماه گذشته</SelectItem>
              <SelectItem value="current-year">سال جاری</SelectItem>
              <SelectItem value="last-year">سال گذشته</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center text-white mb-3`}>
                {report.icon}
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGenerateReport(report.id)}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  تولید
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadReport(report.id)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  دانلود
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>گزارش‌های اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">گزارش ماهانه دی ۱۴۰۲</p>
                  <p className="text-sm text-muted-foreground">تولید شده در ۱۵ دی ۱۴۰۲</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                دانلود
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">گزارش سود و زیان سه ماهه</p>
                  <p className="text-sm text-muted-foreground">تولید شده در ۱۰ دی ۱۴۰۲</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                دانلود
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">گزارش سالانه ۱۴۰۲</p>
                  <p className="text-sm text-muted-foreground">تولید شده در ۱ دی ۱۴۰۲</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                دانلود
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
