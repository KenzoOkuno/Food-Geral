'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LandingHome } from '@/components/sections/LandingHome'
import { StoreHome } from '@/components/sections/StoreHome'
import { useMode } from '@/hooks/useMode'
import type { Category, Product } from '@/types'

export function HomeSwitcher({
  products,
  category,
}: {
  products: Product[]
  category: Category | null
}) {
  const { mode } = useMode()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {mode === 'landing' ? <LandingHome /> : <StoreHome products={products} category={category} />}
      </motion.div>
    </AnimatePresence>
  )
}
