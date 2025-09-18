import { useState } from "react";
import { ArrowLeft, Factory, Cog, Package, Truck, LineChart, Wrench, Gauge, Calendar, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IndustrialAccountingPageProps {
  onBack: () => void;
}

const industrialModules = [
  {
    id: "production-costing",
    title: "محاسبه بهای تمام شده تولید",
    description: "محاسبه دقیق هزینه‌های تولید محصولات",
    icon: Calculator,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "inventory-management",
    title: "مدیریت موجودی",
    description: "کنترل و ردیابی موجودی مواد اولیه و محصولات",
    icon: Package,
    color: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: "production-planning",
    title: "برنامه‌ریزی تولید",
    description: "برنامه‌ریزی و زمان‌بندی فرآیندهای تولید",
    icon: Calendar,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    id: "quality-control",
    title: "کنترل کیفیت",
    description: "مدیریت فرآیندهای کنترل کیفیت",
    icon: Gauge,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    id: "equipment-management",
    title: "مدیریت تجهیزات",
    description: "نگهداری و مدیریت ماشین‌آلات صنعتی",
    icon: Cog,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500"
  },
  {
    id: "maintenance-tracking",
    title: "ردیابی تعمیرات",
    description: "مدیریت تعمیرات پیشگیرانه و اصلاحی",
    icon: Wrench,
    color: "bg-red-500/10",
    iconColor: "text-red-500"
  },
  {
    id: "supply-chain",
    title: "مدیریت زنجیره تامین",
    description: "مدیریت کامل زنجیره تامین و توزیع",
    icon: Truck,
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    id: "performance-analysis",
    title: "تحلیل عملکرد",
    description: "تحلیل کارایی و بهره‌وری تولید",
    icon: LineChart,
    color: "bg-cyan-500/10",
    iconColor: "text-cyan-500"
  }
];

export default function IndustrialAccountingPage({ onBack }: IndustrialAccountingPageProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (selectedModule) {
    const module = industrialModules.find(m => m.id === selectedModule);
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedModule(null)}>
            <ArrowLeft className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{module?.title}</h1>
            <p className="text-muted-foreground">{module?.description}</p>
          </div>
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
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 ml-2" />
          بازگشت به منوی اصلی
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Factory className="w-8 h-8 text-primary" />
            حسابداری صنعتی
          </h1>
          <p className="text-muted-foreground">سیستم حسابداری ویژه واحدهای صنعتی و تولیدی</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industrialModules.map((module) => {
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