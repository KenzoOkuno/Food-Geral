'use client'

import { useContext } from 'react'
import { AudienceContext } from '@/contexts/AudienceContext'

export function useAudience() {
  const context = useContext(AudienceContext)
  if (!context) {
    throw new Error('useAudience deve ser usado dentro de AudienceProvider')
  }
  return context
}
