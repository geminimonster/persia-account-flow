import { useState } from "react";
import { 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  TreePine,
  Database,
  Settings,
  Building2,
  UserCheck,
  Wallet,
  Receipt,
  Calculator,
  Factory,
  DollarSign,
  Bot,
  Landmark,
  FileText,
  Building,
  UserCog,
  Shield,
  Archive,
  BarChart3,
  CreditCard,
  Package,
  FileSpreadsheet,
  PieChart,
  Activity,
  UserPlus,
  Briefcase,
  ShoppingCart,
  ClipboardList,
  CalendarDays,
  Target,
  TrendingUp,
  FileBarChart,
  CreditCard as CreditCardIcon,
  Import,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  side?: "left" | "right";
}

const navigationStructure = [
  {
    id: "main-data",
    label: "داده‌های اصلی",
    icon: Database,
    children: [
      {
        id: "persons",
        label: "تعریف اشخاص",
        icon: Users,
        children: [
          { id: "customers", label: "مشتریان", icon: UserCheck },
          { id: "suppliers", label: "تامین‌کنندگان", icon: Building2 },
          { id: "employees", label: "کارکنان", icon: UserPlus },
          { id: "partners", label: "شرکا", icon: Briefcase }
        ]
      },
      {
        id: "chart-accounts",
        label: "درخت حساب‌ها",
        icon: TreePine,
        children: [
          { id: "assets", label: "دارایی‌ها", icon: Package },
          { id: "liabilities", label: "بدهی‌ها", icon: Receipt },
          { id: "equity", label: "سرمایه", icon: DollarSign },
          { id: "income", label: "درآمدها", icon: TrendingUp },
          { id: "expenses", label: "هزینه‌ها", icon: ShoppingCart }
        ]
      },
      {
        id: "products",
        label: "کالا و خدمات",
        icon: Package,
        children: [
          { id: "product-categories", label: "گروه‌های کالا", icon: ClipboardList },
          { id: "product-list", label: "فهرست کالاها", icon: Package },
          { id: "service-list", label: "فهرست خدمات", icon: Activity },
          { id: "price-lists", label: "لیست قیمت‌ها", icon: PieChart }
        ]
      }
    ]
  },
  {
    id: "financial",
    label: "مالی",
    icon: Landmark,
    children: [
      { id: "vouchers", label: "اسناد حسابداری", icon: FileText },
      { id: "transactions", label: "تراکنش‌ها", icon: Receipt },
      { id: "cash-flow", label: "جریان نقدینگی", icon: DollarSign },
      { id: "budget", label: "بودجه‌بندی", icon: Calculator },
      { id: "reports", label: "گزارشات مالی", icon: FileBarChart }
    ]
  },
  {
    id: "automation",
    label: "اتوماسیون",
    icon: Bot,
    children: [
      { id: "workflows", label: "گردش کار", icon: Activity },
      { id: "auto-vouchers", label: "اسناد خودکار", icon: FileText },
      { id: "schedules", label: "زمان‌بندی", icon: CalendarDays },
      { id: "alerts", label: "هشدارها", icon: Target }
    ]
  },
  {
    id: "production",
    label: "حسابداری صنعتی",
    icon: Factory,
    children: [
      { id: "production-orders", label: "دستورات تولید", icon: ClipboardList },
      { id: "cost-centers", label: "مراکز هزینه", icon: Target },
      { id: "inventory", label: "انبارداری", icon: Package },
      { id: "quality-control", label: "کنترل کیفیت", icon: Activity }
    ]
  },
  {
    id: "business-accounting",
    label: "حسابداری تجاری",
    icon: Building,
    children: [
      { id: "sales", label: "فروش", icon: TrendingUp },
      { id: "purchases", label: "خرید", icon: ShoppingCart },
      { id: "invoicing", label: "صدور فاکتور", icon: CreditCardIcon },
      { id: "payments", label: "پرداخت‌ها", icon: CreditCard }
    ]
  },
  {
    id: "reports",
    label: "گزارشات",
    icon: BarChart3,
    children: [
      { id: "financial-reports", label: "گزارشات مالی", icon: FileBarChart },
      { id: "analytical-reports", label: "گزارشات تحلیلی", icon: PieChart },
      { id: "custom-reports", label: "گزارشات سفارشی", icon: FileSpreadsheet }
    ]
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: Settings,
    children: [
      { id: "user-settings", label: "تنظیمات کاربری", icon: UserCog },
      { id: "user-permissions", label: "مجوزهای کاربری", icon: Shield },
      { id: "system-settings", label: "تنظیمات سیستم", icon: Settings },
      { id: "import-export", label: "ورود و خروج داده", icon: Import }
    ]
  }
];

export default function Sidebar({ activeSection, onSectionChange, side = "left" }: SidebarProps) {
  const { open, toggleSidebar } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["main-data"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const renderMenuItem = (item: any, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.includes(item.id);
    const isActive = activeSection === item.id;

    if (hasChildren) {
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            onClick={() => toggleGroup(item.id)}
            className={cn(
              "w-full justify-between",
              level > 0 && "pr-6",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4" />
              {open && <span>{item.label}</span>}
            </div>
            {open && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            )}
          </SidebarMenuButton>
          {open && isExpanded && (
            <SidebarMenuSub>
              {item.children.map((child: any) => (
                <SidebarMenuSubItem key={child.id}>
                  {renderMenuItem(child, level + 1)}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          onClick={() => onSectionChange(item.id)}
          className={cn(
            level > 0 && "pr-6",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <item.icon className="w-4 h-4" />
          {open && <span>{item.label}</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarContainer className="border-l-0 border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-bold text-sidebar-foreground">سیستم حسابداری</h2>
                <p className="text-xs text-sidebar-foreground/70">مدیریت مالی هوشمند</p>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationStructure.map((group) => renderMenuItem(group))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}