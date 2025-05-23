import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Search, Trash2 } from 'lucide-react'
import { getCartItems } from '@/api/get-cart-items'
import { removeProductToCart } from '@/api/remove-product-to-cart'
import { checkout } from '@/api/checkout'

interface CartItem {
  id: string
  name: string
  price: number
  category: { name: string }
  quantity: number
  createdAt: string
  updatedAt: string
}

export function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getCartItems()
      .then((cart) => {
        if (!cart.items || !Array.isArray(cart.items)) {
          throw new Error('Resposta inválida: items não é um array')
        }

        const normalizedItems = cart.items.map((item: any) => ({
          id: item.id,
          name: item.product?.name ?? 'Produto sem nome',
          price: Number(item.unitPrice ?? item.product?.price ?? 0),
          category: { name: item.product?.category?.name ?? 'Sem categoria' },
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))

        setCartItems(normalizedItems)
        setError(null)
      })
      .catch((err) => {
        setError(err.message || 'Erro ao carregar o carrinho')
        setCartItems([])
      })
      .finally(() => setLoading(false))
  }, [])

  function handleRemoveItem(id: string) {
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  if (loading) {
    return <div>Carregando itens do carrinho...</div>
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>
  }

  async function handleCheckout() {
    try {
      await checkout()
      window.location.reload()
      toast.success('Compra finalizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao finalizar a compra.')
    }
  }

  return (
    <>
      <Helmet title="Meu Carrinho" />


      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Itens no Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            Seu carrinho está vazio.
          </div>
        ) : (
          <div className="relative rounded-md border p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Detalhes</TableHead>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead className="w-[100px]">Preço</TableHead>
                  <TableHead className="w-[100px]">Qtd.</TableHead>
                  <TableHead className="w-[160px]">Categoria</TableHead>
                  <TableHead className="w-[160px]">Remover</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cartItems.map((item) => (
                  <CartTableRow key={item.id} item={item} onRemoved={handleRemoveItem} />
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

function CartTableRow({ item, onRemoved }: { item: CartItem; onRemoved: (id: string) => void }) {
  const [loadingRemove, setLoadingRemove] = useState(false)

  async function handleRemoveFromCart() {
    if (loadingRemove) return

    setLoadingRemove(true)
    try {
      const response = await removeProductToCart(item.id)
      if (response) {
        toast.success(`Produto "${item.name}" removido do carrinho.`)
        onRemoved(item.id)
      }
    } catch {
      toast.error('Erro ao remover produto do carrinho.')
    } finally {
      setLoadingRemove(false)
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <CartItemDetailsDialog item={item} />
        </Dialog>
      </TableCell>

      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>R$ {item.price.toFixed(2)}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.category.name}</TableCell>

      <TableCell>
        <Button
          variant="destructive"
          size="xs"
          onClick={handleRemoveFromCart}
          disabled={loadingRemove}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {loadingRemove ? 'Removendo...' : 'Remover'}
        </Button>
      </TableCell>
    </TableRow>
  )
}

function CartItemDetailsDialog({ item }: { item: CartItem }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Produto: {item.name}</DialogTitle>
        <DialogDescription>Detalhes do item no carrinho</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID:</span>
          <span className="font-mono text-xs">{item.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nome:</span>
          <span>{item.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Preço:</span>
          <span>R$ {item.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantidade:</span>
          <span>{item.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Categoria:</span>
          <span>{item.category.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Adicionado:</span>
          <span>
            {formatDistanceToNow(new Date(item.createdAt), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Atualizado:</span>
          <span>
            {formatDistanceToNow(new Date(item.updatedAt), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </DialogContent>
  )
}
