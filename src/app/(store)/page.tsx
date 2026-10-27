import { HomeSwitcher } from '@/components/sections/HomeSwitcher'
import { getProductsByCategory, readCategoryParam } from '@/lib/products'

export default function HomePage({
  searchParams,
}: {
  searchParams: { categoria?: string | string[] }
}) {
  const category = readCategoryParam(searchParams.categoria)
  return <HomeSwitcher category={category} products={getProductsByCategory(category)} />
}
