import { Helmet } from 'react-helmet-async'
import { Products } from '../products/products'

export function Shoping() {
  return (
    <>
      <Helmet title="Shoping" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

      </div>

      <Products />
    </>
  )
}