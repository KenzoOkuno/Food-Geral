import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const generated = useId()
  const inputId = id ?? generated

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full rounded-theme border bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-primary',
          error ? 'border-red-700' : 'border-border',
        )}
        {...props}
      />
      {error ? <p className="mt-1.5 text-xs text-red-700">{error}</p> : null}
    </div>
  )
}
