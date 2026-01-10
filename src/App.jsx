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
import { Toaster } from 'react-hot-toast'

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
      <AuthProvider>
        <ApiKeyProvider>
            <DownloadProvider>
                <Router>
                    <div className="font-sans antialiased text-foreground">
                        <Toaster position="top-right" toastOptions={{
                            className: 'font-semibold',
                            style: {
                                borderRadius: '12px',
                                background: '#333',
                                color: '#fff',
                            },
                        }} />
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/auth/callback" element={<AuthCallback />} />
                                
                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/history" element={<History />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Route>
                                
                                <Route path="*" element={<Home />} />
                            </Routes>
                        </Layout>
                    </div>
                </Router>
            </DownloadProvider>
        </ApiKeyProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
