# 🚀 Mi Portafolio Profesional

Un portafolio moderno y responsive construido con las últimas tecnologías web.

## ✨ Características

- **⚡ Rendimiento**: Optimizado para Core Web Vitals
- **📱 Responsive**: Diseño adaptativo para todos los dispositivos
- **🎨 Moderno**: Interfaz limpia y minimalista
- **♿ Accesible**: Cumple con estándares WCAG 2.1
- **🔍 SEO**: Optimizado para motores de búsqueda
- **🌙 Tema oscuro**: Soporte completo para modo oscuro

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Deployment**: Vercel

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/EstebanIM/miportafolio.git

# Instalar dependencias
cd miportafolio
npm install

# Ejecutar en desarrollo
npm run dev
```

## 🚀 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run type-check   # Verificar tipos TypeScript
npm run format       # Formatear código con Prettier
```

## 📁 Estructura del Proyecto

```
src/
├── app/              # App Router de Next.js
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes base
│   ├── sections/    # Secciones del portafolio
│   └── layout/      # Componentes de layout
├── lib/             # Utilidades y helpers
├── types/           # Definiciones de tipos
└── data/            # Datos estáticos
```

## 🎨 Personalización

### Colores

Los colores se definen en `src/app/globals.css` usando CSS variables:

```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... más colores */
}
```

### Contenido

Actualiza el contenido en:

- `src/data/projects.ts` - Proyectos
- `src/data/skills.ts` - Habilidades
- `src/data/experience.ts` - Experiencia laboral

## 📊 Performance

- **Lighthouse Score**: 100/100
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Metadatos SEO

Actualiza los metadatos en `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Tu Nombre - Desarrollador Full Stack',
  description: 'Tu descripción personalizada',
  // ... más metadatos
}
```

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio con Vercel
2. La configuración se detecta automáticamente
3. Deploy automático en cada push

### Manual

```bash
npm run build
npm run start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📧 Contacto

Esteban Inzunza - https://www.linkedin.com/in/einzunza2/ - einzunza2@gmail.com

Project Link: [https://github.com/EstebanIM/miportafolio]

---

⭐ ¡No olvides darle una estrella al repositorio si te ha sido útil!
