'use client'

import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { useCart } from '@/hooks/useCart'

export function CartView() {
  const { items } = useCart()

  return (
    <Container className="py-12 md:py-16">
      <PageHeader
        eyebrow="Sacola"
        title="Carrinho"
        description="Revise os doces antes de seguir para o checkout ou pedir orçamento."
      />
      {items.length === 0 ? (
        <div className="rounded-theme border border-border px-6 py-16">
          <p className="text-sm text-muted">Sua sacola está vazia.</p>
          <Button href="/#cardapio" className="mt-6">
            Ver cardápio
          </Button>
        </div>
      ) : (
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {items.map((item) => (
              <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </Container>
  )
}
