import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Search,
  Menu
} from "lucide-react";
import { useTheme } from "next-themes";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="h-16 bg-card border-b border-border shadow-[var(--shadow-soft)] px-6 flex items-center justify-between">
      {/* Right side - Logo and Menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">ح</span>
          </div>
          <span className="font-bold text-foreground">سیستم حسابداری</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full h-9 bg-muted border border-border rounded-lg pr-10 pl-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Left side - Time, User, Tools */}
      <div className="flex items-center gap-4">
        {/* Clock */}
        <div className="text-left hidden md:block">
          <div className="text-sm font-semibold text-foreground">{formatTime(currentTime)}</div>
          <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              3
            </span>
          </Button>

          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-foreground">احمد محمدی</div>
            <div className="text-xs text-muted-foreground">مدیر مالی</div>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}