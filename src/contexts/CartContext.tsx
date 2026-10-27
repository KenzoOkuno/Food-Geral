'use client'

import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import { getProductById } from '@/lib/products'
import { cartItemKey, getShipping } from '@/lib/utils'
import type { CartItem } from '@/types'

export const CART_STORAGE_KEY = 'foodgeral-cart'

export interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (item: Pick<CartItem, 'productId' | 'size' | 'color'>) => void
  updateQuantity: (item: Pick<CartItem, 'productId' | 'size' | 'color'>, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  shipping: number
  total: number
}

export const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item?.productId && item.quantity > 0 && item.size && item.color)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setItems(readCart())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, ready])

  const addItem: CartContextValue['addItem'] = (item) => {
    const quantity = item.quantity ?? 1
    setItems((current) => {
      const key = cartItemKey(item)
      const index = current.findIndex((entry) => cartItemKey(entry) === key)
      if (index >= 0) {
        const next = [...current]
        next[index] = {
          ...next[index],
          quantity: Math.min(10, next[index].quantity + quantity),
        }
        return next
      }
      return [...current, { productId: item.productId, size: item.size, color: item.color, quantity }]
    })
    toast.success('Peça adicionada ao carrinho')
  }

  const removeItem: CartContextValue['removeItem'] = (item) => {
    const key = cartItemKey(item)
    setItems((current) => current.filter((entry) => cartItemKey(entry) !== key))
  }

  const updateQuantity: CartContextValue['updateQuantity'] = (item, quantity) => {
    if (quantity < 1) {
      removeItem(item)
      return
    }
    const key = cartItemKey(item)
    setItems((current) =>
      current.map((entry) =>
        cartItemKey(entry) === key ? { ...entry, quantity: Math.min(10, quantity) } : entry,
      ),
    )
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId)
        if (!product) return sum
        return sum + product.price * item.quantity
      }, 0),
    [items],
  )

  const shipping = getShipping(subtotal)
  const total = subtotal + shipping
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, shipping, total }}
    >
      {children}
    </CartContext.Provider>
  )
}
