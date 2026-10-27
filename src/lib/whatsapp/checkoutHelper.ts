import { getProductById } from '@/lib/products'
import { formatCurrency, getShipping } from '@/lib/utils'
import type { CartItem } from '@/types'

export interface CheckoutLine {
  productId: string
  name: string
  size: string
  color: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface CheckoutPayload {
  id: string
  storeName: string
  lines: CheckoutLine[]
  subtotal: number
  shipping: number
  total: number
  text: string
}

function orderId() {
  return `ped-${Date.now().toString(36)}`
}

export function formatCheckoutMessage(payload: Omit<CheckoutPayload, 'text' | 'id'> & { id?: string }) {
  const lines = payload.lines.map((line, index) => {
    return [
      `${index + 1}. ${line.name}`,
      `   Cor: ${line.color} · Tam: ${line.size} · Qtd: ${line.quantity} · ${formatCurrency(line.lineTotal)}`,
    ].join('\n')
  })

  return [
    `Olá! Quero finalizar esta compra na ${payload.storeName}.`,
    '',
    ...lines,
    '',
    `Subtotal: ${formatCurrency(payload.subtotal)}`,
    `Frete: ${payload.shipping === 0 ? 'Grátis' : formatCurrency(payload.shipping)}`,
    `Total: ${formatCurrency(payload.total)}`,
  ].join('\n')
}

export function buildCheckoutPayload(storeName: string, items: CartItem[]): CheckoutPayload | null {
  const lines: CheckoutLine[] = []

  for (const item of items) {
    const product = getProductById(item.productId)
    if (!product || item.quantity < 1) continue
    lines.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: product.price,
      lineTotal: product.price * item.quantity,
    })
  }

  if (lines.length === 0) return null

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const shipping = getShipping(subtotal)
  const draft = {
    id: orderId(),
    storeName,
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
  }

  return { ...draft, text: formatCheckoutMessage(draft) }
}
