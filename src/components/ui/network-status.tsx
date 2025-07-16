'use client'

import { useOnlineStatus } from '@/hooks/useNetworkStatus'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function NetworkStatus() {
  const isOnline = useOnlineStatus()
  const [showNotification, setShowNotification] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true)
      setShowNotification(true)
    } else if (wasOffline) {
      setShowNotification(true)
      // Ocultar la notificación de reconexión después de 3 segundos
      const timer = setTimeout(() => {
        setShowNotification(false)
        setWasOffline(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, wasOffline])

  if (!showNotification) return null

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
        "px-4 py-2 rounded-lg shadow-lg transition-all duration-300",
        "text-sm font-medium",
        isOnline
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      )}
      role="alert"
      aria-live="polite"
    >
      {isOnline ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>Conexión restaurada</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full" />
          <span>Trabajando sin conexión</span>
        </div>
      )}
    </div>
  )
}
