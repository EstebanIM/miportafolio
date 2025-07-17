import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'
import { useCallback } from 'react'

// Tipos globales para gtag
declare global {
  function gtag(...args: any[]): void
}

// Configuración de umbrales para Web Vitals
const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 }, // INP reemplaza a FID en v5
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 }
}

// Función para determinar el rating de una métrica
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Función para enviar métricas a analytics
function sendToAnalytics(metric: Metric) {
  const { name, value, id, delta } = metric
  const rating = getRating(name, value)

  // Log detallado en consola (desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 Web Vitals - ${name}`)
    console.log(`Value: ${value.toFixed(2)}${name === 'CLS' ? '' : 'ms'}`)
    console.log(`Rating: ${rating}`)
    console.log(`Delta: ${delta.toFixed(2)}`)
    console.log(`ID: ${id}`)
    console.groupEnd()
  }

  // Envío a analytics (solo en producción)
  if (process.env.NODE_ENV === 'production') {
    // Envío a Google Analytics 4 (si está configurado)
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
        metric_rating: rating,
      })
    }

    // Envío a endpoint personalizado de analytics
    sendToCustomAnalytics({
      name,
      value,
      id,
      delta,
      rating,
      url: window.location.href,
      timestamp: Date.now(),
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      userAgent: navigator.userAgent
    })
  }
}

// Función para enviar a endpoint personalizado
async function sendToCustomAnalytics(data: any) {
  try {
    // En este caso, simulamos con un console.log estructurado
    // En producción real, esto sería un fetch a tu endpoint de analytics
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true
      })
    } else {
      // Fallback: localStorage para persistir métricas localmente
      const vitalsData = JSON.parse(localStorage.getItem('web-vitals') || '[]')
      vitalsData.push(data)
      
      // Mantener solo las últimas 50 métricas
      if (vitalsData.length > 50) {
        vitalsData.splice(0, vitalsData.length - 50)
      }
      
      localStorage.setItem('web-vitals', JSON.stringify(vitalsData))
    }
  } catch (error) {
    console.warn('Failed to send analytics:', error)
  }
}

// Función principal para inicializar Web Vitals
export function initWebVitals() {
  if (typeof window === 'undefined') return

  // Configurar todas las métricas
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics) // INP reemplaza a FID en v5
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)

  // Log inicial
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Web Vitals monitoring initialized')
  }
}

// Hook personalizado para usar en componentes React
export function useWebVitals() {
  const getStoredVitals = useCallback(() => {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('web-vitals') || '[]')
  }, [])

  const clearStoredVitals = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('web-vitals')
  }, [])

  return {
    getStoredVitals,
    clearStoredVitals
  }
}

// Exportar para usar en _app.tsx o layout
export { sendToAnalytics }
