'use client'

import { Toaster } from 'react-hot-toast'
import { LandingWhatsappDock } from '@/components/whatsapp/LandingWhatsappDock'
import { AudienceProvider } from '@/contexts/AudienceContext'
import { CartProvider } from '@/contexts/CartContext'
import { ModeProvider } from '@/contexts/ModeContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { WhatsappBotProvider } from '@/contexts/WhatsappBotContext'
import { AppShell } from '@/components/layout/AppShell'
import { DevPanel } from '@/components/layout/DevPanel'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AudienceProvider>
        <ModeProvider>
          <CartProvider>
          <WhatsappBotProvider>
          <AppShell>{children}</AppShell>
          <LandingWhatsappDock />
          <DevPanel />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2200,
              style: {
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                borderRadius: 'var(--radius)',
                padding: '12px 16px',
                fontSize: '14px',
                maxWidth: '420px',
              },
            }}
          />
          </WhatsappBotProvider>
          </CartProvider>
        </ModeProvider>
      </AudienceProvider>
    </ThemeProvider>
  )
}
