'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = (newTheme: string) => {
    // Prepare document for smooth transition
    document.documentElement.style.setProperty('--theme-changing', '1')
    
    // Add transition preparation class
    document.body.classList.add('theme-transitioning')

    // Small delay to ensure styles are applied
    requestAnimationFrame(() => {
      // Apply theme change
      setTheme(newTheme)
      
      // Remove preparation styles after transition completes
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning')
        document.documentElement.style.removeProperty('--theme-changing')
      }, 600)
    })
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {getThemeIcon()}
            </motion.div>
          </AnimatePresence>

          {/* Ripple effect background */}
          <motion.div
            className="absolute inset-0 bg-primary/10 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 2, opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="theme-dropdown"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sun className="h-4 w-4" />
            Light
          </motion.div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Moon className="h-4 w-4" />
            Dark
          </motion.div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Monitor className="h-4 w-4" />
            System
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
