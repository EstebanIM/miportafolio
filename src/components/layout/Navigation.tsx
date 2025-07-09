'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
	{ name: 'Inicio', href: '#hero' },
	{ name: 'Sobre mí', href: '#about' },
	{ name: 'Habilidades', href: '#skills' },
	{ name: 'Proyectos', href: '#projects' },
	{ name: 'Contacto', href: '#contact' },
]

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				scrolled
					? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40'
					: 'bg-transparent'
			)}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="text-xl font-bold hover-glow cursor-pointer"
					>
						Esteban Inzunza
					</motion.div>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-foreground/70 hover:text-foreground transition-colors hover-border-slide relative py-2"
							>
								{item.name}
							</a>
						))}
						<ThemeToggle />
					</div>

					{/* Mobile Menu */}
					<div className="flex items-center space-x-2 md:hidden">
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							className="hover-rotate"
						>
							{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-t border-border/40"
					>
						<div className="py-4 space-y-4">
							{navItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="block text-foreground/70 hover:text-foreground transition-colors hover-border-slide py-2"
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</a>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	)
}

