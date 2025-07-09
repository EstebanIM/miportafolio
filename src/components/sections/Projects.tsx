'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

const projectKeys = [
	{
		id: 1,
		key: 'carMotorFix',
		technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
		githubUrl: 'https://github.com/EstebanIM/CP_PTY4614_4_EQP_7',
		featured: true,
	},
	{
		id: 2,
		key: 'portfolio',
		technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		githubUrl: 'https://github.com/EstebanIM/miportafolio',
		featured: true,
	},
	{
		id: 3,
		key: 'upcoming',
		technologies: ['React', 'TypeScript', 'Next.js'],
		featured: false,
		comingSoon: true,
	},
]

export function Projects() {
	const { t } = useTranslations()

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
					<h2 className="text-3xl md:text-4xl font-bold mb-4">{t('projects.title')}</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						{t('projects.subtitle')}
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectKeys.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							viewport={{ once: true }}
							className={`bg-card rounded-lg border border-border/40 overflow-hidden hover-lift hover-scale transition-all duration-300 ${
								project.comingSoon ? 'opacity-75' : ''
							}`}
						>
							{project.featured && (
								<div className="bg-primary/10 px-3 py-1">
									<span className="text-primary text-xs font-medium">
										{t('projects.featured')}
									</span>
								</div>
							)}

							<div className="p-6">
								<div className="flex items-start justify-between mb-2">
									<h3 className="text-xl font-semibold hover-glow">
										{t(`projects.items.${project.key}.title`)}
									</h3>
									{project.comingSoon && (
										<span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded animate-pulse">
											{t('projects.buttons.comingSoon')}
										</span>
									)}
								</div>
								<p className="text-muted-foreground mb-4">
									{t(`projects.items.${project.key}.description`)}
								</p>

								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="px-2 py-1 bg-primary/10 text-primary rounded text-sm hover-lift cursor-default"
										>
											{tech}
										</span>
									))}
								</div>

								{!project.comingSoon && (
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											asChild
											className="hover-glow group"
										>
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
												{t('projects.buttons.viewCode')}
											</a>
										</Button>
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					viewport={{ once: true }}
					className="text-center mt-12"
				>
					<p className="text-muted-foreground mb-4">
						{t('projects.interestedInMore')}
					</p>
					<Button
						variant="outline"
						asChild
						className="hover-glow group"
					>
						<a
							href="https://github.com/EstebanIM"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
							{t('projects.viewAllRepos')}
						</a>
					</Button>
				</motion.div>
			</div>
		</section>
	)
}
