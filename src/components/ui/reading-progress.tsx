'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const sections = [
    { id: 'hero', name: 'Inicio' },
    { id: 'about', name: 'Sobre mí' },
    { id: 'projects', name: 'Proyectos' },
    { id: 'contact', name: 'Contacto' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const element = section as HTMLElement
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(element.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center space-y-2">
        {/* Progress bar */}
        <div className="relative w-1 h-32 bg-border/20 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-secondary rounded-full origin-top"
            style={{
              scaleY: smoothProgress
            }}
          />
        </div>

        {/* Section indicators */}
        <div className="flex flex-col space-y-3 mt-4">
          {sections.map((section) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className={`group relative w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? 'border-primary bg-primary'
                  : 'border-border/40 bg-transparent hover:border-primary/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Tooltip */}
              <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border/40 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {section.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
