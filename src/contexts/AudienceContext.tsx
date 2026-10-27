'use client'

import { createContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { applyAudienceLook, AUDIENCE_STORAGE_KEY } from '@/lib/audience'
import type { Audience } from '@/types'

export interface AudienceContextValue {
  audience: Audience
  setAudience: (audience: Audience) => void
}

export const AudienceContext = createContext<AudienceContextValue | null>(null)

const validAudiences: Audience[] = ['geral', 'confeitaria']

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>('confeitaria')
  const hydrated = useRef(false)

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true
      const stored = localStorage.getItem(AUDIENCE_STORAGE_KEY)
      if (stored && validAudiences.includes(stored as Audience) && stored !== audience) {
        setAudienceState(stored as Audience)
        return
      }
    }

    localStorage.setItem(AUDIENCE_STORAGE_KEY, audience)
    applyAudienceLook()
  }, [audience])

  return (
    <AudienceContext.Provider value={{ audience, setAudience: setAudienceState }}>
      {children}
    </AudienceContext.Provider>
  )
}
