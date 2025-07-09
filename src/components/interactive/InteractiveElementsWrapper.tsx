'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic import para evitar problemas de SSR con Three.js
const InteractiveElements = dynamic(
  () => import('./InteractiveElements').then(mod => ({ default: mod.InteractiveElements })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
)

export function InteractiveElementsWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <InteractiveElements />
    </Suspense>
  )
}
