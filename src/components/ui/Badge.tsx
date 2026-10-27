import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-primary px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-on-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}
