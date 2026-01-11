import { useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import { DownloadProvider } from './contexts/DownloadContext'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { useToast } from './hooks/useToast';
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import InfoPage from './pages/InfoPage';
import Toast from './components/shared/Toast';
import ConfigGuard from './components/layout/ConfigGuard';
import AuthGate from './components/auth/AuthGate';
import { supabase } from './services/supabase';

function App() {
  const isOnline = useNetworkStatus(); 
  const toast = useToast();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!isOnline) {
       toast.error("You are offline. Check connection.", { id: 'offline-toast', duration: Infinity });
       wasOffline.current = true;
    } else if (wasOffline.current) {
       toast.dismiss('offline-toast');
       toast.success("Back online!");
       wasOffline.current = false;
    }
  }, [isOnline]);

  return (
    <ErrorBoundary>
      <ConfigGuard isConfigured={!!supabase}>
        <AuthProvider>
          <AuthGate>
            <ApiKeyProvider>
                <DownloadProvider>
                    <Router>
                        <div className="font-sans antialiased text-foreground">
                            <Toast />
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/auth/callback" element={<AuthCallback />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/history" element={<History />} />
                                    <Route path="/settings" element={<Settings />} />
                                    
                                    {/* Supplemental Content Pages */}
                                    <Route path="/privacy" element={<InfoPage pageId="privacy" />} />
                                    <Route path="/terms" element={<InfoPage pageId="terms" />} />
                                    <Route path="/features" element={<InfoPage pageId="features" />} />
                                    <Route path="/supported-platforms" element={<InfoPage pageId="supported-platforms" />} />
                                    <Route path="/api-access" element={<InfoPage pageId="api-access" />} />
                                    
                                    <Route path="/info/:pageId" element={<InfoPage />} />
                                    <Route path="*" element={<Home />} />
                                </Routes>
                            </Layout>
                        </div>
                    </Router>
                </DownloadProvider>
            </ApiKeyProvider>
          </AuthGate>
        </AuthProvider>
      </ConfigGuard>
    </ErrorBoundary>
  )
}

export default App
