import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

// Función para generar placeholder blur data URL
export async function getImageWithPlaceholder(imagePath: string) {
  try {
    // Intentar leer el archivo desde public
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const file = await fs.readFile(fullPath)
    
    const { base64, metadata } = await getPlaiceholder(file)
    
    return {
      src: imagePath,
      placeholder: base64,
      width: metadata.width,
      height: metadata.height,
    }
  } catch (error) {
    console.warn(`Failed to generate placeholder for ${imagePath}:`, error)
    
    // Fallback: placeholder simple
    return {
      src: imagePath,
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
      width: 1,
      height: 1,
    }
  }
}

// Función para optimizar rutas de imágenes comunes
export function getOptimizedImageProps(src: string, alt: string, options: {
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
} = {}) {
  const {
    width = 800,
    height = 600,
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  } = options

  return {
    src,
    alt,
    width,
    height,
    priority,
    sizes,
    quality: 85,
    placeholder: 'blur' as const,
    style: {
      width: '100%',
      height: 'auto',
    },
  }
}

// Configuración de tamaños responsivos comunes
export const imageSizes = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 1200,
  xlarge: 1920,
}

// Función para generar srcSet manualmente si es necesario
export function generateSrcSet(basePath: string, sizes: number[]) {
  return sizes
    .map(size => `${basePath}?w=${size} ${size}w`)
    .join(', ')
}

// Utilidad para detectar formato de imagen óptimo
export function getOptimalFormat(userAgent?: string): 'avif' | 'webp' | 'jpg' {
  if (!userAgent) return 'webp'
  
  // Detectar soporte para AVIF (Chrome 85+, Firefox 93+)
  if (userAgent.includes('Chrome') && 
      parseInt(userAgent.match(/Chrome\/(\d+)/)?.[1] || '0') >= 85) {
    return 'avif'
  }
  
  // Detectar soporte para WebP (Chrome 23+, Firefox 65+, Safari 14+)
  if (userAgent.includes('Chrome') || 
      userAgent.includes('Firefox') || 
      userAgent.includes('Safari')) {
    return 'webp'
  }
  
  return 'jpg'
}

// Función para pre-cargar imágenes críticas
export function preloadImage(src: string, as: 'image' = 'image') {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = src
  document.head.appendChild(link)
}

// Hook para lazy loading de imágenes
export function preloadCriticalImages(images: string[]) {
  if (typeof window === 'undefined') return

  images.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}
