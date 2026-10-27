import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'light-outline'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:opacity-90',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-on-primary',
  ghost: 'text-foreground hover:bg-bg-alt',
  light: 'bg-white text-black hover:bg-white/90',
  'light-outline': 'border border-white/80 text-white hover:bg-white hover:text-black',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[11px] uppercase tracking-[0.16em]',
  md: 'px-6 py-3 text-xs uppercase tracking-[0.16em]',
  lg: 'px-8 py-4 text-xs uppercase tracking-[0.18em]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  fullWidth?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  fullWidth,
  className,
  children,
  type,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-theme font-sans font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )

  if (href && external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  )
}
