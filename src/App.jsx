import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApiKeyProvider>
            <ErrorBoundary>
            <div className="min-h-screen bg-background font-sans antialiased text-foreground">
                <Toaster position="top-center" />
                <Navbar />
                <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    
                    {/* Fallback route - could be a 404 page */}
                    <Route path="*" element={<Home />} />
                </Routes>
                </main>
            </div>
            </ErrorBoundary>
        </ApiKeyProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
