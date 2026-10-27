'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { useTheme } from '@/hooks/useTheme'

export function CatalogIntro() {
  const { theme } = useTheme()

  return (
    <PageHeader
      eyebrow={theme.name}
      title="Cardápio artesanal"
      description={`${theme.landmark}. ${theme.tagline}. Escolha o item e faça sua encomenda.`}
    />
  )
}
