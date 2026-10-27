'use client'

import { useTheme } from '@/hooks/useTheme'
import { themeHomeCopy } from '@/lib/audience'
import { formatHandle, getMapsHref } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function SocialBand() {
  const { theme } = useTheme()
  const copy = themeHomeCopy(theme.id)
  const maps = getMapsHref(theme.address)

  return (
    <section id="contato" className="bg-primary text-on-primary">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.28em] opacity-70">
            {theme.address ?? 'São José dos Campos'}
          </p>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">{copy.cta}</h2>
          {theme.landmark ? <p className="mt-4 text-sm opacity-80">{theme.landmark}</p> : null}
          {theme.instagram ? <p className="mt-4 text-sm opacity-75">{formatHandle(theme.instagram)}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {maps ? (
            <Button href={maps} external variant="light" className="cta-pulse">
              Como chegar
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
