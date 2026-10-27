import { Minus, Plus } from 'lucide-react'

export function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-theme border border-border">
      <button
        type="button"
        className="px-3 py-2 transition-colors hover:bg-bg-alt"
        onClick={() => onChange(value - 1)}
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="px-3 py-2 transition-colors hover:bg-bg-alt"
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
