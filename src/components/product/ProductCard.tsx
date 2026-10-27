'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { getCategoryLabel } from '@/lib/products'
import { cn, discountPercent, formatCurrency, getWhatsappHref, productShareMessage } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { mode } = useMode()
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [hover, setHover] = useState(false)
  const discount = discountPercent(product.price, product.originalPrice)
  const href = mode === 'store' ? `/product/${product.id}` : `/catalog/${product.id}`
  const orderMessage = productShareMessage(product.name, product.price, 'doce')
  const whatsapp =
    getWhatsappHref(theme, orderMessage) ?? `https://wa.me/?text=${encodeURIComponent(orderMessage)}`

  let badge = ''
  if (!product.inStock) badge = 'Esgotado'
  else if (discount > 0) badge = `-${discount}%`
  else if (product.tags.includes('novo')) badge = 'Novidade'
  else if (product.tags.includes('bestseller')) badge = 'Queridinho'

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] as const }}
      className="menu-item group"
      onMouseEnter={() => setHover(true)}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-theme bg-bg-alt">
          {!loaded ? <div className="absolute inset-0 animate-pulse bg-bg-alt" /> : null}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            onLoad={() => setLoaded(true)}
            className={cn(
              'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]',
              product.images[1] && 'group-hover:opacity-0',
            )}
          />
          {hover && product.images[1] ? (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2a1218]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {badge ? (
            <div className="absolute left-3 top-3">
              <Badge>{badge}</Badge>
            </div>
          ) : null}
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{getCategoryLabel(product.category)}</p>
          <div className="menu-price-row">
            <h3 className="font-heading text-xl leading-snug">{product.name}</h3>
            <span className="menu-dots" aria-hidden />
            <p className="shrink-0 text-sm tabular-nums text-primary">{formatCurrency(product.price)}</p>
          </div>
          {discount > 0 ? (
            <p className="text-xs text-muted line-through">{formatCurrency(product.originalPrice)}</p>
          ) : null}
        </div>
      </Link>
      {mode === 'landing' ? (
        <Button href={whatsapp} external variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
          Pedir orçamento
        </Button>
      ) : null}
    </motion.article>
  )
}
