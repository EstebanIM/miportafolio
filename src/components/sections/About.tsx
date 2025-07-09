'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Coffee, Lightbulb, Users } from 'lucide-react'
import { useRef } from 'react'

const highlights = [
	{
		icon: Code,
		title: 'Clean Code',
		description: 'Código limpio y bien estructurado siguiendo las mejores prácticas',
	},
	{
		icon: Lightbulb,
		title: 'Innovación',
		description: 'Siempre buscando nuevas tecnologías y enfoques creativos',
	},
	{
		icon: Users,
		title: 'Colaboración',
		description: 'Trabajo efectivo en equipos multidisciplinarios',
	},
	{
		icon: Coffee,
		title: 'Dedicación',
		description: 'Comprometido con la excelencia en cada proyecto',
	},
]

export function About() {
	const ref = useRef(null)

	// Parallax muy sutil para About
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	})

	// Efectos muy sutiles
	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
	const floatingY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

	return (
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
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mí</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Desarrollador apasionado por crear experiencias digitales excepcionales
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<p className="text-lg mb-6 leading-relaxed">
							Soy un desarrollador front-end enfocado en crear experiencias de usuario
							excepcionales. Me especializo en React, Next.js y TypeScript, siempre
							buscando las mejores prácticas para escribir código limpio y mantenible.
						</p>
						<p className="text-muted-foreground mb-6">
							Mi pasión por el desarrollo frontend me impulsa a mantenerme actualizado
							con las últimas tecnologías y tendencias del diseño web, creando interfaces
							modernas y accesibles.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						style={{ y: floatingY }}
						className="grid grid-cols-2 gap-4"
					>
						{highlights.map((highlight, index) => (
							<motion.div
								key={highlight.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="p-4 bg-card rounded-lg border border-border/40 hover:border-border/60 transition-colors backdrop-blur-sm"
							>
								<highlight.icon className="h-8 w-8 text-primary mb-2" />
								<h3 className="font-semibold mb-1">{highlight.title}</h3>
								<p className="text-sm text-muted-foreground">
									{highlight.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
