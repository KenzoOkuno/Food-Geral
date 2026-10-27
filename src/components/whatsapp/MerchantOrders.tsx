'use client'

import { useWhatsappBot } from '@/hooks/useWhatsappBot'
import { formatCurrency } from '@/lib/utils'

export function MerchantOrders() {
  const { orders, setPanel } = useWhatsappBot()

  if (orders.length === 0) {
    return (
      <div className="flex h-full flex-col justify-between bg-[#f7f8fa] p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#667781]">Tela do lojista</p>
          <p className="mt-3 text-sm leading-relaxed text-[#111b21]">
            Nenhum pedido confirmado ainda. O pedido aparece aqui depois do pagamento simulado.
          </p>
        </div>
        <button type="button" onClick={() => setPanel('chat')} className="text-left text-xs font-medium text-[#027eb5]">
          Voltar ao chat
        </button>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-[#f7f8fa] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#667781]">Tela do lojista</p>
      <ul className="mt-3 space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="rounded-lg border border-black/10 bg-white p-3 text-sm text-[#111b21]">
            <p className="text-sm leading-relaxed">
              Pagamento recebido com sucesso! Seu pedido foi confirmado e já está em separação.
            </p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <p className="font-medium">{order.id}</p>
              <span className="rounded-full bg-[#d9fdd3] px-2 py-1 text-[10px] uppercase tracking-[0.12em]">
                Em separação
              </span>
            </div>
            <ul className="mt-3 space-y-1 text-xs leading-relaxed">
              {order.payload.lines.map((line) => (
                <li key={`${line.productId}-${line.size}-${line.color}`}>
                  {line.quantity}× {line.name} · {line.color} · Tam {line.size}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm tabular-nums">{formatCurrency(order.payload.total)}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#667781]">
              {order.delivery
                ? `${order.delivery.name} · ${order.delivery.street}, ${order.delivery.number} — ${order.delivery.neighborhood}, ${order.delivery.city} · CEP ${order.delivery.cep}`
                : 'Endereço ainda não informado'}
            </p>
            <p className="mt-2 break-all font-mono text-[10px] text-[#667781]">Pix mock {order.pixTxid}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
