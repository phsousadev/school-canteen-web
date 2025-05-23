import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return <Outlet />
}
