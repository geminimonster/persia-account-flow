import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductIntroPage from "./pages/ProductIntroPage";
import AccountingDocumentsPage from "./pages/AccountingDocumentsPage";
import UserAgreement from "./components/UserAgreement";
import FirstTimeSetup from "./components/FirstTimeSetup";

const queryClient = new QueryClient();

const App = () => {
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'fa');

  useEffect(() => {
    const accepted = localStorage.getItem('userAgreementAccepted') === 'true';
    const setupDone = localStorage.getItem('setupCompleted') === 'true';
    const lang = localStorage.getItem('language') || 'fa';
    setAgreementAccepted(accepted);
    setSetupCompleted(setupDone);
    setLanguage(lang);
  }, []);

  const handleAgreementAccept = () => {
    setAgreementAccepted(true);
  };

  const handleSetupComplete = () => {
    setSetupCompleted(true);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  if (!agreementAccepted) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <UserAgreement onAccept={handleAgreementAccept} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (agreementAccepted && !setupCompleted) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <FirstTimeSetup onComplete={handleSetupComplete} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <div dir={language === 'en' ? 'ltr' : 'rtl'}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/intro" element={<ProductIntroPage />} />
                <Route path="/accounting-documents" element={
                  <ProtectedRoute>
                    <AccountingDocumentsPage />
                  </ProtectedRoute>
                } />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index language={language} onLanguageChange={handleLanguageChange} />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
