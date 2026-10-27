import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Providers } from '@/components/layout/Providers'
import { themeBootScript } from '@/lib/themes'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Food-Geral',
    template: '%s · Food-Geral',
  },
  description:
    'Bolos e doces personalizados em São José dos Campos. Transforme seu evento em uma experiência inesquecível. Peça já seu orçamento.',
  openGraph: {
    locale: 'pt_BR',
    type: 'website',
    title: 'Food-Geral',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript() }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var a=localStorage.getItem("foodgeral-audience");var d=document.documentElement;if(a==="confeitaria"||!a){d.dataset.audience="confeitaria";}}catch(e){}`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
