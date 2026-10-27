'use client'

import { useContext } from 'react'
import { ModeContext } from '@/contexts/ModeContext'

export function useMode() {
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error('useMode deve ser usado dentro de ModeProvider')
  }
  return context
}
