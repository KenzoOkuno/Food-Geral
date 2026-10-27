'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Quantity } from '@/components/ui/Quantity'
import { useCart } from '@/hooks/useCart'
import { getProductById } from '@/lib/products'
import { formatCurrency } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart()
  const product = getProductById(item.productId)
  if (!product) return null
  const image = product.images[0]

  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 border-b border-border py-6 sm:grid-cols-[120px_1fr_auto]">
      <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden rounded-theme bg-bg-alt">
        <Image src={image} alt={product.name} fill sizes="120px" className="object-cover" />
      </Link>
      <div>
        <Link href={`/product/${product.id}`} className="font-heading text-xl">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-muted">
          {item.color} · {item.size}
        </p>
        <p className="mt-3 text-sm tabular-nums">{formatCurrency(product.price)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Quantity value={item.quantity} onChange={(quantity) => updateQuantity(item, quantity)} />
          <button
            type="button"
            onClick={() => removeItem(item)}
            className="text-[11px] uppercase tracking-[0.16em] text-muted underline underline-offset-4"
          >
            Remover
          </button>
        </div>
      </div>
      <p className="hidden text-sm tabular-nums sm:block">{formatCurrency(product.price * item.quantity)}</p>
    </article>
  )
}
