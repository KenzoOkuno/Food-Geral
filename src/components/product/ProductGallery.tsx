'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ProductGallery({
  images,
  name,
  wide = false,
  square = false,
}: {
  images: string[]
  name: string
  wide?: boolean
  square?: boolean
}) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIndex(0)
    setLoaded(false)
  }, [name])

  return (
    <div>
      <div
        className={cn(
          'relative overflow-hidden rounded-theme bg-bg-alt',
          square ? 'aspect-square' : wide ? 'aspect-[4/3]' : 'aspect-[3/4]',
        )}
      >
        {!loaded ? <div className="absolute inset-0 animate-pulse bg-bg-alt" /> : null}
        <Image
          src={images[index]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          onLoad={() => setLoaded(true)}
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setLoaded(false)
                setIndex(imageIndex)
              }}
              className={cn(
                'relative aspect-[3/4] overflow-hidden rounded-theme border',
                imageIndex === index ? 'border-primary' : 'border-transparent',
              )}
              aria-label={`Ver imagem ${imageIndex + 1} de ${name}`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
