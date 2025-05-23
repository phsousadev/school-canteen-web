import { api } from '@/lib/axios'

interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  price: string
  categoryId: string
  canteenId: string
  createdAt: string
  updatedAt: string
  category: Category
}

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<{ products: Product[] }>('/products')

  return response.data.products
}
