import { useAuth } from '@/context/AuthContext'
import { parseJwt } from '../utils/parse-jwt'

export function useUserRole(): string | null {
  const { token } = useAuth()

  if (!token) return null

  const decoded = parseJwt(token)
  return decoded?.role ?? null
}
