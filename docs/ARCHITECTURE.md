# Arquitectura del Proyecto - PibeLabs Frontend

## 📁 Estructura del Proyecto

```
pibelabs-frontend/
├── src/
│   ├── components/          # Componentes React organizados por Atomic Design
│   │   ├── atoms/          # Componentes básicos reutilizables (Button, Input)
│   │   ├── molecules/      # Combinaciones de átomos (formularios pequeños)
│   │   └── organisms/      # Componentes complejos (Header, Hero, Footer)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilidades y configuraciones
│   │   ├── constants/      # Constantes de la aplicación
│   │   ├── utils/          # Funciones utilitarias
│   │   └── validation/     # Esquemas de validación (Zod)
│   ├── styles/             # Estilos globales (Tailwind CSS)
│   ├── types/              # Definiciones de TypeScript
│   ├── App.tsx             # Componente principal de la aplicación
│   └── main.tsx            # Punto de entrada de React
├── public/                 # Archivos estáticos
├── docs/                   # Documentación del proyecto
├── .github/                # Configuración de GitHub Actions
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
├── tailwind.config.js      # Configuración de Tailwind CSS
├── docker-compose.yml      # Configuración de Docker Compose
├── Dockerfile              # Dockerfile para producción
├── Dockerfile.dev          # Dockerfile para desarrollo
└── package.json            # Dependencias y scripts

```

## 🏗️ Principios de Arquitectura

### 1. **Atomic Design Pattern**
El proyecto utiliza Atomic Design para organizar los componentes:

- **Atoms (Átomos)**: Componentes más básicos (Button, Input)
- **Molecules (Moléculas)**: Agrupaciones simples de átomos
- **Organisms (Organismos)**: Secciones complejas de la UI (Header, Hero, Footer)

### 2. **Separación de Responsabilidades**

```typescript
// ❌ Evitar: Lógica mezclada en el componente
function Component() {
  const validateEmail = (email) => { /* ... */ }
  const fetchData = () => { /* ... */ }
  // ...
}

// ✅ Correcto: Lógica separada
// hooks/useEmailValidation.ts
// lib/utils/validation.ts
// lib/api/dataService.ts
```

### 3. **TypeScript Estricto**
Todas las funciones y componentes están tipados:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 4. **Path Aliases**
Configurados en `vite.config.ts` y `tsconfig.json`:

```typescript
import { Button } from '@/components/atoms/Button';
import { useForm } from '@/hooks';
import { API_URL } from '@/lib/constants/config';
```

## 🛠️ Stack Tecnológico

### Core
- **React 18.3** - Biblioteca de UI
- **TypeScript 5.3** - Tipado estático
- **Vite 5.1** - Build tool y dev server

### Estilos
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - Procesador de CSS

### Gestión de Estado
- **Zustand 4.5** - State management ligero

### Formularios y Validación
- **React Hook Form 7.50** - Gestión de formularios
- **Zod 3.22** - Schema validation
- **@hookform/resolvers** - Integración Zod + React Hook Form

### Animaciones
- **Framer Motion 11.0** - Biblioteca de animaciones

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código (configurable)
- **Husky** - Git hooks (configuración preparada)

## 📦 Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Inicia servidor de desarrollo (puerto 3000)
npm run build           # Compila para producción
npm run preview         # Preview del build de producción
```

### Calidad de Código
```bash
npm run lint            # Ejecuta ESLint
npm run lint:fix        # Corrige problemas automáticamente
npm run type-check      # Verifica tipos de TypeScript
npm run format          # Formatea código con Prettier
npm run format:check    # Verifica formato sin modificar
```

### Docker
```bash
npm run docker:build        # Build imagen de producción
npm run docker:build:dev    # Build imagen de desarrollo
npm run docker:run          # Ejecuta contenedor de producción
npm run docker:run:dev      # Ejecuta contenedor de desarrollo
npm run compose:up          # Levanta servicios con docker-compose
npm run compose:down        # Detiene servicios
npm run compose:logs        # Ver logs de contenedores
```

### Utilidades
```bash
npm run clean           # Limpia dist y cache de Vite
npm run clean:all       # Limpia todo incluyendo node_modules
npm run analyze         # Analiza el bundle size
```

## 🔧 Configuración del Entorno

### Variables de Entorno
Crear un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=https://api.pibelabs.com
VITE_ANALYTICS_ID=your-analytics-id
```

**Importante**: Todas las variables en Vite deben empezar con `VITE_`

### Acceso en el Código
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
```

## 🎨 Guía de Estilos

### Tailwind CSS
El proyecto usa Tailwind CSS. Configuración en `tailwind.config.js`:

```javascript
// Personalización de tema
theme: {
  extend: {
    colors: {
      primary: '#...',
      secondary: '#...',
    },
  },
}
```

### Convenciones de Nombrado
- **Componentes**: PascalCase (`MyComponent.tsx`)
- **Archivos de utilidad**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Hooks personalizados**: camelCase con prefijo `use` (`useAuth.ts`)

## 🧪 Testing (Por Implementar)

El proyecto está preparado para agregar tests:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Estructura sugerida:
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── index.ts
```

## 🚀 Despliegue

### Vercel
```bash
npm run deploy:vercel
```

### Netlify
```bash
npm run deploy:netlify
```

### Docker (Producción)
```bash
docker build -t pibelabs-frontend:latest .
docker run -d -p 80:80 pibelabs-frontend:latest
```

## 📝 Mejores Prácticas

### 1. Componentes
```typescript
// ✅ Componente bien estructurado
import { FC } from 'react';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ 
  variant = 'primary',
  children,
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 2. Custom Hooks
```typescript
// hooks/useLocalStorage.ts
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Implementación
  return [value, setValue] as const;
};
```

### 3. Validación de Formularios
```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // ...
};
```

### 4. Gestión de Estado con Zustand
```typescript
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

## 🔒 Seguridad

- ✅ Variables de entorno no commiteadas (`.env` en `.gitignore`)
- ✅ TypeScript para prevenir errores en runtime
- ✅ Validación de formularios con Zod
- ✅ ESLint configurado para detectar problemas de seguridad

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev/guide)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## 🤝 Contribución

1. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commit de cambios: `git commit -m 'Add: nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abrir un Pull Request

### Convención de Commits
- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bugs
- `Update:` Actualización de funcionalidad existente
- `Refactor:` Refactorización de código
- `Docs:` Cambios en documentación
- `Style:` Cambios de formato (no afectan la lógica)
- `Test:` Agregar o actualizar tests
- `Chore:` Mantenimiento general

---

**Última actualización**: Octubre 2025
**Versión del proyecto**: 1.0.0
