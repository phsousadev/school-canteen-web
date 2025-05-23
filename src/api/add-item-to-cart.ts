import { api } from "@/lib/axios"
import type { Product } from "./get-products"
import { toast } from 'sonner'

export async function addProductInCart(product: Product) {
  try {
    return await api.post('/shopping-carts', {
      productId: product.id,
      quantity: 1,
    })

    toast.success(`Produto "${product.name}" adicionado ao carrinho!`)
  } catch (error: any) {
    console.error(error)
    toast.error('Erro ao adicionar produto ao carrinho.')
  }
}