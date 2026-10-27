import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/ProductDetail'
import { getProductById, getRelatedProducts, products } from '@/lib/products'

interface PageProps {
  params: { id: string }
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductById(params.id)
  return { title: product?.name ?? 'Item' }
}

export default function CatalogProductPage({ params }: PageProps) {
  const product = getProductById(params.id)
  if (!product) notFound()
  return <ProductDetail product={product} related={getRelatedProducts(product)} />
}
