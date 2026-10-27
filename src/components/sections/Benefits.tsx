'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Cake, HeartHandshake, MapPin, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useTheme } from '@/hooks/useTheme'
import { formatHandle, getInstagramHref, getWhatsappHref } from '@/lib/utils'

export function Benefits() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const lubon = theme.id === 'lubonConfeitaria'
  const items = lubon
    ? [
        { icon: Cake, title: 'Bolos personalizados', text: 'Sob medida para a sua festa.' },
        { icon: Sparkles, title: '100% artesanal', text: 'Doces feitos com cuidado.' },
        { icon: HeartHandshake, title: 'Detalhe que marca', text: 'Cada peça conta uma história.' },
        { icon: MapPin, title: 'Jardim Morumbi', text: 'SJC/SP.' },
      ]
    : [
        { icon: Cake, title: 'Bolos artesanais', text: 'Camadas e cobertura sob medida.' },
        { icon: Sparkles, title: 'Doces finos', text: 'Para a mesa do evento.' },
        { icon: HeartHandshake, title: 'Experiência', text: 'A festa vira memória.' },
        { icon: MapPin, title: 'Desde 2019', text: 'São José dos Campos.' },
      ]

  return (
    <section className="border-b border-border">
      <Container className="grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="flex gap-3"
          >
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </Container>
    </section>
  )
}

export function StoreNotes() {
  const { theme } = useTheme()
  const handle = theme.instagram ? formatHandle(theme.instagram) : null
  const instagram = getInstagramHref(theme)
  const whatsapp = getWhatsappHref(theme, `Olá! Quero falar com ${theme.name}.`)

  return (
    <section className="border-b border-border bg-bg-alt">
      <Container className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {[theme.landmark, theme.address].filter(Boolean).join(' · ')}
        </p>
        <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.16em]">
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              WhatsApp
            </a>
          ) : null}
          {instagram && handle ? (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              {handle}
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
