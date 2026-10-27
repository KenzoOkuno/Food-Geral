/**
 * Imagens de confeitaria — IDs Unsplash verificados (HTTP 200).
 */

function shot(id: string, width = 1280) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`
}

/** Bolo de chocolate — hero da loja. */
export const valencaHeroImage = shot('photo-1578985545062-69928b1d9587')

/** Mesa / bolo floral — landing. */
export const valencaLandingImage = shot('photo-1464349095431-e9a21285b5f3')

export const valencaTextures = {
  boloChocolate: shot('photo-1578985545062-69928b1d9587', 1200),
  boloCasamento: shot('photo-1621303837174-89787a7d4729', 1200),
  boloRosa: shot('photo-1464349095431-e9a21285b5f3', 1200),
  macarons: shot('photo-1586985289688-ca3cf47d3e6e', 1200),
  brigadeiros: shot('photo-1606313564200-e75d5e30476c', 1200),
  cupcakes: shot('photo-1603532648955-039310d9ed75', 1200),
  tortaFrutas: shot('photo-1565958011703-44f9829ba187', 1200),
  docesFinos: shot('photo-1488477181946-6428a0291777', 1200),
  mesaFesta: shot('photo-1558636508-e0db3814bd1d', 1200),
  boloNaked: shot('photo-1563729784474-d77dbb933a9e', 1200),
  bemCasados: shot('photo-1557925923-cd4648e211a0', 1200),
  trufas: shot('photo-1606890737304-57a1ca8a5b62', 1200),
  fatia: shot('photo-1588195538326-c5b1e9f80a1b', 1200),
  cookies: shot('photo-1499636136210-6f4ee915583e', 1200),
}

export const valencaPromoImages = {
  bolos: valencaTextures.boloCasamento,
  doces: valencaTextures.docesFinos,
  tortas: valencaTextures.tortaFrutas,
  personalizados: valencaTextures.mesaFesta,
}

export const valencaAudiencePromos = [
  {
    image: valencaTextures.boloCasamento,
    eyebrow: 'Bolos',
    title: 'O bolo que vira memória',
    subtitle: 'Camadas artesanais, cobertura impecável e o sabor que fecha o evento.',
  },
  {
    image: valencaTextures.docesFinos,
    eyebrow: 'Doces finos',
    title: 'Doces que pedem segunda mordida',
    subtitle: 'Brigadeiros, trufas e finos personalizados para a sua mesa.',
  },
  {
    image: valencaTextures.mesaFesta,
    eyebrow: 'Eventos',
    title: 'Transforme o evento em experiência',
    subtitle: 'Desde 2019 em São José dos Campos. Peça já seu orçamento.',
  },
]
