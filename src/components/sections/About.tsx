'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Coffee, Lightbulb, Users } from 'lucide-react'
import { PageTransition } from '@/components/ui/page-transition'
import { SectionDivider } from '@/components/ui/section-divider'
import { SectionProgress } from '@/components/ui/section-progress'
import { useRef } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

export function About() {
	const ref = useRef(null)
	const { t } = useTranslations()

	// Parallax muy sutil para About
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	})

	// Efectos muy sutiles
	const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50])
	const floatingY = useTransform(scrollYProgress, [0, 1], [0, -25])

	const highlights = [
		{
			icon: Code,
			title: t('about.highlights.cleanCode.title'),
			description: t('about.highlights.cleanCode.description'),
		},
		{
			icon: Lightbulb,
			title: t('about.highlights.innovation.title'),
			description: t('about.highlights.innovation.description'),
		},
		{
			icon: Users,
			title: t('about.highlights.collaboration.title'),
			description: t('about.highlights.collaboration.description'),
		},
		{
			icon: Coffee,
			title: t('about.highlights.dedication.title'),
			description: t('about.highlights.dedication.description'),
		},
	]

	return (
		<>
			<SectionDivider variant="wave" className="text-muted/30" />
			<section
				ref={ref}
				id="about"
				className="py-20 bg-muted/30 relative overflow-hidden"
			>
				{/* Elementos parallax sutiles */}
				<motion.div
					className="absolute inset-0 z-0"
					style={{ y: backgroundY }}
				>
					<div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
					<div className="absolute bottom-40 left-20 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
				</motion.div>

				<div className="container mx-auto px-4 relative z-10">
					<PageTransition delay={0.2}>
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t('about.subtitle')}
							</p>
						</div>
					</PageTransition>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<PageTransition direction="left" delay={0.4}>
							<div>
								<p className="text-lg mb-6 leading-relaxed">
									{t('about.description')}
								</p>
							</div>
						</PageTransition>

						<PageTransition direction="right" delay={0.6}>
							<motion.div
								style={{ y: floatingY }}
								className="grid grid-cols-2 gap-4"
							>
								{highlights.map((highlight, index) => (
									<PageTransition
										key={highlight.title}
										delay={0.8 + index * 0.1}
										direction="up"
									>
										<div className="p-4 bg-card rounded-lg border border-border/40 hover:border-border/60 transition-all duration-300 backdrop-blur-sm hover-lift">
											<highlight.icon className="h-8 w-8 text-primary mb-2" />
											<h3 className="font-semibold mb-1">{highlight.title}</h3>
											<p className="text-sm text-muted-foreground">
												{highlight.description}
											</p>
										</div>
									</PageTransition>
								))}
							</motion.div>
						</PageTransition>
					</div>
				</div>
			</section>
			<SectionDivider variant="curve" flip className="text-muted/30" />
		</>
	)
}
