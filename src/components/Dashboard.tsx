import DashboardStats from "./dashboard/DashboardStats";
import RecentTransactions from "./dashboard/RecentTransactions";
import FinancialChart from "./dashboard/FinancialChart";
import { Calendar, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">داشبورد مالی</h1>
          <p className="text-muted-foreground">خلاصه وضعیت مالی و تراکنش‌های اخیر</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            انتخاب تاریخ
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            گزارش
          </Button>
          <Button className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            تراکنش جدید
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialChart />
        <RecentTransactions />
      </div>
    </div>
  );
}