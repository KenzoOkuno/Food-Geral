'use client'

import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { FREE_SHIPPING_THRESHOLD, formatCurrency } from '@/lib/utils'

export function CartSummary({ showCheckout = true }: { showCheckout?: boolean }) {
  const { subtotal, shipping, total, items } = useCart()
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <aside className="h-fit rounded-theme border border-border bg-bg-alt p-6">
      <h2 className="text-2xl">Resumo</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Frete</dt>
          <dd className="tabular-nums">{shipping === 0 ? 'Grátis' : formatCurrency(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatCurrency(total)}</dd>
        </div>
      </dl>
      {items.length > 0 && remaining > 0 ? (
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Faltam {formatCurrency(remaining)} para frete grátis.
        </p>
      ) : null}
      {showCheckout ? (
        <Button href="/checkout" fullWidth className="mt-6" disabled={items.length === 0}>
          Fechar pedido
        </Button>
      ) : (
        <p className="mt-4 text-xs text-muted">Pagamento simulado. Nenhuma cobrança será feita.</p>
      )}
    </aside>
  )
}
