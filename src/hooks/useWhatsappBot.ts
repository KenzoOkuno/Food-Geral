'use client'

import { useContext } from 'react'
import { WhatsappBotContext } from '@/contexts/WhatsappBotContext'

export function useWhatsappBot() {
  const context = useContext(WhatsappBotContext)
  if (!context) {
    throw new Error('useWhatsappBot deve ser usado dentro de WhatsappBotProvider')
  }
  return context
}
