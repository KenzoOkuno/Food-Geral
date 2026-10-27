import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Avaliação ${value.toFixed(1)} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn('h-3.5 w-3.5', index < Math.round(value) ? 'fill-accent text-accent' : 'text-border')}
          strokeWidth={1.5}
        />
      ))}
      <span className="ml-1 text-xs tabular-nums text-muted">{value.toFixed(1)}</span>
    </div>
  )
}
