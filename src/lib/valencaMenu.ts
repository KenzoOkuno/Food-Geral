import { valencaPromoImages, valencaTextures } from '@/lib/valencaLook'
import type { Category, Product } from '@/types'

const lines = ['bolos', 'doces', 'tortas', 'personalizados'] as const

export function isConfeitariaCategory(value: string): value is Category {
  return (lines as readonly string[]).includes(value)
}

export const valencaOptions: {
  id: Category
  label: string
  description: string
  image: string
}[] = [
  {
    id: 'bolos',
    label: 'Bolos',
    description: 'Bolos artesanais para festas, casamentos e celebrações.',
    image: valencaPromoImages.bolos,
  },
  {
    id: 'doces',
    label: 'Doces finos',
    description: 'Brigadeiros, trufas, bem-casados e doces personalizados.',
    image: valencaPromoImages.doces,
  },
  {
    id: 'tortas',
    label: 'Tortas',
    description: 'Tortas cremosas e com frutas para o dia a dia ou a festa.',
    image: valencaPromoImages.tortas,
  },
  {
    id: 'personalizados',
    label: 'Personalizados',
    description: 'Temas, cores e sabores sob medida para o seu evento.',
    image: valencaPromoImages.personalizados,
  },
]

const porcoesBolo = ['1 kg', '1,5 kg', '2 kg', '3 kg']
const porcoesDoce = ['25 un', '50 un', '100 un']
const porcoesTorta = ['Fatia', 'Inteira P', 'Inteira M', 'Inteira G']

