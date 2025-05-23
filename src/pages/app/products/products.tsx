import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Search, X, ShoppingCart } from 'lucide-react'
import { getProducts, type Product } from '@/api/get-products'

export function Products() {
  const { data: products = [], isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <>
      <Helmet title="Produtos" />

      <section className="flex flex-col gap-4">
        <ProductTableFilters />

        {isLoading ? (
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            Carregando produtos...
          </div>
        ) : isError ? (
          <div className="rounded-md border p-4 text-center text-red-500">
            Erro ao carregar: {error?.message ?? 'Erro desconhecido'}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Detalhes</TableHead>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead className="w-[120px]">Preço</TableHead>
                  <TableHead className="w-[160px]">Categoria</TableHead>
                  <TableHead className="w-[160px]">Comprar</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductTableRow key={product.id} product={product} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-4 text-center text-muted-foreground">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </>
  )
}

function ProductTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do produto" className="h-8 w-auto" />
      <Input placeholder="Nome do produto" className="h-8 w-[320px]" />
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      <Button variant="outline" size="xs" type="button">
        <X className="mr-2 h-4 w-4" />
        Limpar
      </Button>
    </form>
  )
}

interface ProductTableRowProps {
  product: Product
}

function ProductTableRow({ product }: ProductTableRowProps) {
  function handleAddToCart() {
    console.log(`Produto adicionado: ${product.name}`)
    // Aqui você pode chamar um contexto ou função para adicionar ao carrinho.
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
          <ProductDetailsDialog product={product} />
        </Dialog>
      </TableCell>

      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.category.name}</TableCell>

      <TableCell>
        <Button variant="default" size="xs" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </TableCell>
    </TableRow>
  )
}

function ProductDetailsDialog({ product }: { product: Product }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Produto: {product.name}</DialogTitle>
        <DialogDescription>Detalhes do produto</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID:</span>
          <span className="font-mono text-xs">{product.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nome:</span>
          <span>{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Preço:</span>
          <span>{product.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Categoria:</span>
          <span>{product.category.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Criado:</span>
          <span>
            {formatDistanceToNow(new Date(product.createdAt), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Atualizado:</span>
          <span>
            {formatDistanceToNow(new Date(product.updatedAt), {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </DialogContent>
  )
}
