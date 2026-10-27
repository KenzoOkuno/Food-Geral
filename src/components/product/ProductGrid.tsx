import { ProductCard } from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types'

export function ProductGrid({
  products,
  loading = false,
  emptyLabel = 'Nenhuma peça encontrada nesta categoria.',
}: {
  products: Product[]
  loading?: boolean
  emptyLabel?: string
}) {
  if (loading) return <ProductGridSkeleton count={8} />

  if (products.length === 0) {
    return <p className="py-16 text-sm text-muted">{emptyLabel}</p>
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
