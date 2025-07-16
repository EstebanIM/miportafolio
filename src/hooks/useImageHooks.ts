'use client'

import { useState, useEffect } from 'react'

// Hook para lazy loading de imágenes
export function useLazyImage(src: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    
    img.onload = () => {
      setIsLoaded(true)
      setError(null)
    }
    
    img.onerror = () => {
      setError('Failed to load image')
      setIsLoaded(false)
    }
    
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { isLoaded, error }
}

// Hook para intersection observer (lazy loading)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef, threshold, rootMargin])

  return isIntersecting
}

// Hook para preload de imágenes críticas
export function useImagePreload(sources: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    sources.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [sources])
}
