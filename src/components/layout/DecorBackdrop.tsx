'use client'

/** Detalhes decorativos fixos — vinho e branco, atrás do conteúdo. */
export function DecorBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="deco-vignette absolute inset-0" />
      <div className="deco-blob deco-blob-a" />
      <div className="deco-blob deco-blob-b" />
      <div className="deco-blob deco-blob-c" />

      {/* Ornamentos de confeitaria — silhuetas leves */}
      <svg className="deco-ornament deco-ornament-tl" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" />
        <path
          d="M80 36c10 12 18 22 18 34a18 18 0 1 1-36 0c0-12 8-22 18-34Z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="80" cy="78" r="6" fill="currentColor" />
      </svg>

      <svg className="deco-ornament deco-ornament-br" viewBox="0 0 180 180" fill="none">
        <path
          d="M20 90c20-40 50-60 70-60s50 20 70 60-50 70-70 70S0 130 20 90Z"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path d="M55 95c8-4 16-4 24 0M72 108c5 8 12 12 20 14" stroke="currentColor" strokeWidth="1" />
        <circle cx="118" cy="78" r="3" fill="currentColor" />
        <circle cx="98" cy="68" r="2.5" fill="currentColor" />
        <circle cx="132" cy="92" r="2" fill="currentColor" />
      </svg>

      <svg className="deco-ornament deco-ornament-ml" viewBox="0 0 80 200" fill="none">
        <path d="M40 10v180" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="40" cy="40" r="4" fill="currentColor" />
        <circle cx="40" cy="100" r="3" fill="currentColor" />
        <circle cx="40" cy="160" r="4" fill="currentColor" />
      </svg>

      <div className="deco-corner deco-corner-tr" />
      <div className="deco-corner deco-corner-bl" />
    </div>
  )
}
