import { api } from "@/lib/axios"
import { toast } from 'sonner'

export async function removeProductToCart(productId: string) {
  try {
    return await api.delete(`/shopping-carts/${productId}`)
  } catch (error: any) {
    toast.error('Erro ao remover produto do carrinho.')
    return undefined
  }
}
