# 🚀 Quick Start Guide - PibeLabs Frontend

## ⚡ Inicio Rápido (3 minutos)

### 1️⃣ Instalar Dependencias

```bash
npm install
```

### 2️⃣ Iniciar Desarrollo

```bash
npm run dev
```

**¡Listo!** La aplicación estará en `http://localhost:3000`

---

## 📦 ¿Qué Incluye?

### ✅ Componentes Implementados

1. **Header** - Navegación responsive con animaciones
2. **Hero** - Sección principal con background futurista y partículas
3. **ServicesGrid** - 6 tarjetas de servicios con hover effects
4. **ContactForm** - Formulario con validación en tiempo real
5. **Footer** - Footer completo con links y redes sociales

### ✅ Características Técnicas

- TypeScript Strict Mode ✓
- Tailwind CSS + Custom Palette ✓
- Framer Motion Animations ✓
- React Hook Form + Zod Validation ✓
- Responsive Design (Mobile-first) ✓
- Accesibilidad WCAG 2.2 ✓
- SEO Optimizado ✓

---

## 🎨 Paleta de Colores

```css
/* Colores Principales */
--cyan-neon: #00D9FF
--magenta-neon: #FF00FF
--dark-primary: #0a0e27
--dark-secondary: #1a1f3a

/* Ver más en: tailwind.config.js */
```

---

## 📝 Próximos Pasos

### 1. Conectar con Backend (API)

Edita: `src/lib/api/contacts.ts`

```typescript
const response = await fetch(`${CONFIG.apiUrl}/contacts`, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
});
```

### 2. Agregar Más Secciones

Crea nuevos componentes en:
- `src/components/organisms/`

Importa en `src/App.tsx`:

```typescript
import NewSection from './components/organisms/NewSection';

// En el render:
<NewSection />
```

### 3. Personalizar Servicios

Edita: `src/lib/constants/config.ts`

```typescript
export const SERVICES = [
  {
    id: 'tu-servicio',
    title: 'Tu Servicio',
    description: '...',
    icon: '🎯',
    features: [...],
    color: 'cyan'
  }
];
```

### 4. Agregar Analytics

```typescript
// src/main.tsx
import { initAnalytics } from './lib/analytics';

if (import.meta.env.PROD) {
  initAnalytics();
}
```

---

## 🚢 Deploy Rápido (Vercel)

```bash
npm i -g vercel
vercel
```

---

## 🐛 Troubleshooting

### Error: `Cannot find module '@/...'`

**Solución:** Verifica que el alias esté en `vite.config.ts` y `tsconfig.json`

### Error: `Tailwind classes not working`

**Solución:** Asegúrate que existe `postcss.config.js` y ejecuta `npm install`

### Error: `Type errors in strict mode`

**Solución:** TypeScript strict mode está habilitado. Revisa los tipos en `src/types/index.ts`

---

## 📞 ¿Necesitas Ayuda?

- 📧 Email: contact@pibelabs.com
- 📚 Documentación completa: `README.md`
- 🐛 Reportar bug: GitHub Issues

---

**Happy Coding! 🚀**

*Construido con ❤️ por el equipo de PibeLabs*
