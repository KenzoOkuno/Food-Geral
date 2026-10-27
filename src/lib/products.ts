import { isConfeitariaCategory, valencaOptions, valencaProducts } from '@/lib/valencaMenu'
import type { Category, Product } from '@/types'

export const categoryOptions = valencaOptions

export function isCategory(value: string | null): value is Category {
  return value != null && isConfeitariaCategory(value)
}

export function readCategoryParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value ?? null
  return isCategory(raw) ? raw : null
}

export function getCategoryLabel(category: Category) {
  return valencaOptions.find((item) => item.id === category)?.label ?? category
}

export const products: Product[] = valencaProducts

export function getProductsByCategory(category: Category | null) {
  if (!category) return products
  return products.filter((product) => product.category === category)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, limit)
}
