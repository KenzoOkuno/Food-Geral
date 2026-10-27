import type { Metadata } from 'next'
import { CatalogIntro } from '@/components/product/CatalogIntro'
import { ProductBrowser } from '@/components/product/ProductBrowser'
import { Container } from '@/components/ui/Container'
import { getProductsByCategory, readCategoryParam } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Cardápio',
  description: 'Bolos, doces finos, tortas e personalizados da Valença Confeitaria Artesanal.',
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { categoria?: string | string[] }
}) {
  const category = readCategoryParam(searchParams.categoria)

  return (
    <Container className="py-12 md:py-16">
      <CatalogIntro />
      <ProductBrowser heading="Cardápio completo" products={getProductsByCategory(category)} category={category} />
    </Container>
  )
}
