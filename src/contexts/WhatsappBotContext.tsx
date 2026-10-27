'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import {
  approvePayment,
  createBotSession,
  receiveCart,
  submitDelivery,
  toShopOrder,
  type BotSession,
  type DeliveryData,
  type ShopOrder,
} from '@/lib/whatsapp/botStateMachine'
import type { CheckoutPayload } from '@/lib/whatsapp/checkoutHelper'

type Panel = 'chat' | 'merchant'

export interface WhatsappBotContextValue {
  session: BotSession
  orders: ShopOrder[]
  chatOpen: boolean
  cartOpen: boolean
  panel: Panel
  openChat: () => void
  closeChat: () => void
  openCart: () => void
  closeCart: () => void
  setPanel: (panel: Panel) => void
  submitCart: (payload: CheckoutPayload) => void
  saveDelivery: (delivery: DeliveryData) => void
  simulatePayment: () => void
}

export const WhatsappBotContext = createContext<WhatsappBotContextValue | null>(null)

export function WhatsappBotProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<BotSession>(createBotSession)
  const [orders, setOrders] = useState<ShopOrder[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [panel, setPanel] = useState<Panel>('chat')

  const submitCart = (payload: CheckoutPayload) => {
    setSession(receiveCart(payload))
    setPanel('chat')
    setCartOpen(false)
    setChatOpen(true)
  }

  useEffect(() => {
    const order = toShopOrder(session)
    if (!order) return
    setOrders((list) => {
      const index = list.findIndex((item) => item.id === order.id)
      if (index === -1) return [order, ...list]
      return list.map((item) => (item.id === order.id ? order : item))
    })
  }, [session])

  const saveDelivery = (delivery: DeliveryData) => {
    setSession((current) => submitDelivery(current, delivery))
  }

  const simulatePayment = () => {
    setSession((current) => approvePayment(current))
    setPanel('merchant')
    setChatOpen(true)
  }

  return (
    <WhatsappBotContext.Provider
      value={{
        session,
        orders,
        chatOpen,
        cartOpen,
        panel,
        openChat: () => setChatOpen(true),
        closeChat: () => setChatOpen(false),
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        setPanel,
        submitCart,
        saveDelivery,
        simulatePayment,
      }}
    >
      {children}
    </WhatsappBotContext.Provider>
  )
}
