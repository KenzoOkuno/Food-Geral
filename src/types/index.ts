export type ThemeId = 'valencaConfeitaria' | 'lubonConfeitaria'

export type AppMode = 'store' | 'landing'

export type Audience = 'geral' | 'confeitaria'

export type Category = 'bolos' | 'doces' | 'tortas' | 'personalizados'

export interface ThemeColors {
  primary: string
  accent: string
  background: string
  backgroundAlt: string
  text: string
  textMuted: string
  border: string
  surface: string
  onPrimary?: string
}

export interface Theme {
  id: ThemeId
  name: string
  logo: string
  logoImage?: string
  profileImage?: string
  tagline?: string
  credit?: string
  instagram?: string
  followers?: number
  following?: number
  whatsapp?: string
  delivery?: string
  address?: string
  landmark?: string
  hours?: string
  phone?: string
  phoneHref?: string
  since?: string
  style: string
  colors: ThemeColors
  fonts: {
    heading: string
    body: string
  }
  radius: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  category: Category
  images: string[]
  sizes: string[]
  colors: ProductColor[]
  tags: string[]
  rating: number
  inStock: boolean
  description: string
}

export interface CartItem {
  productId: string
  quantity: number
  size: string
  color: string
}
