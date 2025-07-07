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

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mi-portafolio.git

# Instalar dependencias
cd mi-portafolio
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🚀 Deployment en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Subir código a GitHub**:

   ```bash
   git add .
   git commit -m "feat: initial portfolio setup"
   git push origin main
   ```

2. **Conectar con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio desde GitHub
   - Configura las variables de entorno
   - Haz clic en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

## 🔧 Variables de Entorno en Vercel

En el dashboard de Vercel, añade estas variables:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SITE_NAME=Tu Nombre Portfolio
NEXT_PUBLIC_CONTACT_EMAIL=tu-email@example.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/tu-usuario
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/tu-usuario
```

## 📊 Performance

- **Lighthouse Score**: 100/100
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

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

## 📧 Contacto

Tu Nombre - [@tu_usuario](https://twitter.com/tu_usuario) - tu-email@example.com

Project Link: https://github.com/tu-usuario/mi-portafolio (https://github.com/tu-usuario/mi-portafolio)

---

⭐ ¡No olvides darle una estrella al repositorio si te ha sido útil!

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

Project Link: https://github.com/EstebanIM/miportafolio

---

⭐ ¡No olvides darle una estrella al repositorio si te ha sido útil!
```
