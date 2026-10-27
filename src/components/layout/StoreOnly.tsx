'use client'

import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { getWhatsappHref } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function StoreOnly({ children }: { children: React.ReactNode }) {
  const { mode } = useMode()
  const { theme } = useTheme()

  if (mode === 'landing') {
    const whatsapp = getWhatsappHref(
      theme,
      'Olá! Vim pelo cardápio da Valença Confeitaria e quero um orçamento.',
    )
    return (
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Cardápio visual</p>
        <h1 className="mt-3 max-w-xl font-heading text-4xl md:text-5xl">
          O orçamento acontece no atendimento
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Neste modo não há checkout. Escolha no cardápio e peça o orçamento pelo WhatsApp ou Instagram.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/catalog">Ver cardápio</Button>
          {whatsapp ? (
            <Button href={whatsapp} external variant="outline">
              WhatsApp
            </Button>
          ) : null}
        </div>
      </Container>
    )
  }

  return children
}
