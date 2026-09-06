// components/ui/SimpleImage.tsx
'use client'

interface SimpleImageProps {
  src: string
  alt: string
  className?: string
}

export function SimpleImage({ src, alt, className = '' }: SimpleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = '/curso-placeholder.jpg'
      }}
    />
  )
}