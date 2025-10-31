# 🚀 PibeLabs Frontend

Landing page moderna y optimizada para PibeLabs, construida con React, TypeScript, y Tailwind CSS.

## ✨ Características

- ⚡️ **Vite** - Build tool ultrarrápido
- ⚛️ **React 18** - Biblioteca de UI moderna
- 🎯 **TypeScript** - Tipado estático para mayor seguridad
- 🎨 **Tailwind CSS** - Framework CSS utility-first
- 🎭 **Framer Motion** - Animaciones fluidas y profesionales
- 📦 **Zustand** - Gestión de estado simple y potente
- 📝 **React Hook Form + Zod** - Formularios con validación robusta
- 🐳 **Docker** - Containerización lista para producción
- 🔧 **ESLint + TypeScript** - Linting y calidad de código

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install --production=false
```

### 2. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

### 3. Build para Producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/          # Componentes básicos (Button, Input)
│   ├── molecules/      # Combinaciones de átomos
│   └── organisms/      # Secciones complejas (Header, Hero, Footer)
├── hooks/              # Custom React hooks
├── lib/                
│   ├── constants/      # Constantes
│   ├── utils/          # Utilidades
│   └── validation/     # Esquemas Zod
├── styles/             # Estilos globales
├── types/              # Tipos TypeScript
└── App.tsx             # Componente principal
```

## 🛠️ Scripts Principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige errores automáticamente |
| `npm run type-check` | Verifica tipos TypeScript |

## 🐳 Docker

### Desarrollo
```bash
npm run docker:build:dev
npm run docker:run:dev
```

### Producción
```bash
npm run docker:build
npm run docker:run
```

### Docker Compose
```bash
npm run compose:up
npm run compose:down
```

## 🎨 Tecnologías

- **React 18.3** - Framework de UI
- **TypeScript 5.3** - Superset de JavaScript con tipos
- **Vite 5.1** - Build tool y dev server
- **Tailwind CSS 3.4** - Framework CSS
- **Framer Motion 11** - Animaciones
- **Zustand 4.5** - State management
- **React Hook Form 7** - Gestión de formularios
- **Zod 3** - Validación de esquemas

## 📚 Documentación

Para información detallada sobre la arquitectura y mejores prácticas, consulta:

- [Arquitectura del Proyecto](./docs/ARCHITECTURE.md)

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=https://api.pibelabs.com
VITE_ANALYTICS_ID=your-analytics-id
```

**Nota**: En Vite, todas las variables deben comenzar con `VITE_`

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Convención de Commits

- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bugs
- `Update:` Actualización de funcionalidad
- `Refactor:` Refactorización de código
- `Docs:` Cambios en documentación

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Equipo

Desarrollado por el equipo de PibeLabs

---

**¿Problemas?** Abre un issue o contacta al equipo de desarrollo.