export const valencaProducts: Product[] = [
  {
    id: 'bolo-casamento-floral',
    slug: 'bolo-casamento-floral',
    name: 'Bolo casamento floral',
    price: 480,
    originalPrice: 480,
    category: 'bolos',
    images: [valencaTextures.boloCasamento, valencaTextures.boloRosa],
    sizes: porcoesBolo,
    colors: [
      { name: 'Branco e rosa', hex: '#f5d6de' },
      { name: 'Off-white', hex: '#f4efe8' },
    ],
    tags: ['bestseller'],
    rating: 5,
    inStock: true,
    description:
      'Bolo de casamento com flores comestíveis e cobertura aveludada. Personalizamos sabor, andares e detalhes do tema.',
  },
  {
    id: 'bolo-chocolate-belga',
    slug: 'bolo-chocolate-belga',
    name: 'Bolo chocolate belga',
    price: 220,
    originalPrice: 260,
    category: 'bolos',
    images: [valencaTextures.boloChocolate, valencaTextures.boloNaked],
    sizes: porcoesBolo,
    colors: [
      { name: 'Chocolate', hex: '#3b2416' },
      { name: 'Meio amargo', hex: '#2a1810' },
    ],
    tags: ['novo'],
    rating: 4.9,
    inStock: true,
    description:
      'Massa úmida de chocolate belga com ganache intensa. Ideal para aniversários e mesas de festa.',
  },
  {
    id: 'bolo-naked-frutas',
    slug: 'bolo-naked-frutas',
    name: 'Naked cake de frutas',
    price: 280,
    originalPrice: 280,
    category: 'bolos',
    images: [valencaTextures.boloNaked, valencaTextures.tortaFrutas],
    sizes: porcoesBolo,
    colors: [
      { name: 'Frutas vermelhas', hex: '#8b1e3f' },
      { name: 'Morango', hex: '#c23b4a' },
    ],
    tags: ['bestseller'],
    rating: 4.9,
    inStock: true,
    description:
      'Camadas aparentes, creme leve e frutas frescas. Visual rústico-elegante para eventos ao ar livre.',
  },
  {
    id: 'caixa-brigadeiros',
    slug: 'caixa-brigadeiros',
    name: 'Caixa de brigadeiros gourmet',
    price: 95,
    originalPrice: 110,
    category: 'doces',
    images: [valencaTextures.brigadeiros, valencaTextures.trufas],
    sizes: porcoesDoce,
    colors: [
      { name: 'Tradicional', hex: '#4a2c1a' },
      { name: 'Belga', hex: '#2f1b12' },
      { name: 'Ninho', hex: '#f0e6d8' },
    ],
    tags: ['bestseller'],
    rating: 5,
    inStock: true,
    description:
      'Brigadeiros gourmet com cobertura crocante e recheios especiais. Embalagem pronta para presentear.',
  },
  {
    id: 'doces-finos-misto',
    slug: 'doces-finos-misto',
    name: 'Seleção de doces finos',
    price: 180,
    originalPrice: 180,
    category: 'doces',
    images: [valencaTextures.docesFinos, valencaTextures.macarons],
    sizes: porcoesDoce,
    colors: [
      { name: 'Misto', hex: '#c9a96e' },
      { name: 'Vinho e branco', hex: '#6b1e2e' },
    ],
    tags: ['novo'],
    rating: 4.8,
    inStock: true,
    description:
      'Mix de doces finos em tons da festa. Ideal para mesa de doces e lembrancinhas.',
  },
  {
    id: 'bem-casados',
    slug: 'bem-casados',
    name: 'Bem-casados artesanais',
    price: 120,
    originalPrice: 120,
    category: 'doces',
    images: [valencaTextures.bemCasados, valencaTextures.docesFinos],
    sizes: porcoesDoce,
    colors: [
      { name: 'Doce de leite', hex: '#c49a6c' },
      { name: 'Chocolate', hex: '#3b2416' },
    ],
    tags: [],
    rating: 4.9,
    inStock: true,
    description:
      'Bem-casados macios, recheados e embalados com laço. Clássico de casamento com toque artesanal.',
  },
  {
    id: 'cupcakes-festa',
    slug: 'cupcakes-festa',
    name: 'Cupcakes de festa',
    price: 140,
    originalPrice: 140,
    category: 'doces',
    images: [valencaTextures.cupcakes, valencaTextures.macarons],
    sizes: porcoesDoce,
    colors: [
      { name: 'Rosa', hex: '#e8a0b0' },
      { name: 'Vinho', hex: '#6b1e2e' },
      { name: 'Branco', hex: '#f7f2ee' },
    ],
    tags: ['novo'],
    rating: 4.7,
    inStock: true,
    description:
      'Cupcakes fofinhos com buttercream decorado. Personalizamos cores e toppers do tema.',
  },
  {
    id: 'torta-frutas-vermelhas',
    slug: 'torta-frutas-vermelhas',
    name: 'Torta de frutas vermelhas',
    price: 160,
    originalPrice: 160,
    category: 'tortas',
    images: [valencaTextures.tortaFrutas, valencaTextures.boloRosa],
    sizes: porcoesTorta,
    colors: [
      { name: 'Frutas vermelhas', hex: '#8b1e3f' },
      { name: 'Morango', hex: '#c23b4a' },
    ],
    tags: ['bestseller'],
    rating: 4.9,
    inStock: true,
    description:
      'Base crocante, creme de baunilha e frutas vermelhas frescas. Equilíbrio entre ácida e doce.',
  },
  {
    id: 'torta-chocolate',
    slug: 'torta-chocolate',
    name: 'Torta cremosa de chocolate',
    price: 150,
    originalPrice: 150,
    category: 'tortas',
    images: [valencaTextures.trufas, valencaTextures.boloChocolate],
    sizes: porcoesTorta,
    colors: [
      { name: 'Chocolate', hex: '#3b2416' },
      { name: 'Belga', hex: '#2a1810' },
    ],
    tags: [],
    rating: 4.8,
    inStock: true,
    description:
      'Torta cremosa com ganache espelhada. Para quem quer chocolate intenso sem pesar no evento.',
  },
  {
    id: 'mesa-doce-completa',
    slug: 'mesa-doce-completa',
    name: 'Mesa de doces completa',
    price: 890,
    originalPrice: 990,
    category: 'personalizados',
    images: [valencaTextures.mesaFesta, valencaTextures.docesFinos],
    sizes: ['Pequena', 'Média', 'Grande'],
    colors: [
      { name: 'Vinho e branco', hex: '#6b1e2e' },
      { name: 'Rosa e off-white', hex: '#f5d6de' },
      { name: 'Dourado', hex: '#c9a96e' },
    ],
    tags: ['bestseller'],
    rating: 5,
    inStock: true,
    description:
      'Montagem completa: bolo, doces finos e composição visual. Orçamento sob medida para o seu evento.',
  },
  {
    id: 'kit-festa-personalizado',
    slug: 'kit-festa-personalizado',
    name: 'Kit festa personalizado',
    price: 420,
    originalPrice: 420,
    category: 'personalizados',
    images: [valencaTextures.boloRosa, valencaTextures.cupcakes],
    sizes: ['Básico', 'Completo', 'Premium'],
    colors: [
      { name: 'Tema livre', hex: '#6b1e2e' },
      { name: 'Infantil', hex: '#e8a0b0' },
      { name: 'Adulto elegante', hex: '#3b2416' },
    ],
    tags: ['novo'],
    rating: 4.9,
    inStock: true,
    description:
      'Bolo + doces no mesmo tema e paleta. Enviamos sugestões de sabores e apresentação antes de produzir.',
  },
]
