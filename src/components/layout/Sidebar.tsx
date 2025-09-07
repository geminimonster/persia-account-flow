import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Settings,
  Building2,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'accounts', label: 'حساب‌ها', icon: Wallet },
  { id: 'transactions', label: 'تراکنش‌ها', icon: Receipt },
  { id: 'customers', label: 'مشتریان', icon: Users },
  { id: 'suppliers', label: 'تامین‌کنندگان', icon: Building2 },
  { id: 'reports', label: 'گزارشات', icon: BarChart3 },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="sidebar-nav w-64 h-screen p-6 bg-card">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">سیستم حسابداری</h1>
            <p className="text-sm text-muted-foreground">مدیریت مالی هوشمند</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="card-financial p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">نسخه ۱.۰.۰</p>
          <p className="text-xs text-muted-foreground">© ۱۴۰۳ تمامی حقوق محفوظ است</p>
        </div>
      </div>
    </div>
  );
}