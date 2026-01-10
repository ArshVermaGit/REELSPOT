import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import { DownloadProvider } from './contexts/DownloadContext'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

function App() {
  const isOnline = useNetworkStatus(); // Hook initializes listeners
  return (
    <Router>
      <AuthProvider>
        <ApiKeyProvider>
            <DownloadProvider>
            <ErrorBoundary>
            <div className="min-h-screen bg-background font-sans antialiased text-foreground">
                <Toaster position="top-center" />
                <Navbar />
                <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                    
                    {/* Fallback route - could be a 404 page */}
                    <Route path="*" element={<Home />} />
                </Routes>
                </main>
            </div>
            </ErrorBoundary>
            </DownloadProvider>
        </ApiKeyProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
