'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { DecorBackdrop } from '@/components/layout/DecorBackdrop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { AboutOwner } from '@/components/sections/AboutOwner'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === '/'

  return (
    <div className="relative flex min-h-screen flex-col">
      <DecorBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-40 h-16 bg-background md:h-20" />}>
          <Header />
        </Suspense>
        <main className={home ? 'flex-1' : 'flex-1 pt-16 md:pt-20'}>{children}</main>
        <AboutOwner />
        <Footer />
      </div>
    </div>
  )
}
