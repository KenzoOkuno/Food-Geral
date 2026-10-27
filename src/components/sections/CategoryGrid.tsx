'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useAudience } from '@/hooks/useAudience'
import { useTheme } from '@/hooks/useTheme'
import { categoriesFor } from '@/lib/audience'

export function CategoryGrid() {
  const { audience } = useAudience()
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const categories = categoriesFor(audience, theme.id)

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Cardápio por categoria</p>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">O que você quer na mesa?</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <Link
                href={`/?categoria=${category.id}#cardapio`}
                className="group block overflow-hidden rounded-theme border border-border bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1218]/75 via-[#2a1218]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="font-heading text-2xl">{category.label}</p>
                    <p className="mt-1 text-xs text-white/80">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
