import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from './shared/LoadingSpinner'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen message="Checking authorization..." />
  }

  if (!user) {
    // Redirect to home page but save the attempted url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
