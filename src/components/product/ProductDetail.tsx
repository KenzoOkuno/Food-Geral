'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Quantity } from '@/components/ui/Quantity'
import { Rating } from '@/components/ui/Rating'
import { useAudience } from '@/hooks/useAudience'
import { useCart } from '@/hooks/useCart'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { productsForAudience } from '@/lib/audience'
import { getCategoryLabel } from '@/lib/products'
import {
  cn,
  discountPercent,
  formatCurrency,
  formatHandle,
  getInstagramHref,
  getWhatsappHref,
  productShareMessage,
} from '@/lib/utils'
import type { Product } from '@/types'

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { mode } = useMode()
  const { theme } = useTheme()
  const { audience } = useAudience()
  const relatedVisible = productsForAudience(related, audience, theme.id)
  const { addItem } = useCart()
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '')
  const [color, setColor] = useState(product.colors[0]?.name ?? '')
  const [quantity, setQuantity] = useState(1)
  const discount = discountPercent(product.price, product.originalPrice)
  const categoryHref =
    mode === 'store' ? `/?categoria=${product.category}#cardapio` : `/catalog?categoria=${product.category}`
  const instagram = getInstagramHref(theme)

  useEffect(() => {
    setSize(product.sizes.length === 1 ? product.sizes[0] : '')
    setColor(product.colors[0]?.name ?? '')
    setQuantity(1)
  }, [product])

  const addToCart = () => {
    if (!product.inStock) return
    if (!size) {
      toast.error('Selecione o tamanho ou quantidade')
      return
    }
    addItem({ productId: product.id, size, color, quantity })
  }

  const askOnWhatsapp = () => {
    if (!size) {
      toast.error('Selecione o tamanho ou quantidade')
      return
    }
    const message = `${productShareMessage(product.name, product.price, 'doce')} Sabor/tema: ${color}. Porção: ${size}. Quantidade: ${quantity}.`
    const href =
      getWhatsappHref(theme, message) ?? `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Container className="py-8 md:py-14">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div className="animate-fadeInUp lg:sticky lg:top-28">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            <Link href={mode === 'store' ? '/' : '/catalog'} className="hover:text-foreground">
              Cardápio
            </Link>
            <span className="px-2">/</span>
            <Link href={categoryHref} className="hover:text-foreground">
              {getCategoryLabel(product.category)}
            </Link>
          </p>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4">
            <Rating value={product.rating} />
          </div>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="text-sm text-muted">a partir de</span>
            <span className="text-2xl tabular-nums text-primary">{formatCurrency(product.price)}</span>
            {discount > 0 ? (
              <span className="text-sm text-muted line-through">{formatCurrency(product.originalPrice)}</span>
            ) : null}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Sabor / tema</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={color === item.name}
                  onClick={() => setColor(item.name)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-theme border px-3 py-2 text-xs',
                    color === item.name ? 'border-primary' : 'border-border',
                  )}
                >
                  <span className="h-3 w-3 rounded-full border border-black/10" style={{ background: item.hex }} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Porção / tamanho</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={size === item}
                  onClick={() => setSize(item)}
                  className={cn(
                    'min-w-12 rounded-theme border px-3 py-2 text-xs uppercase tracking-[0.12em]',
                    size === item ? 'border-primary bg-primary text-on-primary' : 'border-border',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {mode === 'store' ? (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Quantity value={quantity} onChange={(value) => setQuantity(Math.min(10, Math.max(1, value)))} />
              <Button onClick={addToCart} disabled={!product.inStock} fullWidth>
                {product.inStock ? 'Adicionar ao carrinho' : 'Esgotado'}
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Quantity value={quantity} onChange={(value) => setQuantity(Math.min(10, Math.max(1, value)))} />
                <Button onClick={addToCart} disabled={!product.inStock} fullWidth>
                  {product.inStock ? 'Adicionar à sacola' : 'Esgotado'}
                </Button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={askOnWhatsapp} variant="outline" fullWidth className="cta-pulse">
                  Pedir orçamento
                </Button>
                {instagram ? (
                  <Button href={instagram} external variant="outline" fullWidth>
                    {formatHandle(theme.instagram ?? 'Instagram')}
                  </Button>
                ) : null}
              </div>
            </div>
          )}

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Valores de referência. O orçamento final confirma sabor, tamanho, tema e prazo de entrega em São José dos
            Campos.
          </p>
        </div>
      </div>

      {relatedVisible.length > 0 ? (
        <section className="mt-20">
          <h2 className="mb-8 font-heading text-3xl">Também no cardápio</h2>
          <ProductGrid products={relatedVisible} />
        </section>
      ) : null}
    </Container>
  )
}
