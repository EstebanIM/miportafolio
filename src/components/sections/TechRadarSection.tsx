'use client'

import { TechRadar } from '@/components/interactive/TechRadar'
import { motion } from 'framer-motion'

export function TechRadarSection() {
  return (
    <section 
      id="tech-radar" 
      className="py-20 bg-gradient-to-b from-background to-muted/20"
      aria-labelledby="tech-radar-title"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            id="tech-radar-title"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            Tech Radar
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un mapa visual de mi stack tecnológico actual y las herramientas que estoy explorando
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <TechRadar />
        </motion.div>
      </div>
    </section>
  )
}
