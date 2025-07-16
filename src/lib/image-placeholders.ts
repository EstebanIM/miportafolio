import { getImageWithPlaceholder } from '@/lib/image-utils'

// Configuración de imágenes estáticas que necesitan placeholders
const STATIC_IMAGES = [
  '/rludios.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/favicon-dark.svg'
]

// Esta función se ejecuta en build time para generar placeholders
export async function generateImagePlaceholders() {
  const placeholders: Record<string, {
    src: string
    placeholder: string
    width: number
    height: number
  }> = {}

  for (const imagePath of STATIC_IMAGES) {
    try {
      const imageData = await getImageWithPlaceholder(imagePath)
      placeholders[imagePath] = imageData
    } catch (error) {
      console.warn(`Failed to generate placeholder for ${imagePath}:`, error)
    }
  }

  return placeholders
}

// Placeholders pre-generados (se actualizarían en build time)
export const IMAGE_PLACEHOLDERS = {
  '/rludios.png': {
    src: '/rludios.png',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
    width: 200,
    height: 200,
  }
} as const

// Función helper para obtener placeholder de una imagen
export function getImagePlaceholder(src: string) {
  return IMAGE_PLACEHOLDERS[src as keyof typeof IMAGE_PLACEHOLDERS] || {
    src,
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
    width: 1,
    height: 1,
  }
}
