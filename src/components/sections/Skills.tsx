'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/page-transition'
import { SectionDivider } from '@/components/ui/section-divider'
import { useTranslations } from '@/hooks/useTranslations'

const skills = [
	{ name: 'React', level: 80, category: 'frontend' },
	{ name: 'Next.js', level: 80, category: 'frontend' },
	{ name: 'TypeScript', level: 75, category: 'frontend' },
	{ name: 'JavaScript', level: 85, category: 'frontend' },
	{ name: 'HTML5', level: 95, category: 'frontend' },
	{ name: 'CSS3', level: 90, category: 'frontend' },
	{ name: 'Tailwind CSS', level: 85, category: 'frontend' },
	{ name: 'Sass/SCSS', level: 85, category: 'frontend' },
	{ name: 'Git', level: 80, category: 'tools' },
	{ name: 'Figma', level: 60, category: 'tools' },
	{ name: 'Responsive Design', level: 90, category: 'design' },
	{ name: 'UI/UX Principles', level: 80, category: 'design' },
]

const categoryKeys = ['frontend', 'design', 'tools']

export function Skills() {
	const { t } = useTranslations()

	return (
		<>
			<section id="skills" className="py-20">
				<div className="container mx-auto px-4">
					<PageTransition delay={0.2}>
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								{t('skills.title')}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t('skills.subtitle')}
							</p>
						</div>
					</PageTransition>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{categoryKeys.map((categoryKey, categoryIndex) => (
							<PageTransition
								key={categoryKey}
								delay={0.4 + categoryIndex * 0.1}
								direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
							>
								<div className="space-y-4 hover-lift p-4 rounded-lg transition-all duration-300 hover:bg-muted/30">
									<h3 className="text-xl font-semibold text-primary hover-glow">
										{t(`skills.categories.${categoryKey}`)}
									</h3>
									<div className="space-y-3">
										{skills
											.filter((skill) => skill.category === categoryKey)
											.map((skill, skillIndex) => (
												<PageTransition
													key={skill.name}
													delay={
														0.6 +
														categoryIndex * 0.1 +
														skillIndex * 0.05
													}
													direction="up"
												>
													<div className="space-y-2 group">
														<div className="flex justify-between items-center">
															<span className="text-sm font-medium group-hover:text-primary transition-colors">
																{skill.name}
															</span>
															<span className="text-sm text-muted-foreground">
																{skill.level}%
															</span>
														</div>
														<div className="h-2 bg-muted rounded-full overflow-hidden hover-glow">
															<motion.div
																initial={{ width: 0 }}
																whileInView={{ width: `${skill.level}%` }}
																transition={{
																	duration: 1,
																	delay:
																		0.6 +
																		categoryIndex * 0.1 +
																		skillIndex * 0.05,
																}}
																viewport={{ once: true }}
																className="h-full bg-primary rounded-full group-hover:animate-glow transition-all"
															/>
														</div>
													</div>
												</PageTransition>
											))}
									</div>
								</div>
							</PageTransition>
						))}
					</div>
				</div>
			</section>
			<SectionDivider variant="zigzag" className="text-primary/20" />
		</>
	)
}
