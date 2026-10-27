'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useWhatsappBot } from '@/hooks/useWhatsappBot'
import { formatCep, isDeliveryData, type DeliveryData } from '@/lib/whatsapp/botStateMachine'
import { cn } from '@/lib/utils'

const fieldClass =
  'w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[#111b21] caret-[#111b21] placeholder:text-[#667781]'

const emptyDelivery = {
  name: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
}

export function WhatsappChat() {
  const { session, saveDelivery, simulatePayment, setPanel } = useWhatsappBot()
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const waitingAddress = session.step !== 'idle' && !session.delivery
  const canSimulate = Boolean(session.pix) && session.step !== 'idle' && session.step !== 'confirmed'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [session.messages.length])

  const update = (field: keyof DeliveryData, value: string) => {
    setDelivery((current) => ({ ...current, [field]: field === 'cep' ? formatCep(value) : value }))
    setError('')
  }

  const onDelivery = (event: FormEvent) => {
    event.preventDefault()
    if (!isDeliveryData(delivery)) {
      setError('Preencha nome, CEP, rua, número, bairro e cidade.')
      return
    }
    saveDelivery(delivery)
    setDelivery(emptyDelivery)
  }

  const copyPix = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece5dd]">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4" aria-live="polite">
        {session.messages.length === 0 ? (
          <p className="rounded-lg bg-white/80 px-3 py-2 text-sm text-[#667781]">
            Monte a sacola e toque em Finalizar Compra no WhatsApp. A conversa aparece aqui, sem sair do site.
          </p>
        ) : null}
        {session.messages.map((item) => (
          <div key={item.id} className={cn('flex', item.role === 'customer' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed text-[#111b21] shadow-sm',
                item.role === 'customer' ? 'bg-[#d9fdd3]' : 'bg-white',
              )}
            >
              <p className="whitespace-pre-wrap">{item.text}</p>
              {item.pix ? (
                <div className="mt-3 space-y-2">
                  {item.pix.qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.pix.qrDataUrl} alt="QR Code Pix simulado" className="h-40 w-40 bg-white" />
                  ) : null}
                  <p className="break-all font-mono text-[11px] leading-snug">{item.pix.copiaECola}</p>
                  <button
                    type="button"
                    onClick={() => copyPix(item.pix?.copiaECola ?? '')}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#027eb5]"
                  >
                    {copied ? 'Código copiado' : 'Copiar Pix'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {waitingAddress && !session.delivery ? (
        <form onSubmit={onDelivery} className="max-h-[48%] shrink-0 space-y-2 overflow-y-auto border-t border-black/5 bg-[#f0f2f5] p-3 text-[#111b21]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#667781]">Dados de entrega</p>
          <input value={delivery.name} onChange={(event) => update('name', event.target.value)} placeholder="Nome" className={fieldClass} />
          <div className="grid grid-cols-2 gap-2">
            <input value={delivery.cep} onChange={(event) => update('cep', event.target.value)} inputMode="numeric" placeholder="CEP" className={fieldClass} />
            <input value={delivery.number} onChange={(event) => update('number', event.target.value)} placeholder="Número" className={fieldClass} />
          </div>
          <input value={delivery.street} onChange={(event) => update('street', event.target.value)} placeholder="Rua" className={fieldClass} />
          <div className="grid grid-cols-2 gap-2">
            <input value={delivery.neighborhood} onChange={(event) => update('neighborhood', event.target.value)} placeholder="Bairro" className={fieldClass} />
            <input value={delivery.city} onChange={(event) => update('city', event.target.value)} placeholder="Cidade" className={fieldClass} />
          </div>
          {error ? <p className="text-xs text-[#b42318]">{error}</p> : null}
          <button type="submit" className="w-full rounded-md bg-[#128c7e] px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white">
            Enviar entrega
          </button>
        </form>
      ) : null}

      <div className="flex items-center justify-between gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 py-2">
        {session.step === 'confirmed' ? (
          <button type="button" onClick={() => setPanel('merchant')} className="text-xs font-medium text-[#027eb5]">
            Ver pedido na tela do lojista
          </button>
        ) : (
          <button
            type="button"
            onClick={simulatePayment}
            disabled={!canSimulate}
            className="rounded-md bg-[#25d366] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#111b21] disabled:opacity-40"
          >
            Simular Pagamento Aprovado
          </button>
        )}
      </div>
    </div>
  )
}
