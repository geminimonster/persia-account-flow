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
import UserAgreement from "./components/UserAgreement";
import FirstTimeSetup from "./components/FirstTimeSetup";

const queryClient = new QueryClient();

const App = () => {
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [setupCompleted, setSetupCompleted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('userAgreementAccepted') === 'true';
    const setupDone = localStorage.getItem('setupCompleted') === 'true';
    setAgreementAccepted(accepted);
    setSetupCompleted(setupDone);
  }, []);

  const handleAgreementAccept = () => {
    setAgreementAccepted(true);
  };

  const handleSetupComplete = () => {
    setSetupCompleted(true);
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
