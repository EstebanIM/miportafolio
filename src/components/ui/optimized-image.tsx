'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useImageHooks'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const isInView = useIntersectionObserver(imgRef, 0.1, '100px')

  // Placeholder simple para fallback
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Solo cargar la imagen cuando esté en vista (a menos que sea prioritaria)
  const shouldLoad = priority || isInView

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        fill && 'w-full h-full',
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      {shouldLoad && !hasError ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down'
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : hasError ? (
        // Fallback para errores
        <div
          className={cn(
            'flex items-center justify-center bg-gray-100 dark:bg-gray-800',
            'text-gray-400 dark:text-gray-600 text-sm',
            fill ? 'w-full h-full' : ''
          )}
          style={!fill ? { width, height } : undefined}
        >
          <span>🖼️ Error al cargar imagen</span>
        </div>
      ) : (
        // Skeleton loader mientras no esté en vista
        <div
          className={cn(
            'animate-pulse bg-gray-200 dark:bg-gray-700',
            fill ? 'w-full h-full' : ''
          )}
          style={!fill ? { width, height } : undefined}
        />
      )}
    </div>
  )
}

// Componente especializado para avatares
export function Avatar({
  src,
  alt,
  size = 64,
  className,
  fallback,
}: {
  src: string
  alt: string
  size?: number
  className?: string
  fallback?: string
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full', className)}
      priority
      objectFit="cover"
      placeholder="blur"
      sizes={`${size}px`}
      onError={() => {
        if (fallback) {
          // Implementar fallback de avatar si es necesario
        }
      }}
    />
  )
}

// Componente para hero/banner images
export function HeroImage({
  src,
  alt,
  className,
  children,
}: {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('relative w-full h-screen', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        objectFit="cover"
        sizes="100vw"
        quality={90}
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
