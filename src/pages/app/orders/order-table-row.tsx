import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { OrderDetails } from './order-details'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { OrderItemResponse, OrderUser } from '@/api/get-orders'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED'
    customerName: string
    total: number
    user: OrderUser,
    items: OrderItemResponse[]
  }
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function getStatusColor(status: OrderTableRowProps['order']['status']) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-400'
    case 'IN_PREPARATION':
      return 'bg-blue-400'
    case 'READY':
      return 'bg-green-400'
    case 'DELIVERED':
      return 'bg-gray-400'
    default:
      return 'bg-slate-400'
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails
            orderId={order.orderId}
            status={order.status}
            statusColor="bg-yellow-500"
            customerName={order.customerName}
            phone={order.user.phone}
            email={order.user.email}
            createdAt={formatDistanceToNow(new Date(order.createdAt), {
              locale: ptBR,
              addSuffix: true,
            })}
            items={order.items.map(item => ({
              productName: item.product.name,
              quantity: item.quantity,
              unitPrice: typeof item.unitPrice === 'function'
                ? item.unitPrice
                : parseFloat(item.unitPrice.toString())
            }))}
          />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getStatusColor(order.status)}`} />
          <span className="font-medium text-muted-foreground">
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>

      <TableCell className="flex gap-2">
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  )
}
