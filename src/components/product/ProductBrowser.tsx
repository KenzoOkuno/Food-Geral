'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { useAudience } from '@/hooks/useAudience'
import { allowsCategory, categoriesFor, productsForAudience } from '@/lib/audience'
import { useTheme } from '@/hooks/useTheme'
import { getProductsByCategory } from '@/lib/products'
import { cn } from '@/lib/utils'
import type { Category, Product } from '@/types'

export function ProductBrowser({
  heading = 'Cardápio',
  products,
  category,
}: {
  heading?: string
  products: Product[]
  category: Category | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { audience } = useAudience()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const skip = useRef(true)
  const active = category && allowsCategory(category, audience, theme.id) ? category : null
  const source = category && !allowsCategory(category, audience, theme.id) ? getProductsByCategory(null) : products
  const shown = productsForAudience(
    active ? getProductsByCategory(active) : source,
    audience,
    theme.id,
  )
  const categories = categoriesFor(audience, theme.id)

  useEffect(() => {
    if (skip.current) {
      skip.current = false
      return
    }
    setLoading(true)
    const timeout = window.setTimeout(() => setLoading(false), 280)
    return () => window.clearTimeout(timeout)
  }, [active, audience, theme.id])

  const setCategory = (next: Category | null) => {
    const params = new URLSearchParams()
    if (next) params.set('categoria', next)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}#cardapio` : `${pathname}#cardapio`, { scroll: false })
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip active={!active} onClick={() => setCategory(null)}>
          Tudo
        </FilterChip>
        {categories.map((item) => (
          <FilterChip key={item.id} active={active === item.id} onClick={() => setCategory(item.id)}>
            {item.label}
          </FilterChip>
        ))}
      </div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h3 className="font-heading text-2xl md:text-3xl">{heading}</h3>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">{shown.length} itens</p>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[4/5] animate-pulse rounded-theme bg-bg-alt" />
          ))}
        </div>
      ) : (
        <ProductGrid products={shown} />
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-theme border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors',
        active ? 'border-primary bg-primary text-on-primary' : 'border-border hover:border-primary',
      )}
    >
      {children}
    </button>
  )
}
