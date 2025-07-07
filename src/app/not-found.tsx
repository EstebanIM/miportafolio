'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Página no encontrada</h2>
            <p className="text-muted-foreground">
              Lo sentimos, no pudimos encontrar la página que buscas.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver atrás
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
