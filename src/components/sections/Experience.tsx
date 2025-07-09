'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Code, Users, Wrench } from 'lucide-react'
import { PageTransition } from '@/components/ui/page-transition'
import { SectionDivider } from '@/components/ui/section-divider'
import { useTranslations } from '@/hooks/useTranslations'

interface ExperienceItem {
  id: string
  key: string
  type: 'work' | 'internship'
  technologies?: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    key: 'houseman',
    type: 'work',
  },
  {
    id: '2',
    key: 'engineer',
    type: 'internship',
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Sistema de Inventario'],
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return Briefcase
    case 'internship':
      return Code
    default:
      return Briefcase
  }
}

export function Experience() {
  const { t } = useTranslations()
  return (
    <>
      <SectionDivider variant="wave" className="text-muted/30" />
      <section id="experience" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <PageTransition delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('experience.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('experience.subtitle')}
              </p>
            </div>
          </PageTransition>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary/30"></div>

              {experiences.map((experience, index) => {
                const Icon = getIcon(experience.type)
                const isEven = index % 2 === 0

                return (
                  <PageTransition
                    key={experience.id}
                    delay={0.4 + index * 0.2}
                    direction={isEven ? 'left' : 'right'}
                  >
                    <div className={`relative flex items-center mb-12 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                      {/* Timeline dot */}
                      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10">
                      </div>

                      {/* Content card */}
                      <div className={`ml-20 md:ml-0 md:w-1/2 ${
                        isEven ? 'md:pr-12' : 'md:pl-12'
                      }`}>
                        <motion.div
                          className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Header */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {t(`experience.types.${experience.type}`)}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-foreground">
                                {t(`experience.positions.${experience.key}.title`)}
                              </h3>
                              <p className="text-lg font-semibold text-primary">
                                {t(`experience.positions.${experience.key}.company`)}
                              </p>
                            </div>
                          </div>

                          {/* Meta info */}
                          <div className="flex flex-col sm:flex-row gap-2 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{t(`experience.positions.${experience.key}.period`)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{t(`experience.positions.${experience.key}.location`)}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              {t('experience.sections.responsibilities')}
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {t(`experience.positions.${experience.key}.description`)?.map((desc: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary mt-2">•</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          {experience.technologies && (
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-primary" />
                                {t('experience.sections.technologies')}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Achievements */}
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Code className="h-4 w-4 text-primary" />
                              {t('experience.sections.achievements')}
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {t(`experience.positions.${experience.key}.achievements`)?.map((achievement: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-2">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </PageTransition>
                )
              })}
            </div>
          </div>

          {/* Call to action */}
          <PageTransition delay={0.8}>
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {t('experience.cta.title')}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t('experience.cta.description')}
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  {t('experience.cta.button')}
                </motion.a>
              </div>
            </div>
          </PageTransition>
        </div>
      </section>
      <SectionDivider variant="zigzag" className="text-primary/20" />
    </>
  )
}
