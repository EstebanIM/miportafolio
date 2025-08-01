'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { useTranslation } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const { t } = useTranslation()

	const navItems = [
		{ name: t('navigation.home'), href: '#hero' },
		{ name: t('navigation.about'), href: '#about' },
		{ name: t('navigation.experience'), href: '#experience' },
		{ name: t('navigation.projects'), href: '#projects' },
		{ name: 'Tech Radar', href: '#tech-radar' },
		{ name: t('navigation.interactive'), href: '#interactive' },
		{ name: t('navigation.contact'), href: '#contact' },
	]

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	return (
		<>
			<motion.nav
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className={cn(
					'fixed top-0 left-0 right-0 transition-all duration-300',
					isOpen ? 'z-[70]' : 'z-50',
					scrolled || isOpen
						? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40'
						: 'bg-transparent'
				)}
				role="navigation"
				aria-label="Navegación principal"
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
					<div className="hidden md:flex items-center space-x-8" role="menubar">
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-foreground/70 hover:text-foreground transition-colors hover-border-slide relative py-2"
								role="menuitem"
								aria-label={`Navegar a sección ${item.name}`}
							>
								{item.name}
							</a>
						))}
						<div className="flex items-center gap-2" role="group" aria-label="Configuraciones">
							<LanguageToggle />
							<ThemeToggle />
						</div>
					</div>

					{/* Mobile Menu */}
					<div className="flex items-center space-x-2 md:hidden">
						<LanguageToggle />
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(!isOpen)}
							className="hover-rotate"
							aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
							aria-expanded={isOpen}
							aria-controls="mobile-menu"
						>
							{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden border-t border-border/40 relative z-[70] bg-background/95 backdrop-blur-md"
							id="mobile-menu"
							role="menu"
							aria-label="Menú de navegación móvil"
						>
							<div className="py-4 space-y-4">
								{navItems.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="block text-foreground/70 hover:text-foreground transition-colors hover-border-slide py-2"
										onClick={() => setIsOpen(false)}
										role="menuitem"
										aria-label={`Navegar a sección ${item.name}`}
									>
										{item.name}
									</a>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>

		{/* Mobile Overlay - Outside nav for better positioning */}
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] md:hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					onClick={() => setIsOpen(false)}
				/>
			)}
		</AnimatePresence>
	</>
	)
}

