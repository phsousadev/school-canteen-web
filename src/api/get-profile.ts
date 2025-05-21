import { api } from '@/lib/axios'

export async function getProfile() {
  const response = await api.get('/me')

  return response.data
}