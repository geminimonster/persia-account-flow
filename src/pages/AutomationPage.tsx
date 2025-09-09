import { useState } from "react";
import { ArrowLeft, Bot, Workflow, Clock, Database, Zap, Settings2, FileUp, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AutomationPageProps {
  onBack: () => void;
}

const automationModules = [
  {
    id: "workflow-automation",
    title: "خودکارسازی فرآیندها",
    description: "طراحی و اجرای فرآیندهای خودکار",
    icon: Workflow,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "scheduled-tasks",
    title: "وظایف زمان‌بندی شده",
    description: "اجرای خودکار کارها در زمان‌های مشخص",
    icon: Clock,
    color: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: "data-sync",
    title: "همگام‌سازی داده",
    description: "انتقال خودکار داده بین سیستم‌ها",
    icon: Database,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    id: "smart-calculations",
    title: "محاسبات هوشمند",
    description: "محاسبه خودکار بر اساس قوانین تعریف شده",
    icon: Zap,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500"
  },
  {
    id: "rule-engine",
    title: "موتور قوانین کسب‌وکار",
    description: "تعریف و اجرای قوانین پیچیده",
    icon: Settings2,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    id: "document-processing",
    title: "پردازش خودکار اسناد",
    description: "تشخیص و استخراج اطلاعات از اسناد",
    icon: FileUp,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500"
  },
  {
    id: "notification-system",
    title: "سیستم اطلاع‌رسانی",
    description: "ارسال خودکار هشدارها و اطلاعیه‌ها",
    icon: Bell,
    color: "bg-red-500/10",
    iconColor: "text-red-500"
  },
  {
    id: "security-automation",
    title: "اتوماسیون امنیتی",
    description: "مدیریت خودکار امنیت سیستم",
    icon: Shield,
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  }
];

export default function AutomationPage({ onBack }: AutomationPageProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (selectedModule) {
    const module = automationModules.find(m => m.id === selectedModule);
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
            <Bot className="w-8 h-8 text-primary" />
            اتوماسیون
          </h1>
          <p className="text-muted-foreground">سیستم خودکارسازی فرآیندهای کسب‌وکار</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automationModules.map((module) => {
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