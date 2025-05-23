import { api } from "@/lib/axios"
import { toast } from 'sonner'

export async function checkout() {
  try {
    return await api.post(`/shopping-carts/checkout`)
  } catch (error: any) {
    toast.error('Erro ao finalizar a compra.')
    return undefined
  }
}
