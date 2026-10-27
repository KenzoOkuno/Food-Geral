export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="mb-10 animate-fadeInUp">
      {eyebrow ? <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{eyebrow}</p> : null}
      <h1 className="mt-3 text-4xl md:text-5xl">{title}</h1>
      {description ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">{description}</p> : null}
    </header>
  )
}
