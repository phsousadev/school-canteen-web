import { api } from '@/lib/axios'

interface ProductCategory {
  id: string
  name: string
}

interface OrderItemProduct {
  id: string
  name: string
  price: number
  category: ProductCategory
}

export interface OrderItemResponse {
  id: string
  quantity: number
  unitPrice: number
  product: OrderItemProduct
}

export interface OrderUser {
  id: string
  name: string
  email: string
  phone: string
}

export interface OrderResponse {
  id: string
  status: 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED'
  user: OrderUser
  items: OrderItemResponse[]
  createdAt: Date
  updatedAt: Date
}

export async function getOrders() {
  const response = await api.get('/orders')

  return response.data
}