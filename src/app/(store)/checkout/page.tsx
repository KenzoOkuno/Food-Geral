import type { Metadata } from 'next'
import { CheckoutView } from '@/components/cart/CheckoutView'
import { StoreOnly } from '@/components/layout/StoreOnly'

export const metadata: Metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <StoreOnly>
      <CheckoutView />
    </StoreOnly>
  )
}
