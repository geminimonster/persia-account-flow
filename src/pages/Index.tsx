import { useState } from "react";
import { ThemeProvider } from "next-themes";
import StatusBar from "@/components/layout/StatusBar";
import TileGrid from "@/components/layout/TileGrid";
import Dashboard from "@/components/Dashboard";
import AccountsSection from "@/components/sections/AccountsSection";
import TransactionsSection from "@/components/sections/TransactionsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "accounts":
        return <AccountsSection />;
      case "transactions":
        return <TransactionsSection />;
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
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">تنظیمات سیستم</h2>
            <p className="text-muted-foreground">این بخش در حال توسعه است...</p>
          </div>
        );
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
                      activeSection === "archive";

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <StatusBar />
        
        {showTileGrid ? (
          <TileGrid 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        ) : (
          <main className="p-8">
            {renderContent()}
          </main>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
