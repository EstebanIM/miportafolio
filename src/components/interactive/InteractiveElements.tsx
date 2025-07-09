'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, User, Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'
import { CodePlayground } from './CodePlayground'
import { InteractiveResume } from './InteractiveResume'
import { SectionDivider } from '@/components/ui/section-divider'
import { PageTransition } from '@/components/ui/page-transition'

type InteractiveElement = 'playground' | 'resume' | null

interface ElementCard {
  id: InteractiveElement
  title: string
  description: string
  icon: any
  color: string
  technologies: string[]
}

export function InteractiveElements() {
  const { t } = useTranslations()
  const [activeElement, setActiveElement] = useState<InteractiveElement>(null)

  const elements: ElementCard[] = [
    {
      id: 'playground',
      title: t('interactive.elements.playground.title'),
      description: t('interactive.elements.playground.description'),
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      technologies: ['Monaco Editor', 'JavaScript', 'Real-time Execution']
    },
    {
      id: 'resume',
      title: t('interactive.elements.resume.title'),
      description: t('interactive.elements.resume.description'),
      icon: User,
      color: 'from-purple-500 to-pink-500',
      technologies: ['Framer Motion', 'Interactive UI', 'Data Visualization']
    }
  ]

  const renderActiveElement = () => {
    switch (activeElement) {
      case 'playground':
        return <CodePlayground />
      case 'resume':
        return <InteractiveResume />
      default:
        return null
    }
  }

  return (
    <>
      <SectionDivider variant="curve" className="text-primary/20" />
      <section id="interactive" className="py-20 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="container mx-auto px-4">
          <PageTransition delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('interactive.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('interactive.subtitle')}
              </p>
            </div>
          </PageTransition>

          {/* Interactive Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {elements.map((element, index) => {
              const Icon = element.icon
              const isActive = activeElement === element.id
              
              return (
                <PageTransition
                  key={element.id}
                  delay={0.4 + index * 0.1}
                  direction="up"
                >
                  <motion.div
                    layout
                    className={`relative overflow-hidden rounded-xl border border-border/40 transition-all duration-300 cursor-pointer hover-lift ${
                      isActive ? 'ring-2 ring-primary scale-105' : 'hover:border-border/60'
                    }`}
                    onClick={() => setActiveElement(isActive ? null : element.id)}
                    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${element.color} opacity-10`} />
                    
                    {/* Content */}
                    <div className="relative p-6 bg-card/80 backdrop-blur-sm">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${element.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{element.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {element.description}
                          </p>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {element.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className="w-full group"
                      >
                        <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        {isActive ? t('interactive.buttons.hide') : t('interactive.buttons.explore')}
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Active Indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </PageTransition>
              )
            })}
          </div>

          {/* Active Element Display */}
          <AnimatePresence mode="wait">
            {activeElement && (
              <motion.div
                key={activeElement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/40 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">
                      {elements.find(e => e.id === activeElement)?.title}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveElement(null)}
                    >
                      {t('interactive.buttons.close')}
                    </Button>
                  </div>
                  <div>
                    {renderActiveElement()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call to Action */}
          <PageTransition delay={0.8}>
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {t('interactive.cta.title')}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t('interactive.cta.description')}
                </p>
                <Button asChild className="group">
                  <a href="#contact">
                    <Code className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    {t('interactive.cta.button')}
                  </a>
                </Button>
              </div>
            </div>
          </PageTransition>
        </div>
      </section>
      <SectionDivider variant="zigzag" className="text-secondary/20" />
    </>
  )
}
