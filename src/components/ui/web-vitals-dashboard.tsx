'use client'

import { useEffect, useState } from 'react'
import { useWebVitals } from '@/lib/web-vitals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface VitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

export function WebVitalsDashboard() {
  const [vitals, setVitals] = useState<VitalsMetric[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { getStoredVitals, clearStoredVitals } = useWebVitals()

  useEffect(() => {
    const storedVitals = getStoredVitals()
    setVitals(storedVitals)
  }, [getStoredVitals])

  // Agregar evento de teclado para abrir el dashboard
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!isOpen || process.env.NODE_ENV === 'production') return null

  const getLatestMetrics = () => {
    const latest: Record<string, VitalsMetric> = {}
    vitals.forEach(metric => {
      if (!latest[metric.name] || metric.timestamp > latest[metric.name].timestamp) {
        latest[metric.name] = metric
      }
    })
    return Object.values(latest)
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getMetricDescription = (name: string) => {
    switch (name) {
      case 'CLS': return 'Cumulative Layout Shift'
      case 'INP': return 'Interaction to Next Paint'
      case 'FCP': return 'First Contentful Paint'
      case 'LCP': return 'Largest Contentful Paint'
      case 'TTFB': return 'Time to First Byte'
      default: return name
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3)
    }
    return `${Math.round(value)}ms`
  }

  const latestMetrics = getLatestMetrics()

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Web Vitals Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <button
                onClick={clearStoredVitals}
                className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Presiona Ctrl+Shift+V para alternar
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {latestMetrics.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No hay métricas disponibles aún
            </p>
          ) : (
            latestMetrics.map((metric) => (
              <div
                key={metric.name}
                className={cn(
                  'p-2 rounded border',
                  getRatingColor(metric.rating)
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="text-xs opacity-75">
                      {getMetricDescription(metric.name)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">
                      {formatValue(metric.name, metric.value)}
                    </div>
                    <div className="text-xs capitalize">
                      {metric.rating.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {vitals.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">
                Total de métricas registradas: {vitals.length}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Trigger button para mostrar en producción si es necesario
export function WebVitalsTrigger() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (process.env.NODE_ENV === 'production') {
    return (
      <button
        onClick={() => setShowDashboard(prev => !prev)}
        className="fixed bottom-4 left-4 z-40 p-2 bg-blue-500 text-white rounded-full shadow-lg text-xs"
        title="Ver Web Vitals"
      >
        📊
      </button>
    )
  }

  return null
}
