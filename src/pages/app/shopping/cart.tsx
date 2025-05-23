import { Helmet } from 'react-helmet-async'
import { CartItems } from './card-items'

export function Cart() {
  return (
    <>
      <Helmet title="Cart" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Seu carrinho</h1>

      </div>

      <CartItems />
    </>
  )
}