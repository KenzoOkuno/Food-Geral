import type { Metadata } from 'next'
import { StoreOnly } from '@/components/layout/StoreOnly'
import { AuthView } from '@/components/sections/AuthView'

export const metadata: Metadata = { title: 'Criar conta' }

export default function RegisterPage() {
  return (
    <StoreOnly>
      <AuthView mode="register" />
    </StoreOnly>
  )
}
