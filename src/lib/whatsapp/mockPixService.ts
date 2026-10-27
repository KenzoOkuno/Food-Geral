export interface MockPix {
  copiaECola: string
  qrDataUrl: string
  txid: string
  amount: number
}

const QR_SIZE = 25

function fnv(text: string) {
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

function inFinder(x: number, y: number) {
  const box = (originX: number, originY: number) =>
    x >= originX && x < originX + 8 && y >= originY && y < originY + 8
  return box(0, 0) || box(QR_SIZE - 8, 0) || box(0, QR_SIZE - 8)
}

function paintFinder(matrix: number[][], originX: number, originY: number) {
  for (let y = 0; y < 7; y += 1) {
    for (let x = 0; x < 7; x += 1) {
      const edge = x === 0 || y === 0 || x === 6 || y === 6
      const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
      matrix[originY + y][originX + x] = edge || core ? 1 : 0
    }
  }
}

export function buildMockQrMatrix(seed: string) {
  const matrix = Array.from({ length: QR_SIZE }, () => Array(QR_SIZE).fill(0))
  paintFinder(matrix, 0, 0)
  paintFinder(matrix, QR_SIZE - 7, 0)
  paintFinder(matrix, 0, QR_SIZE - 7)

  let bit = 0
  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (inFinder(x, y)) continue
      const source = seed.charCodeAt(bit % seed.length) + x * 13 + y * 7
      matrix[y][x] = source % 3 === 0 ? 1 : 0
      bit += 1
    }
  }

  return matrix
}

export function renderMockQr(matrix: number[][]) {
  if (typeof document === 'undefined') return ''
  const scale = 8
  const quiet = 2
  const canvas = document.createElement('canvas')
  canvas.width = (matrix.length + quiet * 2) * scale
  canvas.height = canvas.width
  const context = canvas.getContext('2d')
  if (!context) return ''

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#111111'
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) return
      context.fillRect((x + quiet) * scale, (y + quiet) * scale, scale, scale)
    })
  })

  return canvas.toDataURL('image/png')
}

export function generateMockPix(input: { amount: number; reference: string }): MockPix {
  const amount = Math.max(0, input.amount)
  const txid = fnv(`${input.reference}:${amount.toFixed(2)}:${Date.now()}`)
  const amountField = amount.toFixed(2)
  const copiaECola = [
    '000201',
    '26580014BR.GOV.BCB.PIX',
    `0136mock${txid}modageral`,
    '52040000',
    '5303986',
    `54${String(amountField.length).padStart(2, '0')}${amountField}`,
    '5802BR',
    '5913MODAGERALMOCK',
    '6009SAO PAULO',
    '62070503***',
    `6304${fnv(txid).slice(0, 4).toUpperCase()}`,
  ].join('')

  return {
    copiaECola,
    qrDataUrl: renderMockQr(buildMockQrMatrix(copiaECola)),
    txid,
    amount,
  }
}
