import { useState, useEffect } from "react";
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
  Archive,
  Import,
  Download,
  UserCheck,
  DollarSign,
  Bot,
  Factory,
  Landmark,
  FileText,
  Building,
  UserCog,
  Shield,
  Settings2,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ActionButtons from "@/components/layout/ActionButtons";
import { TileGridSkeleton } from "@/components/ui/skeleton-layouts";
import { callbackify } from "util";

interface TileGridProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const tiles = [
  {
    id: "accounting-general",
    title: "حسابداری عمومی",
    description: "نمای کلی مالی",
    icon: Calculator,
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
    id: "import-export",
    title: "ورود و خروج داده",
    description: "وارد و صادر کردن اطلاعات",
    icon: Import,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "personnel",
    title: "پرسنل",
    description: "مدیریت اطلاعات پرسنل",
    icon: UserCheck,
    color: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: "salary",
    title: "حقوق و دستمزد",
    description: "محاسبه و پرداخت حقوق",
    icon: DollarSign,
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    id: "automation",
    title: "اتوماسیون",
    description: "خودکارسازی فرآیندها",
    icon: Bot,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    id: "production",
    title: "حسابداری صنعتی",
    description: "مدیریت فرآیند تولید و صنعت",
    icon: Factory,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    id: "business-accounting",
    title: "حسابداری تجاری",
    description: "حسابداری جامع کسب‌وکار",
    icon: Building2,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "financial",
    title: "مالی",
    description: "مدیریت امور مالی",
    icon: Landmark,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500"
  },
  {
    id: "contract-accounting",
    title: "حسابداری قراردادی",
    description: "مدیریت حسابداری قراردادها",
    icon: FileText,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500"
  },
  {
    id: "government-accounting",
    title: "حسابداری دولتی",
    description: "حسابداری مطابق استانداردهای دولتی",
    icon: Building,
    color: "bg-red-500/10",
    iconColor: "text-red-500"
  },
  {
    id: "user-settings",
    title: "تنظیمات کاربری",
    description: "تنظیمات شخصی کاربر",
    icon: UserCog,
    color: "bg-cyan-500/10",
    iconColor: "text-cyan-500"
  },
  {
    id: "user-permissions",
    title: "مجوزهای کاربری",
    description: "مدیریت دسترسی‌های کاربران",
    icon: Shield,
    color: "bg-pink-500/10",
    iconColor: "text-pink-500"
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
    title: "تنظیمات سیستم",
    description: "تنظیمات کلی سیستم",
    icon: Settings,
    color: "bg-card",
    iconColor: "text-card-foreground"
  },
  {
    id: "support",
    title: "پشتیبانی",
    description: "درخواست پشتیبانی از سایر کاربران",
    icon: PhoneCall,
    color: "bg-card",
    iconColor: "text-card-foreground"
  }
];

export default function TileGrid({ activeSection, onSectionChange }: TileGridProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeSection]);

  if (isLoading) {
    return <TileGridSkeleton />;
  }
  const handleNew = () => {
    console.log("افزودن جدید");
  };

  const handleEdit = () => {
    console.log("ویرایش");
  };

  const handleDelete = () => {
    console.log("حذف");
  };

  const handleFullView = () => {
    console.log("نمای کامل");
  };

  const handleSearch = (query: string) => {
    console.log("جستجو:", query);
  };

  const handleFilter = () => {
    console.log("فیلتر");
  };

  const handleExport = () => {
    console.log("خروجی");
  };

  const handleImport = () => {
    console.log("ورودی");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">سیستم حسابداری جامع</h1>
        <p className="text-muted-foreground">یک بخش را برای شروع انتخاب کنید</p>
      </div>

      <div className="mb-6">
        <ActionButtons
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFullView={handleFullView}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onExport={handleExport}
          onImport={handleImport}
          searchPlaceholder="جستجو در ماژول‌ها..."
        />
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