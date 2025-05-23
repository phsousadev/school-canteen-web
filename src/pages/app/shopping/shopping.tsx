import { Helmet } from 'react-helmet-async'

export function Shoping() {
  return (
    <>
      <Helmet title="Shoping" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

        <div className="grid grid-cols-4 gap-4">

        </div>
      </div>

      <div className="grid grid-cols-9 gap-4">

      </div>
    </>
  )
}