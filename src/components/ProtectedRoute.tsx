import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import UserAgreement from './UserAgreement';
import FirstTimeSetup from './FirstTimeSetup';

interface ProtectedRouteProps {
  children: ReactNode;
}

type AppState = 'loading' | 'login' | 'agreement' | 'setup' | 'main';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    if (isLoading) {
      setAppState('loading');
      return;
    }

    if (!isAuthenticated) {
      setAppState('login');
      return;
    }

    // Check if user has accepted the agreement
    const agreementAccepted = localStorage.getItem('userAgreementAccepted') === 'true';
    if (!agreementAccepted) {
      setAppState('agreement');
      return;
    }

    // Check if setup is completed
    const setupCompleted = localStorage.getItem('setupCompleted') === 'true';
    if (!setupCompleted) {
      setAppState('setup');
      return;
    }

    // All checks passed, show main app
    setAppState('main');
  }, [isAuthenticated, isLoading]);

  // Add a state to force re-render when localStorage changes
  const [localStorageTrigger, setLocalStorageTrigger] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageTrigger(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    // Re-check the flow when localStorage might have changed
    const agreementAccepted = localStorage.getItem('userAgreementAccepted') === 'true';
    const setupCompleted = localStorage.getItem('setupCompleted') === 'true';

    if (!agreementAccepted) {
      setAppState('agreement');
    } else if (!setupCompleted) {
      setAppState('setup');
    } else {
      setAppState('main');
    }
  }, [localStorageTrigger, isAuthenticated, isLoading]);

  const handleAgreementAccept = () => {
    // Force a re-render to check updated localStorage
    setLocalStorageTrigger(prev => prev + 1);
    setAppState('setup');
  };

  const handleSetupComplete = () => {
    // Force a re-render to check updated localStorage
    setLocalStorageTrigger(prev => prev + 1);
    setAppState('main');
  };

  // Debug function to reset the flow (for testing)
  const resetFlow = () => {
    localStorage.removeItem('userAgreementAccepted');
    localStorage.removeItem('setupCompleted');
    setLocalStorageTrigger(prev => prev + 1);
  };

  if (appState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
          {/* Debug button - remove in production */}
          <button
            onClick={resetFlow}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Reset Flow (Debug)
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'login') {
    return <LoginPage />;
  }

  if (appState === 'agreement') {
    return <UserAgreement onAccept={handleAgreementAccept} />;
  }

  if (appState === 'setup') {
    return <FirstTimeSetup onComplete={handleSetupComplete} />;
  }

  if (appState === 'main') {
    return <>{children}</>;
  }

  return null;
}


