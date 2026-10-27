'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, MapPin, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useTheme } from '@/hooks/useTheme'
import { formatFollowers, formatHandle, getInstagramHref } from '@/lib/utils'

export function BrandProfile() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const instagram = getInstagramHref(theme)
  const handle = theme.instagram ? formatHandle(theme.instagram) : null
  const photo = theme.profileImage ?? theme.logoImage

  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-10 md:py-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:text-left"
        >
          <div className="relative">
            <div className="profile-ring absolute -inset-1 rounded-full" />
            {photo ? (
              <Image
                src={photo}
                alt={theme.name}
                width={112}
                height={112}
                className="relative h-24 w-24 rounded-full object-cover shadow-lg md:h-28 md:w-28"
                priority
              />
            ) : (
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary font-heading text-3xl text-on-primary md:h-28 md:w-28">
                {theme.logo.slice(0, 1)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Confeitaria</p>
            <h2 className="mt-2 font-heading text-3xl leading-tight md:text-4xl">{theme.name}</h2>
            {theme.tagline ? <p className="mt-2 text-sm text-muted md:text-base">{theme.tagline}</p> : null}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted md:justify-start">
              {theme.address ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  {theme.address}
                </span>
              ) : null}
              {theme.since ? (
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  Desde {theme.since}
                </span>
              ) : theme.credit ? (
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  {theme.credit}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            {(theme.followers != null || theme.following != null) && (
              <div className="flex gap-6 tabular-nums">
                {theme.followers != null ? (
                  <div>
                    <p className="font-heading text-2xl text-primary">{formatFollowers(theme.followers)}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Seguidores</p>
                  </div>
                ) : null}
                {theme.following != null ? (
                  <div>
                    <p className="font-heading text-2xl text-primary">{formatFollowers(theme.following)}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Seguindo</p>
                  </div>
                ) : null}
              </div>
            )}
            {instagram && handle ? (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-theme border border-primary bg-primary px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-on-primary transition-transform duration-300 hover:scale-[1.03]"
              >
                <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
                {handle}
              </a>
            ) : null}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
