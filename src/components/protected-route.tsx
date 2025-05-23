import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return <Outlet />
}
