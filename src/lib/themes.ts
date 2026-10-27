import type { Theme, ThemeId } from '@/types'

export const THEME_STORAGE_KEY = 'foodgeral-theme'

const bodyFont = 'var(--font-montserrat), Montserrat, sans-serif'
const headingFont = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'

export const themes: Record<ThemeId, Theme> = {
  valencaConfeitaria: {
    id: 'valencaConfeitaria',
    name: 'Valença Confeitaria Artesanal',
    logo: 'Valença',
    profileImage: '/brands/valenca-perfil.jpg',
    tagline: 'Bolos e doces personalizados',
    credit: 'Desde 2019',
    instagram: '@valencaconfeitariaartesanal',
    followers: 2116,
    following: 1202,
    whatsapp: '5512999990000',
    delivery: 'Peça já seu orçamento',
    address: 'São José dos Campos — SP',
    landmark: 'Bolo, doces finos e personalizados',
    since: '2019',
    hours: 'Orçamentos sob consulta',
    style: 'Vinho e branco',
    radius: '14px',
    fonts: {
      heading: headingFont,
      body: bodyFont,
    },
    colors: {
      primary: '#6b1e2e',
      accent: '#8f2f42',
      background: '#fffbfa',
      backgroundAlt: '#f8eef0',
      text: '#2a1218',
      textMuted: '#7a5560',
      border: '#ead5da',
      surface: '#ffffff',
      onPrimary: '#fffbfa',
    },
  },
  lubonConfeitaria: {
    id: 'lubonConfeitaria',
    name: 'Lucivane Bon Confeitaria',
    logo: 'LuBon',
    profileImage: '/brands/lubon-perfil.jpg',
    tagline: 'Sabor e carinho em cada detalhe',
    credit: '100% artesanal',
    instagram: '@lubonconfeitaria',
    followers: 2646,
    following: 2061,
    whatsapp: '5512999990001',
    delivery: 'Faça sua encomenda',
    address: 'Jardim Morumbi — SJC/SP',
    landmark: 'Bolos personalizados & doces 100% artesanais',
    hours: 'Encomendas sob consulta',
    style: 'Vermelho e branco',
    radius: '12px',
    fonts: {
      heading: headingFont,
      body: bodyFont,
    },
    colors: {
      /* Marca: vermelho + branco */
      primary: '#c4122f',
      accent: '#e11d3a',
      background: '#ffffff',
      backgroundAlt: '#fff1f3',
      text: '#1a0a0c',
      textMuted: '#7a4a52',
      border: '#f3d0d6',
      surface: '#ffffff',
      onPrimary: '#ffffff',
    },
  },
}

export const themeList: Theme[] = [themes.valencaConfeitaria, themes.lubonConfeitaria]

export function getThemeCssVars(theme: Theme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-bg-alt': theme.colors.backgroundAlt,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-border': theme.colors.border,
    '--color-surface': theme.colors.surface,
    '--color-on-primary': theme.colors.onPrimary ?? '#ffffff',
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
    '--radius': theme.radius,
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme.id
  const vars = getThemeCssVars(theme)
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
}

export function themeBootScript() {
  const map = Object.fromEntries(themeList.map((theme) => [theme.id, getThemeCssVars(theme)]))
  return `try{var m=${JSON.stringify(map)};var id=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||"valencaConfeitaria";var v=m[id]||m.valencaConfeitaria;var d=document.documentElement;d.dataset.theme=m[id]?id:"valencaConfeitaria";for(var k in v){if(Object.prototype.hasOwnProperty.call(v,k)){d.style.setProperty(k,v[k]);}}}catch(e){}`
}
