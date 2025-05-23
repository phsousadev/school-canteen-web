import { Navigate } from 'react-router-dom'

interface RootRedirectProps {
  isAuthenticated: boolean
  role?: string | null
}

export function RootRedirect({ isAuthenticated, role }: RootRedirectProps) {
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  if (role === 'ADMIN') {
    return <Navigate to="/app/dashboard" replace />
  }

  return <Navigate to="/app/shopping" replace />
}