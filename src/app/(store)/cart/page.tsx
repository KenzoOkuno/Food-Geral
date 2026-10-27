import type { Metadata } from 'next'
import { CartView } from '@/components/cart/CartView'
import { StoreOnly } from '@/components/layout/StoreOnly'

export const metadata: Metadata = { title: 'Carrinho' }

export default function CartPage() {
  return (
    <StoreOnly>
      <CartView />
    </StoreOnly>
  )
}
