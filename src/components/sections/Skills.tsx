'use client'

import { motion } from 'framer-motion'

const skills = [
  { name: 'React', level: 80, category: 'Frontend' },
  { name: 'Next.js', level: 80, category: 'Frontend' },
  { name: 'TypeScript', level: 75, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'HTML5', level: 95, category: 'Frontend' },
  { name: 'CSS3', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
  { name: 'Sass/SCSS', level: 85, category: 'Frontend' },
  { name: 'Git', level: 80, category: 'Tools' },
  { name: 'Figma', level: 60, category: 'Tools' },
  { name: 'Responsive Design', level: 90, category: 'Design' },
  { name: 'UI/UX Principles', level: 80, category: 'Design' },
]

const categories = ['Frontend', 'Design', 'Tools']

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones completas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-primary">{category}</h3>
              <div className="space-y-3">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
