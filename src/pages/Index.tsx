import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import StatusBar from "@/components/layout/StatusBar";
import TileGrid from "@/components/layout/TileGrid";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/Dashboard";
import AccountsSection from "@/components/sections/AccountsSection";
import TransactionsSection from "@/components/sections/TransactionsSection";
import AccountingVouchersPage from "@/pages/AccountingVouchersPage";
import AccountingDocumentsPage from "@/pages/AccountingDocumentsPage";
import FinancialPage from "@/pages/FinancialPage";
import AutomationPage from "@/pages/AutomationPage";
import IndustrialAccountingPage from "@/pages/IndustrialAccountingPage";
import BusinessAccountingPage from "@/pages/BusinessAccountingPage";
import FirstTimeSetup from "@/components/FirstTimeSetup";
import SystemSettings from "@/components/SystemSettings";
import SupportPage from "@/components/SupportPage";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

interface IndexProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

const Index = ({ language, onLanguageChange }: IndexProps) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    const setupCompleted = localStorage.getItem('setupCompleted');
    setIsSetupComplete(setupCompleted === 'true');
  }, []);

  const handleSetupComplete = () => {
    setIsSetupComplete(true);
  };

  if (!isSetupComplete) {
    return <FirstTimeSetup onComplete={handleSetupComplete} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "accounts":
        return <AccountsSection />;
      case "transactions":
        return <TransactionsSection />;
      case "vouchers":
        return <AccountingVouchersPage onBack={() => setActiveSection("dashboard")} />;
      case "financial":
        return <FinancialPage onBack={() => setActiveSection("dashboard")} />;
      case "automation":
        return <AutomationPage onBack={() => setActiveSection("dashboard")} />;
      case "production":
        return <IndustrialAccountingPage onBack={() => setActiveSection("dashboard")} />;
      case "business-accounting":
        return <BusinessAccountingPage onBack={() => setActiveSection("dashboard")} />;
      case "support":
        return <SupportPage />;
      case "customers":
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">مدیریت مشتریان</h2>
            <p className="text-muted-foreground">این بخش در حال توسعه است...</p>
          </div>
        );
      case "suppliers":
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">مدیریت تامین‌کنندگان</h2>
            <p className="text-muted-foreground">این بخش در حال توسعه است...</p>
          </div>
        );
      case "reports":
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">گزارشات مالی</h2>
            <p className="text-muted-foreground">این بخش در حال توسعه است...</p>
          </div>
        );
      case "settings":
        return <SystemSettings />;
      case "accounting-general":
        return <AccountingDocumentsPage onBack={() => setActiveSection("dashboard")} />;
      default:
        return <Dashboard />;
    }
  };

  // Show tile grid for main menu, content for specific sections
  const showTileGrid = activeSection === "dashboard" || 
                      activeSection === "customers" || 
                      activeSection === "suppliers" || 
                      activeSection === "reports" || 
                      activeSection === "settings" ||
                      activeSection === "invoices" ||
                      activeSection === "budget" ||
                      activeSection === "payments" ||
                      activeSection === "analytics" ||
                      activeSection === "archive" ||
                      activeSection === "import-export" ||
                      activeSection === "personnel" ||
                      activeSection === "salary" ||
                      activeSection === "contract-accounting" ||
                      activeSection === "government-accounting" ||
                      activeSection === "user-settings" ||
                      activeSection === "user-permissions";

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <Sidebar
            side="left"
            dir={language === 'en' ? 'ltr' : 'rtl'}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex-1">
                <StatusBar language={language} onLanguageChange={onLanguageChange} />
              </div>
              <SidebarTrigger className="-ml-1" />
            </header>
            
            {showTileGrid ? (
              <TileGrid 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            ) : (
              <main className="p-8 animate-fade-in">
                <div className="flex gap-2 mb-4">
                  <Button onClick={() => setActiveSection("dashboard")} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    برگشت
                  </Button>
                  <Button onClick={() => setActiveSection("dashboard")}>
                    <Home className="w-4 h-4 mr-2" />
                    داشبورد
                  </Button>
                </div>
                {renderContent()}
              </main>
            )}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;