'use client'

import { FormEvent, useState } from 'react'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { useCart } from '@/hooks/useCart'
import { cn, formatCurrency } from '@/lib/utils'

type Payment = 'pix' | 'cartao' | 'boleto'

const payments: { id: Payment; label: string; detail: string }[] = [
  { id: 'pix', label: 'Pix', detail: 'Aprovação imediata' },
  { id: 'cartao', label: 'Cartão', detail: 'Em até 3x sem juros' },
  { id: 'boleto', label: 'Boleto', detail: 'Compensação em 1 dia útil' },
]

interface FormState {
  nome: string
  email: string
  telefone: string
  cep: string
  endereco: string
  numero: string
  cidade: string
  estado: string
  payment: Payment
}

const initial: FormState = {
  nome: '',
  email: '',
  telefone: '',
  cep: '',
  endereco: '',
  numero: '',
  cidade: '',
  estado: '',
  payment: 'pix',
}

export function CheckoutView() {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [receipt, setReceipt] = useState<{ code: string; amount: number } | null>(null)

  const set = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (form.nome.trim().length < 3) next.nome = 'Informe o nome completo'
    if (!form.email.includes('@')) next.email = 'E-mail inválido'
    if (form.telefone.replace(/\D/g, '').length < 10) next.telefone = 'Telefone incompleto'
    if (form.cep.replace(/\D/g, '').length < 8) next.cep = 'CEP inválido'
    if (form.endereco.trim().length < 3) next.endereco = 'Informe o endereço'
    if (!form.numero.trim()) next.numero = 'Informe o número'
    if (form.cidade.trim().length < 2) next.cidade = 'Informe a cidade'
    if (form.estado.trim().length < 2) next.estado = 'Informe o estado'
    setErrors(next)
    if (Object.keys(next).length > 0 || items.length === 0) return

    setSubmitting(true)
    const amount = total
    window.setTimeout(() => {
      const code = `MG-${Math.floor(10000 + Math.random() * 89999)}`
      clearCart()
      setReceipt({ code, amount })
      setSubmitting(false)
    }, 700)
  }

  if (receipt) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="animate-fadeInUp text-[11px] uppercase tracking-[0.28em] text-accent">Pedido confirmado</p>
        <h1 className="animate-fadeInUp mt-3 text-4xl md:text-6xl">Pedido recebido</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          O pedido {receipt.code} foi registrado nesta demonstração. Nenhuma cobrança foi feita. O total simulado era{' '}
          {formatCurrency(receipt.amount)}.
        </p>
        <Button href="/" className="mt-8">
          Voltar à loja
        </Button>
      </Container>
    )
  }

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <PageHeader eyebrow="Checkout" title="Sua sacola está vazia" />
        <Button href="/#cardapio">Ver cardápio</Button>
      </Container>
    )
  }

  return (
    <Container className="py-12 md:py-16">
      <PageHeader eyebrow="Checkout" title="Finalizar pedido" description="Preencha a entrega e escolha uma forma de pagamento simulada." />
      <form onSubmit={onSubmit} noValidate className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="grid gap-5 sm:grid-cols-2">
            <Input className="sm:col-span-2" label="Nome completo" value={form.nome} onChange={(event) => set('nome', event.target.value)} error={errors.nome} />
            <Input label="E-mail" type="email" value={form.email} onChange={(event) => set('email', event.target.value)} error={errors.email} />
            <Input label="Telefone" value={form.telefone} onChange={(event) => set('telefone', event.target.value)} error={errors.telefone} />
            <Input label="CEP" value={form.cep} onChange={(event) => set('cep', event.target.value)} error={errors.cep} />
            <Input label="Estado" value={form.estado} onChange={(event) => set('estado', event.target.value)} error={errors.estado} />
            <Input className="sm:col-span-2" label="Endereço" value={form.endereco} onChange={(event) => set('endereco', event.target.value)} error={errors.endereco} />
            <Input label="Número" value={form.numero} onChange={(event) => set('numero', event.target.value)} error={errors.numero} />
            <Input label="Cidade" value={form.cidade} onChange={(event) => set('cidade', event.target.value)} error={errors.cidade} />
          </section>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.18em] text-muted">Pagamento</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {payments.map((payment) => (
                <label
                  key={payment.id}
                  className={cn(
                    'cursor-pointer rounded-theme border p-4 text-sm',
                    form.payment === payment.id ? 'border-primary' : 'border-border',
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={form.payment === payment.id}
                    onChange={() => set('payment', payment.id)}
                  />
                  <span className="block font-medium">{payment.label}</span>
                  <span className="mt-1 block text-xs text-muted">{payment.detail}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Confirmando...' : 'Confirmar pedido'}
          </Button>
        </div>
        <CartSummary showCheckout={false} />
      </form>
    </Container>
  )
}
