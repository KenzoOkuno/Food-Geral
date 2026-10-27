import type { Metadata } from 'next'
import { StoreOnly } from '@/components/layout/StoreOnly'
import { AuthView } from '@/components/sections/AuthView'

export const metadata: Metadata = { title: 'Entrar' }

export default function LoginPage() {
  return (
    <StoreOnly>
      <AuthView mode="login" />
    </StoreOnly>
  )
}
