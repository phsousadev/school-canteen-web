import { api } from '@/lib/axios'

export async function getCartItems() {
  const response = await api.get('/shopping-carts')
  return response.data
}