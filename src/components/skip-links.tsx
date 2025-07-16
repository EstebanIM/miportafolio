'use client'

import { cn } from '@/lib/utils'

export function SkipLinks() {
  const skipLinks = [
    { href: '#main-content', label: 'Saltar al contenido principal' },
    { href: '#navigation', label: 'Saltar a la navegación' },
    { href: '#contact', label: 'Saltar al contacto' },
  ]

  return (
    <div className="sr-only focus-within:not-sr-only">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'absolute top-0 left-0 z-[100] px-4 py-2 bg-primary text-primary-foreground',
            'transition-transform -translate-y-full focus:translate-y-0',
            'focus:outline-none focus:ring-2 focus:ring-primary-foreground'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
