'use client'

import { useEffect } from 'react'
import { initWebVitals } from '@/lib/web-vitals'

export function WebVitalsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar Web Vitals cuando el componente se monta
    initWebVitals()
  }, [])

  return <>{children}</>
}
