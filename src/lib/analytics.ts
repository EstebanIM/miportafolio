'use client'

import React from 'react'

interface AnalyticsData {
  pageViews: number
  cvDownloads: {
    total: number
    spanish: number
    english: number
  }
  lastUpdated: string
}

const STORAGE_KEY = 'portfolio-analytics'
const API_ENDPOINT = '/api/analytics' // Para producción con base de datos

// Función para obtener datos de localStorage
function getLocalAnalytics(): AnalyticsData {
  if (typeof window === 'undefined') {
    return {
      pageViews: 0,
      cvDownloads: { total: 0, spanish: 0, english: 0 },
      lastUpdated: new Date().toISOString()
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const initial: AnalyticsData = {
      pageViews: 0,
      cvDownloads: { total: 0, spanish: 0, english: 0 },
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    return initial
  }

  return JSON.parse(stored)
}

// Función para guardar datos en localStorage
function saveLocalAnalytics(data: AnalyticsData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      lastUpdated: new Date().toISOString()
    }))
  }
}

// Función para incrementar vistas de página
export async function trackPageView() {
  try {
    // Evitar tracking múltiple en la misma sesión
    const sessionKey = 'portfolio-session-viewed'
    if (sessionStorage.getItem(sessionKey)) {
      return
    }

    const analytics = getLocalAnalytics()
    analytics.pageViews += 1
    saveLocalAnalytics(analytics)
    
    // Marcar como vista en esta sesión
    sessionStorage.setItem(sessionKey, 'true')

    // En producción, enviar a API
    if (process.env.NODE_ENV === 'production') {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page_view' })
      }).catch(() => {}) // Fallar silenciosamente
    }
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

// Función para trackear descargas de CV
export async function trackCVDownload(language: 'spanish' | 'english') {
  try {
    const analytics = getLocalAnalytics()
    analytics.cvDownloads.total += 1
    analytics.cvDownloads[language] += 1
    saveLocalAnalytics(analytics)

    // En producción, enviar a API
    if (process.env.NODE_ENV === 'production') {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'cv_download', 
          language 
        })
      }).catch(() => {}) // Fallar silenciosamente
    }
  } catch (error) {
    console.error('Error tracking CV download:', error)
  }
}

// Función para obtener estadísticas
export function getAnalytics(): AnalyticsData {
  return getLocalAnalytics()
}

// Hook personalizado para usar las estadísticas
export function useAnalytics() {
  const [analytics, setAnalytics] = React.useState<AnalyticsData>({
    pageViews: 0,
    cvDownloads: { total: 0, spanish: 0, english: 0 },
    lastUpdated: new Date().toISOString()
  })

  React.useEffect(() => {
    setAnalytics(getLocalAnalytics())

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      setAnalytics(getLocalAnalytics())
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return analytics
}
