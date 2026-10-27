'use client'

import { useEffect, useState } from 'react'
import { BrandProfile } from '@/components/sections/BrandProfile'
import { Hero } from '@/components/sections/Hero'
import { SocialBand } from '@/components/sections/SocialBand'
import { StoreNotes } from '@/components/sections/Benefits'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import { useAudience } from '@/hooks/useAudience'
import { useTheme } from '@/hooks/useTheme'
import { categoriesFor, productsForAudience, themeHomeCopy } from '@/lib/audience'
import { products } from '@/lib/products'
import { valencaAudiencePromos, valencaLandingImage } from '@/lib/valencaLook'
import { getInstagramHref, getWhatsappHref } from '@/lib/utils'

export function LandingHome() {
  const { theme } = useTheme()
  const { audience } = useAudience()
  const [loading, setLoading] = useState(true)
  const copy = themeHomeCopy(theme.id)
  const whatsapp = getWhatsappHref(
    theme,
    `Olá! Vim pelo site da ${theme.name} e quero fazer uma encomenda.`,
  )
  const instagram = getInstagramHref(theme)
  const visibleProducts = productsForAudience(products, audience, theme.id)
  const featured = visibleProducts.slice(0, 8)
  const categories = categoriesFor(audience, theme.id)

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <>
      <Hero
        key={theme.id}
        eyebrow={copy.eyebrow}
        title={copy.landingTitle}
        subtitle={copy.landingSubtitle}
        image={valencaLandingImage}
        promos={valencaAudiencePromos.map((promo) => ({
          ...promo,
          primary: {
            label: promo.eyebrow === 'Eventos' ? copy.cta : `Ver ${promo.eyebrow.toLowerCase()}`,
            href: whatsapp && promo.eyebrow === 'Eventos' ? whatsapp : '/catalog',
            external: promo.eyebrow === 'Eventos' && Boolean(whatsapp),
          },
        }))}
        primary={{ label: 'Ver cardápio', href: '/catalog' }}
        secondary={
          whatsapp
            ? { label: copy.cta, href: whatsapp, external: true }
            : { label: 'Instagram', href: instagram ?? '#', external: true }
        }
      />
      <BrandProfile />
      <StoreNotes />

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">No cardápio</p>
              <h2 className="mt-3 font-heading text-3xl md:text-5xl">Destaques que despertam vontade</h2>
            </div>
            <Button href="/catalog" variant="outline">
              Cardápio completo
            </Button>
          </div>
          {loading ? <ProductGridSkeleton /> : <ProductGrid products={featured} />}
        </Container>
      </section>

      <section className="bg-bg-alt py-16 md:py-24">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Categorias</p>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">Monte a mesa do jeito certo</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <a
                key={item.id}
                href={`/catalog?categoria=${item.id}`}
                className="menu-category-tile group relative overflow-hidden rounded-theme border border-border bg-surface p-5 transition-transform duration-500 hover:-translate-y-1"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{item.label}</p>
                <p className="mt-3 font-heading text-2xl leading-tight">{item.description}</p>
                <span className="mt-6 inline-flex text-[11px] uppercase tracking-[0.18em] text-primary transition-opacity group-hover:opacity-70">
                  Abrir →
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <SocialBand />
    </>
  )
}
