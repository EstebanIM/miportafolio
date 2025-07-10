'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Particles } from '@/components/ui/particles'
import { useState, useRef, useEffect } from 'react'
import { trackCVDownload, trackPageView } from '@/lib/analytics'
import { ViewCounter } from '@/components/ui/view-counter'
import { useTranslation } from '@/contexts/LanguageContext'
import Image from 'next/image'

export function Hero() {
  const [showCvOptions, setShowCvOptions] = useState(false)
  const [easterEggClicks, setEasterEggClicks] = useState(0)
  const [showEasterEggModal, setShowEasterEggModal] = useState(false)
  const ref = useRef(null)
  const { t } = useTranslation()
  
  // Track page view on mount
  useEffect(() => {
    trackPageView()
  }, [])

  // Parallax effect para el scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Diferentes velocidades para crear el efecto parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const downloadCV = async (language: 'es' | 'en') => {
    const fileName = language === 'es' 
      ? 'CV_Esteban_Inzunza_Español.pdf' 
      : 'CV_Esteban_Inzunza_English.pdf'
    
    // Track the download
    await trackCVDownload(language === 'es' ? 'spanish' : 'english')
    
    const link = document.createElement('a')
    link.href = `/cv/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowCvOptions(false)
  }

  const handleEasterEggClick = () => {
    setEasterEggClicks(prev => {
      const newCount = prev + 1
      if (newCount >= 10) {
        setShowEasterEggModal(true)
        return 0 // Reset counter
      }
      return newCount
    })
  }

  return (
    <section 
      ref={ref}
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Partículas de fondo */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        staticity={85}
        ease={75}
        color="#3b82f6"
      />

      {/* Efectos parallax de fondo */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y: textY }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="select-none"
              onClick={handleEasterEggClick}
            >
              E
            </span>
            {t('hero.title').substring(1)}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle').includes('especializado') ? (
              <>
                Desarrollador Front End con experiencia en{' '}
                <span className="text-primary font-semibold">React</span> y{' '}
                <span className="text-primary font-semibold">Next.js</span>
              </>
            ) : (
              <>
                Front End Developer with experience in{' '}
                <span className="text-primary font-semibold">React</span> and{' '}
                <span className="text-primary font-semibold">Next.js</span>
              </>
            )}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="group" asChild>
              <a href="#projects">
                {t('hero.cta.projects')}
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
                {t('hero.cta.downloadCV')}
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
                    {t('hero.cta.cvSpanish')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadCV('en')}
                    className="w-full justify-start"
                  >
                    {t('hero.cta.cvEnglish')}
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
              <a href="https://github.com/EstebanIM" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">{t('hero.social.github')}</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/einzunza2" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t('hero.social.linkedin')}</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:einzunza2@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">{t('hero.social.email')}</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Easter Egg Modal */}
      {showEasterEggModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowEasterEggModal(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEasterEggModal(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <Image 
                src="/rludios.png" 
                alt="Easter Egg" 
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                🎉 ¡Easter Egg Encontrado!
              </h3>
              <p className="text-white/80 drop-shadow-lg">
                ¡Felicidades por encontrar el secreto! 🎊
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
