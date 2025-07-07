'use client'

import { motion } from 'framer-motion'
import { Code, Coffee, Lightbulb, Users } from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Código limpio y bien estructurado siguiendo las mejores prácticas',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Siempre buscando nuevas tecnologías y enfoques creativos',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajo efectivo en equipos multidisciplinarios',
  },
  {
    icon: Coffee,
    title: 'Dedicación',
    description: 'Comprometido con la excelencia en cada proyecto',
  },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mí</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desarrollador apasionado por crear experiencias digitales excepcionales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6 leading-relaxed">
              Soy Ingeniero en Informática titulado, con experiencia en desarrollo Front-End 
              adquirida durante mi práctica profesional y proyectos personales. Me especializo 
              en tecnologías como React, Next.js y TypeScript, con un enfoque en crear interfaces 
              limpias, atractivas y funcionales. Me apasiona el diseño de experiencias digitales 
              y aplico buenas prácticas de desarrollo para construir soluciones modernas y 
              escalables, siempre en constante aprendizaje para mantenerme actualizado con las 
              últimas tendencias y herramientas del desarrollo web.
            </p>
            <p className="text-muted-foreground mb-6">
              Mi pasión por la tecnología me impulsa a mantenerme actualizado con las últimas 
              tendencias del desarrollo web, y disfruto colaborando en proyectos que generen 
              un impacto positivo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 bg-card rounded-lg border border-border/40 hover:border-border/60 transition-colors"
              >
                <highlight.icon className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
