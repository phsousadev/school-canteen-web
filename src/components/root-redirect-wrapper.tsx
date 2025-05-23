import { useAuth } from "@/context/AuthContext"
import { RootRedirect } from "@/context/RootRedirectContext"
import { useUserRole } from "@/utils/use-user-role"


export function RootRedirectWrapper() {
  const { isAuthenticated } = useAuth()
  const role = useUserRole()

  return <RootRedirect isAuthenticated={isAuthenticated} role={role} />
}