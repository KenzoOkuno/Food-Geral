import { isConfeitariaCategory, valencaOptions, valencaProducts } from '@/lib/valencaMenu'
import { applyTheme, THEME_STORAGE_KEY, themes } from '@/lib/themes'
import type { Audience, Category, Product, ThemeId } from '@/types'

export const AUDIENCE_STORAGE_KEY = 'foodgeral-audience'

export function isConfeitariaTheme(themeId?: ThemeId) {
  return themeId === 'valencaConfeitaria' || themeId === 'lubonConfeitaria'
}

export function themeHomeCopy(themeId: ThemeId) {
  if (themeId === 'lubonConfeitaria') {
    return {
      eyebrow: 'Jardim Morumbi · SJC/SP',
      title: 'Sabor e carinho em cada detalhe',
      subtitle: 'Bolos personalizados e doces 100% artesanais. Faça sua encomenda.',
      quote: 'Doce feito à mão — o detalhe que a festa lembra.',
      landingTitle: 'Bolos personalizados & doces artesanais',
      landingSubtitle: 'Lucivane Bon Confeitaria. Encomende e leve carinho para a mesa.',
      cta: 'Faça sua encomenda',
    }
  }
  return {
    eyebrow: 'São José dos Campos · Desde 2019',
    title: 'Transforme seu evento em uma experiência inesquecível',
    subtitle: 'Bolos, doces finos e personalizados. Peça já seu orçamento.',
    quote: 'Cada fatia carrega carinho — e vontade de pedir de novo.',
    landingTitle: 'Bolos e doces que transformam o evento',
    landingSubtitle: 'Confeitaria artesanal. Peça já seu orçamento e monte uma mesa inesquecível.',
    cta: 'Pedir orçamento',
  }
}

export function isConfeitariaExperience(audience: Audience, themeId?: ThemeId) {
  return audience === 'confeitaria' || isConfeitariaTheme(themeId)
}

export function applyAudienceLook() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const audience = localStorage.getItem(AUDIENCE_STORAGE_KEY)
  const themeId = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
  const theme = themeId && themes[themeId] ? themes[themeId] : themes.valencaConfeitaria
  applyTheme(theme)
  root.dataset.audience = audience === 'confeitaria' ? 'confeitaria' : 'geral'
}

export function categoriesFor(_audience: Audience, _themeId?: ThemeId) {
  return valencaOptions
}

export function allowsCategory(category: Category | null, _audience: Audience, _themeId?: ThemeId) {
  if (!category) return true
  return isConfeitariaCategory(category)
}

export function productsForAudience(list: Product[], _audience: Audience, _themeId?: ThemeId) {
  const sweets = list.filter((product) => isConfeitariaCategory(product.category))
  return sweets.length > 0 ? sweets : valencaProducts
}

export function displayTagline(tagline: string | undefined, _themeId: ThemeId, audience: Audience) {
  if (audience === 'confeitaria') return tagline ?? 'Bolos e doces personalizados'
  return tagline
}

export function confeitariaStoreCopy<T extends { eyebrow: string; title: string; subtitle: string; quote: string }>(
  copy: T,
): T {
  return {
    ...copy,
    eyebrow: 'São José dos Campos',
    title: 'Transforme seu evento em uma experiência inesquecível',
    subtitle: 'Bolos, doces finos e personalizados. Desde 2019.',
    quote: 'Cada fatia carrega carinho — e vontade de pedir de novo.',
  }
}

export function confeitariaLandingCopy<T extends { eyebrow: string; title: string; subtitle: string }>(copy: T): T {
  return {
    ...copy,
    eyebrow: 'Confeitaria artesanal',
    title: 'Bolos e doces que fazem pedir orçamento',
    subtitle: 'Peça já seu orçamento e monte a mesa do seu evento.',
  }
}
