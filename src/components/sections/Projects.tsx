'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    title: 'CarMotorFix',
    description: 'Sistema de gestión integral para talleres mecánicos, que optimiza la administración de órdenes de trabajo, inventario y comunicación con clientes.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/EstebanIM/CP_PTY4614_4_EQP_7',
    featured: true,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyectos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Algunos de mis proyectos más destacados que demuestran mis habilidades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg border border-border/40 overflow-hidden hover:border-border/60 transition-colors"
            >
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Código
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
