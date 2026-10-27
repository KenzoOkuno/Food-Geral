'use client'

import { createContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { applyAudienceLook } from '@/lib/audience'
import { THEME_STORAGE_KEY, themes } from '@/lib/themes'
import type { Theme, ThemeId } from '@/types'

export interface ThemeContextValue {
  theme: Theme
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('valencaConfeitaria')
  const hydrated = useRef(false)

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
      if (stored && themes[stored] && stored !== themeId) {
        setThemeId(stored)
        return
      }
    }

    applyAudienceLook()
    localStorage.setItem(THEME_STORAGE_KEY, themeId)
  }, [themeId])

  const setTheme = (id: ThemeId) => {
    applyAudienceLook()
    setThemeId(id)
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeId], themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
