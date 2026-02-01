import { useRef, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import { DownloadProvider } from './contexts/DownloadContext'
import { FeedbackProvider } from './contexts/FeedbackContext'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { useToast } from './hooks/useToast';
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/shared/ErrorBoundary'
import LoadingScreen from './components/shared/LoadingSpinner'
import Toast from './components/shared/Toast';
import ConfigGuard from './components/layout/ConfigGuard';
import AuthGate from './components/auth/AuthGate';
import { supabase } from './services/supabase';
import config from './config';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const ServerError = lazy(() => import('./pages/ServerError'));

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
  }, [isOnline, toast]);

  if (config.app.isMaintenanceMode) {
      return <Maintenance />;
  }

  return (
    <ErrorBoundary>
      <ConfigGuard isConfigured={!!supabase}>
        <AuthProvider>
          <AuthGate>
            <ApiKeyProvider>
                <DownloadProvider>
                    <FeedbackProvider>
                        <Router>
                        <div className="font-sans antialiased text-foreground">
                            <Toast />
                            <Layout>
                                <Suspense fallback={<LoadingScreen message="Loading page..." />}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/auth/callback" element={<AuthCallback />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/history" element={<History />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/profile" element={<Profile />} />
                                        
                                        {/* Supplemental Content Pages */}
                                        <Route path="/privacy" element={<InfoPage pageId="privacy" />} />
                                        <Route path="/terms" element={<InfoPage pageId="terms" />} />
                                        <Route path="/features" element={<InfoPage pageId="features" />} />
                                        <Route path="/supported-platforms" element={<InfoPage pageId="supported-platforms" />} />
                                        <Route path="/api-access" element={<InfoPage pageId="api-access" />} />
                                        <Route path="/changelog" element={<InfoPage pageId="changelog" />} />
                                        <Route path="/cookies" element={<InfoPage pageId="cookies" />} />
                                        <Route path="/about" element={<InfoPage pageId="about" />} />
                                        <Route path="/contact" element={<InfoPage pageId="contact" />} />
                                        <Route path="/faq" element={<InfoPage pageId="faq" />} />
                                        <Route path="/how-it-works" element={<InfoPage pageId="how-it-works" />} />
                                        <Route path="/support" element={<InfoPage pageId="support" />} />
                                        <Route path="/disclaimer" element={<InfoPage pageId="disclaimer" />} />
                                        
                                        <Route path="/info/:pageId" element={<InfoPage />} />
                                        <Route path="/maintenance" element={<Maintenance />} />
                                        <Route path="/500" element={<ServerError />} />
                                        <Route path="*" element={<Suspense fallback={<LoadingScreen />}><NotFound /></Suspense>} />
                                    </Routes>
                                </Suspense>
                            </Layout>
                        </div>
                    </Router>
                    </FeedbackProvider>
                </DownloadProvider>
            </ApiKeyProvider>
          </AuthGate>
        </AuthProvider>
      </ConfigGuard>
    </ErrorBoundary>
  )
}

export default App
