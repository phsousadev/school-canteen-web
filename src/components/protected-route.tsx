import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}
