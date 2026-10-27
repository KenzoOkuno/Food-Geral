'use client'

import { MessageCircle, X } from 'lucide-react'
import { LandingCartSheet } from '@/components/whatsapp/LandingCartSheet'
import { MerchantOrders } from '@/components/whatsapp/MerchantOrders'
import { WhatsappChat } from '@/components/whatsapp/WhatsappChat'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { useWhatsappBot } from '@/hooks/useWhatsappBot'
import { cn } from '@/lib/utils'

export function LandingWhatsappDock() {
  const { mode } = useMode()
  const { theme } = useTheme()
  const { chatOpen, openChat, closeChat, panel, setPanel, orders, session } = useWhatsappBot()

  if (mode !== 'landing') return null

  return (
    <>
      <LandingCartSheet />
      {chatOpen ? (
        <section
          aria-label="Atendimento WhatsApp simulado"
          className="fixed bottom-4 left-4 z-50 flex h-[min(640px,calc(100svh-2rem))] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl bg-[#111b21] shadow-2xl"
        >
          <header className="flex items-center justify-between bg-[#075e54] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-medium">{theme.name}</p>
              <p className="text-[11px] text-white/80">WhatsApp · simulação</p>
            </div>
            <button type="button" onClick={closeChat} aria-label="Fechar conversa" className="text-white/90">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </header>
          <div className="grid grid-cols-2 bg-[#0b3f39] text-[11px] uppercase tracking-[0.14em] text-white">
            <button
              type="button"
              onClick={() => setPanel('chat')}
              className={cn('px-3 py-2', panel === 'chat' ? 'bg-white/15' : 'text-white/70')}
            >
              Conversa
            </button>
            <button
              type="button"
              onClick={() => setPanel('merchant')}
              className={cn('px-3 py-2', panel === 'merchant' ? 'bg-white/15' : 'text-white/70')}
            >
              Lojista{orders.length > 0 ? ` (${orders.length})` : ''}
            </button>
          </div>
          <div className="min-h-0 flex-1">{panel === 'merchant' ? <MerchantOrders /> : <WhatsappChat />}</div>
        </section>
      ) : (
        <button
          type="button"
          onClick={openChat}
          className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-medium text-[#111b21] shadow-2xl"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
          WhatsApp
          {session.step !== 'idle' ? <span className="h-2 w-2 rounded-full bg-[#075e54]" /> : null}
        </button>
      )}
    </>
  )
}
