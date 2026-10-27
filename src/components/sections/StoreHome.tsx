'use client'

import { Benefits, StoreNotes } from '@/components/sections/Benefits'
import { BrandProfile } from '@/components/sections/BrandProfile'
import { CategoryGrid } from '@/components/sections/CategoryGrid'
import { Hero } from '@/components/sections/Hero'
import { Newsletter } from '@/components/sections/Newsletter'
import { ProductBrowser } from '@/components/product/ProductBrowser'
import { Container } from '@/components/ui/Container'
import { useTheme } from '@/hooks/useTheme'
import { themeHomeCopy } from '@/lib/audience'
import { valencaAudiencePromos, valencaHeroImage } from '@/lib/valencaLook'
import type { Category, Product } from '@/types'

export function StoreHome({
  products,
  category,
}: {
  products: Product[]
  category: Category | null
}) {
  const { theme } = useTheme()
  const copy = themeHomeCopy(theme.id)
  const orderHref = theme.id === 'lubonConfeitaria' ? '/#contato' : '/#contato'

  return (
    <>
      <Hero
        key={theme.id}
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        image={valencaHeroImage}
        promos={valencaAudiencePromos.map((promo) => ({
          ...promo,
          primary: {
            label:
              promo.eyebrow === 'Bolos'
                ? 'Ver bolos'
                : promo.eyebrow === 'Doces finos'
                  ? 'Ver doces'
                  : copy.cta,
            href:
              promo.eyebrow === 'Bolos'
                ? '/?categoria=bolos#cardapio'
                : promo.eyebrow === 'Doces finos'
                  ? '/?categoria=doces#cardapio'
                  : orderHref,
          },
        }))}
        primary={{ label: 'Ver cardápio', href: '/#cardapio' }}
        secondary={{ label: copy.cta, href: orderHref }}
      />
      <BrandProfile />
      <Benefits />
      <StoreNotes />
      <div id="categorias">
        <CategoryGrid />
      </div>
      <section className="bg-bg-alt">
        <Container className="py-20 md:py-28">
          <p className="editorial-quote menu-quote max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {copy.quote}
          </p>
        </Container>
      </section>
      <section id="cardapio" className="py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Cardápio</p>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl">Escolha o doce do seu evento</h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Preços de referência — personalizamos sabor, tamanho e apresentação no orçamento.
            </p>
          </div>
          <ProductBrowser products={products} category={category} />
        </Container>
      </section>
      <Newsletter />
    </>
  )
}
