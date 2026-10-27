'use client'

import { createContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { AppMode } from '@/types'

export const MODE_STORAGE_KEY = 'foodgeral-mode'

export interface ModeContextValue {
  mode: AppMode
  setMode: (mode: AppMode) => void
}

export const ModeContext = createContext<ModeContextValue | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>('store')
  const hydrated = useRef(false)

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true
      const stored = localStorage.getItem(MODE_STORAGE_KEY)
      if ((stored === 'store' || stored === 'landing') && stored !== mode) {
        setModeState(stored)
        return
      }
    }

    localStorage.setItem(MODE_STORAGE_KEY, mode)
  }, [mode])

  return (
    <ModeContext.Provider value={{ mode, setMode: setModeState }}>
      {children}
    </ModeContext.Provider>
  )
}
