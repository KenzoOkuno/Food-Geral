'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAudience } from '@/hooks/useAudience'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { categoriesFor, displayTagline } from '@/lib/audience'
import { formatHandle, getInstagramHref, getWhatsappHref } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const { theme } = useTheme()
  const { mode } = useMode()
  const { audience } = useAudience()
  const tagline = displayTagline(theme.tagline, theme.id, audience)
  const handle = theme.instagram ? formatHandle(theme.instagram) : null
  const instagram = getInstagramHref(theme)
  const whatsapp = getWhatsappHref(theme, `Olá! Quero falar com ${theme.name}.`)
  const year = new Date().getFullYear()
  const photo = theme.profileImage ?? theme.logoImage
  const categories = categoriesFor(audience, theme.id)

  return (
    <footer className="mt-auto border-t border-border bg-bg-alt">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            {photo ? (
              <Image
                src={photo}
                alt={theme.name}
                width={96}
                height={96}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : null}
            <div>
              <p className="font-heading text-xl leading-tight">{theme.logo}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">{tagline}</p>
            </div>
          </div>
          {theme.address ? <p className="mt-4 text-sm leading-relaxed text-muted">{theme.address}</p> : null}
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Cardápio</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((item) => (
              <li key={item.id}>
                <Link
                  href={mode === 'store' ? `/?categoria=${item.id}#cardapio` : `/catalog?categoria=${item.id}`}
                  className="hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            {whatsapp ? (
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  WhatsApp
                </a>
              </li>
            ) : null}
            {instagram && handle ? (
              <li>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {handle}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Sobre</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/#sobre" className="hover:text-primary">
                Sobre o dono
              </Link>
            </li>
            {theme.since ? <li>Desde {theme.since}</li> : theme.credit ? <li>{theme.credit}</li> : null}
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {theme.name}
          </p>
          <p>Food Geral · Confeitaria</p>
        </Container>
      </div>
    </footer>
  )
}
