'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Hero() {
  const [showCvOptions, setShowCvOptions] = useState(false)

  const downloadCV = (language: 'es' | 'en') => {
    const fileName = language === 'es' 
      ? 'CV_Esteban_Inzunza_Español.pdf' 
      : 'CV_Esteban_Inzunza_English.pdf'
    
    const link = document.createElement('a')
    link.href = `/cv/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowCvOptions(false)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Esteban Inzunza
            <br />
            Desarrollador Front End
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creando experiencias web modernas y escalables con las últimas tecnologías
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="group" asChild>
              <a href="#projects">
                Ver Proyectos
                <motion.div
                  className="ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.div>
              </a>
            </Button>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowCvOptions(!showCvOptions)}
                className="group"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar CV
                <motion.div
                  className="ml-2"
                  animate={{ rotate: showCvOptions ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
              
              {showCvOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-md shadow-lg p-2 z-50"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadCV('es')}
                    className="w-full justify-start mb-1"
                  >
                    🇪🇸 CV en Español
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadCV('en')}
                    className="w-full justify-start"
                  >
                    🇺🇸 CV in English
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:tu-email@example.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
