'use client'

import { motion } from 'framer-motion'
import { Eye, Download, Calendar, TrendingUp } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AnalyticsDashboard() {
  const analytics = useAnalytics()

  const stats = [
    {
      title: 'Visitas Totales',
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      description: 'Páginas vistas únicas',
      color: 'text-blue-500'
    },
    {
      title: 'Descargas de CV',
      value: analytics.cvDownloads.total.toLocaleString(),
      icon: Download,
      description: 'Total de descargas',
      color: 'text-green-500'
    },
    {
      title: 'CV Español',
      value: analytics.cvDownloads.spanish.toLocaleString(),
      icon: Download,
      description: 'Descargas en español',
      color: 'text-orange-500'
    },
    {
      title: 'CV English',
      value: analytics.cvDownloads.english.toLocaleString(),
      icon: Download,
      description: 'Descargas en inglés',
      color: 'text-purple-500'
    }
  ]

  const lastUpdated = new Date(analytics.lastUpdated).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
            
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Card>
        </motion.div>
      ))}
      
      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:col-span-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Estadísticas del Portfolio
            </CardTitle>
            <CardDescription>
              Datos recopilados desde el lanzamiento del sitio web
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Última actualización: {lastUpdated}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
