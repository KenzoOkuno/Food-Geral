'use client'

import { Settings2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAudience } from '@/hooks/useAudience'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { themeList } from '@/lib/themes'
import { cn } from '@/lib/utils'
import type { AppMode, Audience, ThemeId } from '@/types'

const modes: { id: AppMode; label: string }[] = [
  { id: 'store', label: 'Loja' },
  { id: 'landing', label: 'Landing' },
]

const audiences: { id: Audience; label: string }[] = [
  { id: 'geral', label: 'Geral' },
  { id: 'confeitaria', label: 'Confeitaria' },
]

export function DevPanel() {
  const { themeId, setTheme } = useTheme()
  const { mode, setMode } = useMode()
  const { audience, setAudience } = useAudience()
  const [visible, setVisible] = useState(process.env.NODE_ENV === 'development')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('dev') === 'true') setVisible(true)
    if (params.get('dev') === 'false') setVisible(false)
    if (window.innerWidth < 768) setCollapsed(true)
  }, [])

  if (!visible) return null

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 rounded-theme bg-primary px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-on-primary shadow-2xl"
        aria-label="Abrir painel de desenvolvimento"
      >
        <Settings2 className="h-3.5 w-3.5" strokeWidth={1.5} />
        Dev
      </button>
    )
  }

  return (
    <aside
      className="fixed bottom-4 right-4 z-[60] max-h-[calc(100svh-2rem)] w-[240px] overflow-y-auto rounded-theme border border-border bg-surface p-4 shadow-2xl"
      aria-label="Painel de desenvolvimento"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.22em]">Painel Dev</p>
        <button type="button" onClick={() => setCollapsed(true)} aria-label="Recolher painel" className="text-muted">
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted">Tema</p>
      <div className="mt-2 grid gap-2">
        {themeList.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTheme(item.id as ThemeId)
              setAudience('confeitaria')
            }}
            className={cn(
              'flex items-center justify-between rounded-theme border px-3 py-2 text-left text-xs transition-colors',
              themeId === item.id ? 'border-primary bg-primary text-on-primary' : 'border-border hover:border-primary',
            )}
          >
            <span>{item.logo}</span>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.colors.primary }} />
          </button>
        ))}
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted">Tipo</p>
      <div className="mt-2 grid gap-2">
        {audiences.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAudience(item.id)}
            className={cn(
              'rounded-theme border px-3 py-2 text-xs transition-colors',
              audience === item.id ? 'border-primary bg-primary text-on-primary' : 'border-border hover:border-primary',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted">Modo</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={cn(
              'rounded-theme border px-3 py-2 text-xs transition-colors',
              mode === item.id ? 'border-primary bg-primary text-on-primary' : 'border-border hover:border-primary',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
