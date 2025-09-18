import { useState } from "react";
import { ArrowLeft, Landmark, TrendingUp, PieChart, BarChart3, Calculator, FileSpreadsheet, Receipt, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedBackButton } from "@/components/ui/animated-back-button";

interface FinancialPageProps {
  onBack: () => void;
}

const financialModules = [
  {
    id: "cash-flow",
    title: "مدیریت جریان نقدی",
    description: "کنترل و نظارت بر جریان نقدی",
    icon: TrendingUp,
    color: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: "budget-planning",
    title: "برنامه‌ریزی بودجه",
    description: "تدوین و کنترل بودجه سالانه",
    icon: PieChart,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "financial-analysis",
    title: "تحلیل مالی",
    description: "تحلیل نسبت‌های مالی و عملکرد",
    icon: BarChart3,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    id: "cost-accounting",
    title: "حسابداری بهای تمام شده",
    description: "محاسبه دقیق هزینه‌های تولید",
    icon: Calculator,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    id: "financial-reporting",
    title: "گزارشات مالی",
    description: "تهیه صورت‌های مالی استاندارد",
    icon: FileSpreadsheet,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500"
  },
  {
    id: "tax-management",
    title: "مدیریت مالیات",
    description: "محاسبه و پرداخت مالیات‌ها",
    icon: Receipt,
    color: "bg-red-500/10",
    iconColor: "text-red-500"
  },
  {
    id: "investment-tracking",
    title: "ردیابی سرمایه‌گذاری",
    description: "مدیریت سرمایه‌گذاری‌ها و بازده",
    icon: TrendingUp,
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    id: "banking-operations",
    title: "عملیات بانکی",
    description: "مدیریت حساب‌های بانکی",
    icon: CreditCard,
    color: "bg-cyan-500/10",
    iconColor: "text-cyan-500"
  },
  {
    id: "currency-management",
    title: "مدیریت ارز",
    description: "مدیریت معاملات ارزی",
    icon: Banknote,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500"
  }
];

export default function FinancialPage({ onBack }: FinancialPageProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (selectedModule) {
    const module = financialModules.find(m => m.id === selectedModule);
    return (
      <div className="p-8">
        <AnimatedBackButton onClick={() => setSelectedModule(null)} />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">{module?.title}</h1>
          <p className="text-muted-foreground">{module?.description}</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {module?.icon && <module.icon className="w-8 h-8 text-primary" />}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">در حال توسعه</h3>
          <p className="text-muted-foreground">این ماژول در حال طراحی و پیاده‌سازی است</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <AnimatedBackButton onClick={onBack} text="بازگشت به منوی اصلی" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Landmark className="w-8 h-8 text-primary" />
          مدیریت مالی
        </h1>
        <p className="text-muted-foreground">سیستم جامع مدیریت امور مالی</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financialModules.map((module) => {
          const Icon = module.icon;
          
          return (
            <Card
              key={module.id}
              className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 hover:ring-2 hover:ring-primary/50"
              onClick={() => setSelectedModule(module.id)}
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${module.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none"></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}