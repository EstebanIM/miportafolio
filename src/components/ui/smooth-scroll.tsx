'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        e.preventDefault()
        
        const element = document.querySelector(href)
        if (element) {
          const navHeight = 64 // Navigation height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navHeight
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    // Add click listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', handleClick)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick)
      })
    }
  }, [])

  return null
}
