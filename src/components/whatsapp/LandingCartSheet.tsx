'use client'

import { X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useTheme } from '@/hooks/useTheme'
import { useWhatsappBot } from '@/hooks/useWhatsappBot'
import { buildCheckoutPayload } from '@/lib/whatsapp/checkoutHelper'
import { getProductById } from '@/lib/products'
import { formatCurrency } from '@/lib/utils'

export function LandingCartSheet() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { theme } = useTheme()
  const { cartOpen, closeCart, submitCart } = useWhatsappBot()

  if (!cartOpen) return null

  const finish = () => {
    const payload = buildCheckoutPayload(theme.name, items)
    if (!payload) return
    submitCart(payload)
    clearCart()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-start p-4 sm:items-center" role="presentation">
      <button type="button" aria-label="Fechar sacola" className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <section
        role="dialog"
        aria-labelledby="landing-cart-title"
        className="relative z-10 flex max-h-[80svh] w-full max-w-md flex-col rounded-theme bg-background text-foreground shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="landing-cart-title" className="font-heading text-2xl">
            Sacola
          </h2>
          <button type="button" onClick={closeCart} aria-label="Fechar" className="text-muted">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Sua sacola está vazia. Escolha um doce no cardápio.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null
                return (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="text-sm">
                    <p className="font-heading text-lg">{product.name}</p>
                    <p className="mt-1 text-muted">
                      {item.color} · {item.size} · Qtd {item.quantity}
                    </p>
                    <p className="mt-1 tabular-nums">{formatCurrency(product.price * item.quantity)}</p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border px-5 py-4">
          <p className="flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </p>
          <p className="mt-1 flex justify-between text-sm">
            <span className="text-muted">Frete</span>
            <span className="tabular-nums">{shipping === 0 ? 'A combinar' : formatCurrency(shipping)}</span>
          </p>
          <p className="mt-2 flex justify-between text-sm">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total)}</span>
          </p>
          <button
            type="button"
            onClick={finish}
            disabled={items.length === 0}
            className="mt-4 w-full rounded-theme bg-[#128c7e] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white disabled:opacity-40"
          >
            Pedir orçamento no WhatsApp
          </button>
        </div>
      </section>
    </div>
  )
}
