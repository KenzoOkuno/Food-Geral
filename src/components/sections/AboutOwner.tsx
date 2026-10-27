'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useTheme } from '@/hooks/useTheme'
import { formatHandle, getInstagramHref, getWhatsappHref } from '@/lib/utils'

export function AboutOwner() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const photo = theme.profileImage ?? theme.logoImage
  const handle = theme.instagram ? formatHandle(theme.instagram) : null
  const instagram = getInstagramHref(theme)
  const whatsapp = getWhatsappHref(
    theme,
    `Olá! Vi a seção Sobre e quero falar com ${theme.name}.`,
  )
  const badge = theme.since ? `Desde ${theme.since}` : theme.credit ?? 'Artesanal'

  return (
    <section id="sobre" className="relative overflow-hidden border-t border-border bg-bg-alt">
      <div className="pointer-events-none absolute inset-0 deco-owner-wash" aria-hidden />
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <svg
        className="pointer-events-none absolute right-6 top-8 h-24 w-24 text-primary/15 md:right-16 md:h-32 md:w-32"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden
      >
        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <path
          d="M60 28c8 10 14 18 14 28a14 14 0 1 1-28 0c0-10 6-18 14-28Z"
          fill="currentColor"
          opacity="0.35"
        />
      </svg>

      <Container className="relative py-16 md:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16"
        >
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute -inset-3 rounded-[28px] border border-primary/25" />
            <div className="absolute -inset-6 rounded-[36px] border border-dashed border-accent/30" />
            {photo ? (
              <Image
                src={photo}
                alt={`Sobre ${theme.name}`}
                width={560}
                height={700}
                className="relative aspect-[4/5] w-full rounded-[22px] object-cover shadow-owner-photo"
              />
            ) : (
              <div className="relative flex aspect-[4/5] w-full items-center justify-center rounded-[22px] bg-primary font-heading text-6xl text-on-primary">
                {theme.logo.slice(0, 1)}
              </div>
            )}
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-primary shadow-md">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              {badge}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Sobre o dono</p>
            <h2 className="mt-3 font-heading text-3xl leading-tight md:text-5xl">{theme.name}</h2>
            {theme.tagline ? (
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{theme.tagline}</p>
            ) : null}
            {theme.address ? (
              <p className="mt-3 text-sm text-muted">📍 {theme.address}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {whatsapp ? (
                <Button href={whatsapp} external className="cta-pulse">
                  WhatsApp
                </Button>
              ) : null}
              {instagram && handle ? (
                <Button href={instagram} external variant="outline">
                  {handle}
                </Button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
