# 🚀 PibeLabs - Frontend Application

Next-Gen Innovation Studio - Landing Page & Contact Form

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Performance](#performance)
- [Accesibilidad](#accesibilidad)
- [Despliegue](#despliegue)

---

## ✨ Características

### Funcionalidades Principales

- ✅ **Hero Section** con animaciones futuristas y partículas
- ✅ **Stats Section** con contadores animados
- ✅ **Grid de Servicios** con 6 servicios tecnológicos
- ✅ **Portfolio Section** con filtros por categoría
- ✅ **About Section** con equipo y testimonials
- ✅ **Blog Section** con últimas publicaciones
- ✅ **Formulario de Contacto** ultra-optimizado con validación
- ✅ **15 Custom Hooks** reutilizables (NEW)
- ✅ **40+ Utilidades** útiles (NEW)
- ✅ **CI/CD Pipeline** con GitHub Actions (NEW)
- ✅ **Docker Setup** completo (NEW)
- ✅ **Makefile** con 30+ comandos (NEW)
- ✅ **Validación en Tiempo Real** con Zod + React Hook Form
- ✅ **Sugerencias de Email** (typo correction)
- ✅ **Animaciones Fluidas** con Framer Motion
- ✅ **Responsive Design** (Mobile-first)
- ✅ **Accesibilidad WCAG 2.2** (AAA compliant)
- ✅ **SEO Optimizado** con meta tags completos
- ✅ **Performance Optimizado** (Lighthouse >95)

### Características Técnicas

- TypeScript Strict Mode
- Atomic Design Pattern
- Component-based Architecture
- Code Splitting optimizado
- Lazy Loading
- Web Vitals tracking
- Error Boundaries
- Focus Management
- Keyboard Navigation
- Screen Reader Support

---

## 🛠️ Stack Tecnológico

### Core

- **React 18.3+** - UI Library con Concurrent features
- **TypeScript 5.3+** - Type safety
- **Vite 5+** - Build tool (HMR ultra-rápido)

### Styling

- **Tailwind CSS 3.4+** - Utility-first CSS
- **Framer Motion 11+** - Animaciones declarativas
- **Custom CSS Variables** - Sistema de diseño

### Forms & Validation

- **React Hook Form 7.5+** - Formularios performantes
- **Zod 3.22+** - Schema validation
- **@hookform/resolvers** - Integración Zod + RHF

### State Management

- **Zustand 4.5+** - State management minimalista (1KB)

### Development

- **ESLint** - Linting
- **TypeScript ESLint** - Type-aware linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixes

---

## 📦 Instalación

### Prerrequisitos

- Node.js 20+ (recomendado)
- npm 10+ o pnpm 8+

### Pasos

1. **Clonar o descargar el proyecto**

```bash
cd pibelabs-frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (HMR)

# Build
npm run build        # Compila para producción
npm run preview      # Preview del build de producción

# Linting & Type Checking
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Fix automático de errores
npm run type-check   # Valida tipos TypeScript

# Testing (agregar luego)
npm run test         # Ejecuta tests
npm run test:watch   # Tests en watch mode
npm run test:coverage # Coverage report
```

---

## 📁 Estructura del Proyecto

```
pibelabs-frontend/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── atoms/           # Componentes básicos
│   │   │   ├── Button/
│   │   │   └── Input/
│   │   │
│   │   ├── molecules/       # Combinaciones simples
│   │   │
│   │   └── organisms/       # Secciones complejas
│   │       ├── Header/
│   │       ├── Hero/
│   │       ├── StatsSection/         ← NEW
│   │       ├── ServicesGrid/
│   │       ├── PortfolioSection/     ← NEW
│   │       ├── AboutSection/         ← NEW
│   │       ├── BlogSection/          ← NEW
│   │       ├── ContactForm/
│   │       └── Footer/
│   │
│   ├── hooks/               # Custom hooks
│   │
│   ├── lib/
│   │   ├── api/            # API clients
│   │   ├── validation/     # Zod schemas
│   │   ├── utils/          # Utilidades
│   │   └── constants/      # Configuración
│   │
│   ├── styles/
│   │   └── globals.css     # Estilos globales
│   │
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   │
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
│
├── .env.example            # Variables de entorno
├── .eslintrc.json          # ESLint config
├── .gitignore
├── index.html              # HTML template
├── package.json
├── postcss.config.js
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md
```

---

## ⚡ Performance

### Optimizaciones Implementadas

1. **Code Splitting**
   - Chunks separados para vendors
   - Lazy loading de componentes

2. **Image Optimization**
   - SVG para logos e iconos
   - Lazy loading de imágenes

3. **Bundle Size**
   - Tree shaking automático
   - Minificación con Terser
   - Gzip compression

4. **Runtime Performance**
   - React.memo en componentes
   - useCallback para funciones
   - useMemo para cálculos costosos

### Métricas Target

- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1
- **TTFB** (Time to First Byte): <600ms

**Lighthouse Score Target: 95+**

---

## ♿ Accesibilidad

### Características Implementadas

- ✅ **ARIA Labels** en todos los elementos interactivos
- ✅ **Keyboard Navigation** completa (Tab, Enter, Escape)
- ✅ **Skip Links** para saltar al contenido principal
- ✅ **Focus Visible** indicators
- ✅ **Screen Reader** support
- ✅ **Color Contrast** WCAG AAA (7:1 ratio)
- ✅ **Reduced Motion** support
- ✅ **Semantic HTML** (header, nav, main, footer, section)
- ✅ **Form Labels** y error messages descriptivos

### Testing de Accesibilidad

Puedes testear con:

- **axe DevTools** (Chrome/Firefox extension)
- **WAVE** (Web Accessibility Evaluation Tool)
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)

---

## 🌐 Despliegue

### Opciones Recomendadas

#### 1. Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

#### 2. Netlify

```bash
# Build
npm run build

# Deploy folder: dist
```

#### 3. GitHub Pages

Agregar a `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

### Variables de Entorno en Producción

Asegúrate de configurar:

```
VITE_API_URL=https://api.pibelabs.com/v1
VITE_ENV=production
```

---

## 📊 Siguientes Pasos

### Inmediatos

- [ ] Conectar formulario con API real
- [ ] Agregar tests (Vitest + Testing Library)
- [ ] Implementar CI/CD con GitHub Actions
- [ ] Agregar Google Analytics / Plausible
- [ ] Implementar Error Tracking (Sentry)

### Futuro

- [ ] Agregar sección de Portfolio
- [ ] Blog con MDX
- [ ] Dark mode toggle
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)

---

## 👥 Equipo

**PibeLabs**
- Email: contact@pibelabs.com
- Web: https://pibelabs.com
- Ubicación: Buenos Aires, Argentina

---

## 📄 Licencia

Copyright © 2025 PibeLabs. Todos los derechos reservados.

---

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

¿Tienes preguntas? Contáctanos:

- 📧 Email: contact@pibelabs.com
- 💬 Issues: [GitHub Issues](https://github.com/pibelabs/frontend/issues)

---

**Construido con ❤️ y tecnología de vanguardia por PibeLabs**

🚀 **Building the Future, One Line at a Time**
