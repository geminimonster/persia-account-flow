import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpDown, 
  Users, 
  Building2, 
  FileBarChart, 
  Settings,
  Calculator,
  CreditCard,
  TrendingUp,
  Receipt,
  Archive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TileGridProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const tiles = [
  {
    id: "dashboard",
    title: "داشبورد",
    description: "نمای کلی مالی",
    icon: LayoutDashboard,
    color: "bg-primary",
    iconColor: "text-primary-foreground"
  },
  {
    id: "accounts",
    title: "حساب‌ها",
    description: "مدیریت حساب‌های مالی",
    icon: Wallet,
    color: "bg-success",
    iconColor: "text-success-foreground"
  },
  {
    id: "transactions",
    title: "تراکنش‌ها",
    description: "ثبت و مدیریت تراکنش",
    icon: ArrowUpDown,
    color: "bg-warning",
    iconColor: "text-warning-foreground"
  },
  {
    id: "customers",
    title: "مشتریان",
    description: "مدیریت اطلاعات مشتریان",
    icon: Users,
    color: "bg-accent",
    iconColor: "text-accent-foreground"
  },
  {
    id: "suppliers",
    title: "تامین‌کنندگان",
    description: "مدیریت تامین‌کنندگان",
    icon: Building2,
    color: "bg-secondary",
    iconColor: "text-secondary-foreground"
  },
  {
    id: "reports",
    title: "گزارشات",
    description: "گزارش‌های مالی و تحلیلی",
    icon: FileBarChart,
    color: "bg-muted",
    iconColor: "text-muted-foreground"
  },
  {
    id: "invoices",
    title: "فاکتورها",
    description: "صدور و مدیریت فاکتور",
    icon: Receipt,
    color: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    id: "budget",
    title: "بودجه‌بندی",
    description: "برنامه‌ریزی و کنترل بودجه",
    icon: Calculator,
    color: "bg-success/10",
    iconColor: "text-success"
  },
  {
    id: "payments",
    title: "پرداخت‌ها",
    description: "مدیریت پرداخت‌ها",
    icon: CreditCard,
    color: "bg-warning/10",
    iconColor: "text-warning"
  },
  {
    id: "analytics",
    title: "تحلیل‌ها",
    description: "تحلیل‌های مالی پیشرفته",
    icon: TrendingUp,
    color: "bg-destructive/10",
    iconColor: "text-destructive"
  },
  {
    id: "archive",
    title: "آرشیو",
    description: "آرشیو اسناد و مدارک",
    icon: Archive,
    color: "bg-muted/50",
    iconColor: "text-muted-foreground"
  },
  {
    id: "settings",
    title: "تنظیمات",
    description: "تنظیمات سیستم",
    icon: Settings,
    color: "bg-card",
    iconColor: "text-card-foreground"
  }
];

export default function TileGrid({ activeSection, onSectionChange }: TileGridProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">سیستم حسابداری جامع</h1>
        <p className="text-muted-foreground">یک بخش را برای شروع انتخاب کنید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const isActive = activeSection === tile.id;
          
          return (
            <Card
              key={tile.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 ${
                isActive 
                  ? 'ring-2 ring-primary shadow-[var(--shadow-large)]' 
                  : 'hover:ring-2 hover:ring-primary/50'
              }`}
              onClick={() => onSectionChange(tile.id)}
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${tile.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${tile.iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {tile.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tile.description}
                </p>

                {isActive && (
                  <div className="absolute top-2 left-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                )}
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