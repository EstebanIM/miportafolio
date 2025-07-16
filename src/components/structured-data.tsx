import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.vercel.app'

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Esteban Inzunza - Desarrollador Front End",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.svg`,
    "description": "Desarrollador Front End especializado en React, Next.js y TypeScript. Creando interfaces web modernas y atractivas.",
    "founder": {
      "@type": "Person",
      "name": "Esteban Inzunza"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "einzunza2@gmail.com",
      "contactType": "Professional"
    },
    "sameAs": [
      "https://github.com/EstebanIM",
      "https://linkedin.com/in/einzunza2"
    ]
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Esteban Inzunza",
    "jobTitle": "Desarrollador Front End",
    "description": "Desarrollador Front End especializado en React, Next.js y TypeScript con experiencia en la creación de interfaces web modernas y atractivas.",
    "url": siteUrl,
    "email": "einzunza2@gmail.com",
    "alumniOf": "DUOC UC",
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "Git",
      "Node.js"
    ],
    "sameAs": [
      "https://github.com/EstebanIM",
      "https://linkedin.com/in/einzunza2"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Concepcion",
      "addressCountry": "Chile"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Esteban Inzunza Portfolio",
    "alternateName": "Portfolio de Esteban Inzunza",
    "url": siteUrl,
    "description": "Portfolio profesional de Esteban Inzunza, desarrollador front-end especializado en React y Next.js",
    "author": {
      "@type": "Person",
      "name": "Esteban Inzunza"
    },
    "inLanguage": ["es", "en"],
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}#portfolio`,
    "name": "Portfolio Profesional - Esteban Inzunza",
    "description": "Colección de proyectos y trabajos realizados como desarrollador front-end",
    "author": {
      "@type": "Person",
      "name": "Esteban Inzunza"
    },
    "dateCreated": "2024",
    "dateModified": new Date().toISOString().split('T')[0],
    "genre": "Web Development Portfolio",
    "keywords": "React, Next.js, TypeScript, Frontend Development, Portfolio",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Proyectos",
      "description": "Lista de proyectos desarrollados",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "CarMotorFix",
          "description": "Aplicación web para gestión de servicios automotrices",
          "applicationCategory": "Web Application",
          "operatingSystem": "Web Browser",
        },
        {
          "@type": "SoftwareApplication", 
          "name": "Portfolio Personal",
          "description": "Portfolio profesional desarrollado con Next.js y TypeScript",
          "applicationCategory": "Web Application",
          "operatingSystem": "Web Browser"
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  )
}
