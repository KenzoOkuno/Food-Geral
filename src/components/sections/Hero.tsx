'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeroAction {
  label: string
  href: string
  external?: boolean
}

interface HeroSlide {
  image: string
  eyebrow: string
  title: string
  subtitle: string
  primary: HeroAction
  secondary?: HeroAction
  badge?: string
}

const promoSlides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1280&q=70',
    eyebrow: 'Orçamento',
    title: 'Peça já o bolo do seu evento',
    subtitle: 'Conte a data e o número de convidados — montamos o cardápio sob medida.',
    badge: 'DESDE 2019',
    primary: { label: 'Pedir orçamento', href: '/#contato' },
  },
  {
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1280&q=70',
    eyebrow: 'Doces finos',
    title: 'A mesa que chama atenção',
    subtitle: 'Brigadeiros, trufas e personalizados com o tema da festa.',
    primary: { label: 'Ver cardápio', href: '/#cardapio' },
  },
]

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  primary,
  secondary,
  storyImages,
  promos,
}: {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  primary: HeroAction
  secondary?: HeroAction
  storyImages?: string[]
  promos?: HeroSlide[]
}) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const indexRef = useRef(index)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const fit = () => {
      const visible = window.visualViewport?.height ?? window.innerHeight
      node.style.height = `${Math.round(Math.min(window.innerHeight, visible))}px`
    }

    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  const slides: HeroSlide[] = [
    { image, eyebrow, title, subtitle, primary, secondary },
    ...(promos ??
      promoSlides.map((slide, slideIndex) => ({
        ...slide,
        image: storyImages?.[slideIndex] ?? slide.image,
      }))),
  ]
  const slide = slides[index]
  const hidden = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  indexRef.current = index

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] max-h-[100svh] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Image
        key={slide.image}
        src={slide.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />

      <div className="pointer-events-none absolute inset-0 z-30 flex items-end">
        <div className="pointer-events-auto mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-10 md:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={hidden}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <span className="mb-6 block h-px w-14 bg-accent" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/80">{slide.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">{slide.subtitle}</p>
              {slide.badge ? (
                <p className="mt-5 inline-flex border border-white/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white">
                  {slide.badge}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                  <Button href={slide.primary.href} external={slide.primary.external} variant="light" size="lg">
                    {slide.primary.label}
                  </Button>
                </motion.div>
                {slide.secondary ? (
                  <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                    <Button href={slide.secondary.href} external={slide.secondary.external} variant="light-outline" size="lg">
                      {slide.secondary.label}
                    </Button>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="absolute inset-x-5 bottom-4 z-30 flex gap-1.5 md:inset-x-10"
        role="tablist"
        aria-label="Stories do cardápio"
      >
        {slides.map((item, itemIndex) => (
          <button
            key={item.eyebrow}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-label={`${item.eyebrow}, story ${itemIndex + 1} de ${slides.length}`}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35"
            onClick={() => go(itemIndex)}
          >
            <span
              key={itemIndex === index ? `active-${index}` : `idle-${itemIndex}`}
              className={cn(
                'block h-full bg-white',
                itemIndex < index && 'w-full',
                itemIndex > index && 'w-0',
                itemIndex === index && (reduce ? 'w-full' : 'story-progress'),
              )}
              style={itemIndex === index && !reduce ? { animationPlayState: paused ? 'paused' : 'running' } : undefined}
              onAnimationEnd={() => {
                if (reduce || indexRef.current !== itemIndex) return
                go(itemIndex + 1)
              }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
