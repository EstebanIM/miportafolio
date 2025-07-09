'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

interface DownloadTrackerProps {
  className?: string
  showIcon?: boolean
  showBreakdown?: boolean
}

export function DownloadTracker({ 
  className = '', 
  showIcon = true,
  showBreakdown = false 
}: DownloadTrackerProps) {
  const analytics = useAnalytics()

  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        {showIcon && <Download className="h-4 w-4" />}
        <span>
          Descargas CV: 
          <motion.span
            key={analytics.cvDownloads.total}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono ml-1"
          >
            {analytics.cvDownloads.total.toLocaleString()}
          </motion.span>
        </span>
      </div>
      
      {showBreakdown && (
        <div className="flex gap-4 text-xs">
          <span>
            🇪🇸 {analytics.cvDownloads.spanish}
          </span>
          <span>
            🇺🇸 {analytics.cvDownloads.english}
          </span>
        </div>
      )}
    </div>
  )
}
