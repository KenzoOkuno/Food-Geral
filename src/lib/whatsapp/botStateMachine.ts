import type { CheckoutPayload } from '@/lib/whatsapp/checkoutHelper'
import { generateMockPix, type MockPix } from '@/lib/whatsapp/mockPixService'
import { formatCurrency } from '@/lib/utils'

export type BotStep = 'idle' | 'awaiting_pix' | 'requesting_address' | 'confirmed'

export interface DeliveryData {
  name: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
}

export interface BotMessage {
  id: string
  role: 'customer' | 'bot'
  text: string
  pix?: Pick<MockPix, 'copiaECola' | 'qrDataUrl' | 'txid'>
}

export interface ShopOrder {
  id: string
  payload: CheckoutPayload
  pixTxid: string
  copiaECola: string
  delivery: DeliveryData | null
  confirmedAt: number
  status: 'em_separacao'
}

export interface BotSession {
  step: BotStep
  payload: CheckoutPayload | null
  pix: MockPix | null
  delivery: DeliveryData | null
  messages: BotMessage[]
  confirmedAt: number | null
}

const PAYMENT_CONFIRMATION = 'Pagamento recebido com sucesso! Seu pedido foi confirmado e já está em separação.'

export function createBotSession(): BotSession {
  return {
    step: 'idle',
    payload: null,
    pix: null,
    delivery: null,
    messages: [],
    confirmedAt: null,
  }
}

function message(session: BotSession, role: BotMessage['role'], text: string, pix?: BotMessage['pix']): BotMessage {
  return { id: `${session.payload?.id ?? 'chat'}-${session.messages.length + 1}-${role}`, role, text, pix }
}

export function receiveCart(payload: CheckoutPayload): BotSession {
  const pix = generateMockPix({ amount: payload.total, reference: payload.id })
  const session = createBotSession()
  session.payload = payload
  session.pix = pix
  session.step = 'awaiting_pix'
  session.messages = [
    message(session, 'customer', payload.text),
  ]

  const summary = [
    'Recebi seu pedido. Segue o resumo para o Pix simulado:',
    '',
    ...payload.lines.map(
      (line, index) =>
        `${index + 1}. ${line.name} · ${line.color} · Tam ${line.size} · Qtd ${line.quantity} · ${formatCurrency(line.lineTotal)}`,
    ),
    '',
    `Total: ${formatCurrency(payload.total)}`,
    '',
    'Pague com a chave abaixo. Este código é fictício e não movimenta dinheiro.',
  ].join('\n')

  session.messages.push(
    message(session, 'bot', summary, {
      copiaECola: pix.copiaECola,
      qrDataUrl: pix.qrDataUrl,
      txid: pix.txid,
    }),
  )

  session.step = 'requesting_address'
  session.messages.push(
    message(
      session,
      'bot',
      'Agora preciso da entrega. Me envie nome, CEP, rua, número, bairro e cidade.',
    ),
  )

  return session
}

export function submitDelivery(session: BotSession, delivery: DeliveryData): BotSession {
  if (!session.payload || session.step === 'idle') return session

  const next: BotSession = { ...session, delivery, messages: [...session.messages] }
  next.messages.push(
    message(
      next,
      'customer',
      `Entrega: ${delivery.name}. ${delivery.street}, ${delivery.number} — ${delivery.neighborhood}, ${delivery.city}. CEP ${delivery.cep}.`,
    ),
  )
  next.messages.push(
    message(
      next,
      'bot',
      `Entrega anotada para ${delivery.name}, ${delivery.street}, ${delivery.number} — ${delivery.neighborhood}, ${delivery.city}, CEP ${delivery.cep}.`,
    ),
  )
  return next
}

export function approvePayment(session: BotSession): BotSession {
  if (!session.payload || !session.pix || session.step === 'idle' || session.step === 'confirmed') return session

  const next: BotSession = {
    ...session,
    step: 'confirmed',
    confirmedAt: Date.now(),
    messages: [...session.messages],
  }
  next.messages.push(message(next, 'bot', PAYMENT_CONFIRMATION))
  return next
}

export function toShopOrder(session: BotSession): ShopOrder | null {
  if (session.step !== 'confirmed' || !session.payload || !session.pix || !session.confirmedAt) return null
  return {
    id: session.payload.id,
    payload: session.payload,
    pixTxid: session.pix.txid,
    copiaECola: session.pix.copiaECola,
    delivery: session.delivery,
    confirmedAt: session.confirmedAt,
    status: 'em_separacao',
  }
}

export function isDeliveryData(value: Partial<DeliveryData>): value is DeliveryData {
  return Boolean(
    value.name?.trim() &&
      value.cep?.replace(/\D/g, '').length === 8 &&
      value.street?.trim() &&
      value.number?.trim() &&
      value.neighborhood?.trim() &&
      value.city?.trim(),
  )
}

export function formatCep(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}
