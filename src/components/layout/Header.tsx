'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, Menu, MessageCircle, ShoppingBag, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAudience } from '@/hooks/useAudience'
import { useCart } from '@/hooks/useCart'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { useWhatsappBot } from '@/hooks/useWhatsappBot'
import { categoriesFor, displayTagline } from '@/lib/audience'
import { cn, fallbackHandle, formatHandle, getInstagramHref, getWhatsappHref } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { theme } = useTheme()
  const { mode } = useMode()
  const { audience } = useAudience()
  const { totalItems } = useCart()
  const { openCart } = useWhatsappBot()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const category = searchParams.get('categoria')
  const photo = theme.profileImage ?? theme.logoImage
  const overHero = pathname === '/' && !scrolled && !open
  const instagramHandle = theme.instagram ? formatHandle(theme.instagram) : fallbackHandle(theme.logo || theme.name)
  const instagram =
    getInstagramHref(theme) ?? `https://instagram.com/${instagramHandle.replace(/^@/, '')}`
  const whatsapp =
    getWhatsappHref(theme, `Olá! Vim pelo site ${theme.name} e quero um orçamento.`) ??
    `https://wa.me/?text=${encodeURIComponent(`Olá! Vim pelo site ${theme.name} e quero um orçamento.`)}`

  useEffect(() => {
    setOpen(false)
  }, [pathname, category, mode])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tagline = displayTagline(theme.tagline, theme.id, audience)

  const storeLinks = categoriesFor(audience, theme.id).map((item) => ({
    href: `/?categoria=${item.id}#cardapio`,
    label: item.label,
    active: pathname === '/' && category === item.id,
  }))

  const landingLinks = [
    {
      href: '/catalog',
      label: 'Cardápio',
      active: pathname.startsWith('/catalog'),
    },
  ]

  const links = mode === 'store' ? storeLinks : landingLinks

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        overHero ? 'text-white' : 'border-b border-border bg-background/95 text-foreground backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>

        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          {photo ? (
            <Image
              src={photo}
              alt={theme.name}
              width={96}
              height={96}
              priority
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/40 md:h-12 md:w-12"
            />
          ) : null}
          <span className="min-w-0 text-left leading-tight">
            <span className="block font-heading text-[15px] tracking-[0.02em] md:text-xl">{theme.logo}</span>
            <span
              className={cn(
                'mt-0.5 hidden text-[10px] uppercase tracking-[0.18em] sm:block',
                overHero ? 'text-white/75' : 'text-muted',
              )}
            >
              {tagline ?? 'Confeitaria artesanal'}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60',
                link.active && 'opacity-60',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {mode === 'landing' ? (
            <>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 items-center gap-2 px-2 text-[11px] uppercase tracking-[0.14em]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Orçamento</span>
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={instagramHandle}
                className="inline-flex h-10 items-center gap-2 px-2 text-[11px] uppercase tracking-[0.14em]"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">{instagramHandle}</span>
              </a>
              <button
                type="button"
                onClick={openCart}
                aria-label="Sacola"
                className="relative inline-flex h-10 w-10 items-center justify-center"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {totalItems > 0 ? (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-on-primary">
                    {totalItems}
                  </span>
                ) : null}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" aria-label="Entrar" className="inline-flex h-10 w-10 items-center justify-center">
                <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>
              <Link href="/cart" aria-label="Carrinho" className="relative inline-flex h-10 w-10 items-center justify-center">
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {totalItems > 0 ? (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-on-primary">
                    {totalItems}
                  </span>
                ) : null}
              </Link>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background text-foreground lg:hidden"
            aria-label="Menu móvel"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm uppercase tracking-[0.18em]">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
