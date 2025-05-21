import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filter'
import { useQuery } from '@tanstack/react-query'
import { getOrders, type OrderResponse } from '@/api/get-orders'
import { OrderTableRow } from './order-table-row'

interface GetOrdersResponse {
  orders: OrderResponse[];
}

export function Orders() {
  const { data, isLoading, isError, error } = useQuery<GetOrdersResponse, Error>({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  const orders = data?.orders ?? []

  const calculateOrderTotal = (items: OrderResponse['items']): number => {
    return items.reduce((sum, item) => {
      const itemUnitPrice = typeof item.unitPrice === 'function'
        ? item.unitPrice
        : parseFloat(item.unitPrice.toString())

      return sum + (item.quantity * itemUnitPrice)
    }, 0)
  }

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            Carregando pedidos...
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="rounded-md border p-4 text-center text-red-500">
            Ocorreu um erro ao carregar os pedidos: {error?.message ?? 'Erro desconhecido'}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <OrderTableRow
                      key={order.id}
                      order={{
                        orderId: order.id,
                        status: order.status,
                        total: calculateOrderTotal(order.items),
                        customerName: order.user.name,
                        createdAt: String(order.createdAt),
                        user: order.user,
                        items: order.items
                      }}
                    />
                  ))
                ) : (
                  <TableRow>
                    <td colSpan={6} className="py-4 text-center text-muted-foreground">
                      Nenhum pedido encontrado.
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </>
  )
}
