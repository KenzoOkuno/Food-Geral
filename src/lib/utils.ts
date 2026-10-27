import type { Theme } from '@/types'

export const FREE_SHIPPING_THRESHOLD = 499
export const SHIPPING_FEE = 29.9

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function getShipping(subtotal: number) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return SHIPPING_FEE
}

export function formatHandle(handle: string) {
  return handle.startsWith('@') ? handle : `@${handle}`
}

export function fallbackHandle(name: string) {
  const slug = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
  return `@${slug || 'loja'}`
}

export function formatLocalPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  const local = digits.startsWith('55') ? digits.slice(2) : digits
  if (local.length === 11) return `${local.slice(0, 2)} ${local.slice(2, 7)}-${local.slice(7)}`
  if (local.length === 10) return `${local.slice(0, 2)} ${local.slice(2, 6)}-${local.slice(6)}`
  return value
}

export function getMapsHref(address?: string) {
  if (!address) return undefined
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replaceAll('|', ','))}`
}

export function getInstagramHref(theme: Theme) {
  if (!theme.instagram) return undefined
  return `https://instagram.com/${theme.instagram.replace(/^@/, '')}`
}

export function getWhatsappHref(theme: Theme, message?: string) {
  if (!theme.whatsapp) return undefined
  const base = `https://wa.me/${theme.whatsapp.replace(/\D/g, '')}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function productShareMessage(name: string, price: number, kind: 'peca' | 'projeto' | 'doce' = 'doce') {
  const lead = kind === 'projeto' ? 'no projeto' : kind === 'doce' ? 'no item' : 'na peça'
  return `Olá! Tenho interesse ${lead} ${name} (${formatCurrency(price)}). Pode me passar o orçamento?`
}

export function formatFollowers(value?: number) {
  if (value == null) return ''
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function cartItemKey(item: { productId: string; size: string; color: string }) {
  return `${item.productId}::${item.size}::${item.color}`
}

export function discountPercent(price: number, originalPrice: number) {
  if (originalPrice <= price) return 0
  return Math.round((1 - price / originalPrice) * 100)
}
