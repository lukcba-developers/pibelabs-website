# Guía de Desarrollo - PibeLabs Frontend

## 🎯 Inicio Rápido para Desarrolladores

### Setup Inicial

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd pibelabs-frontend

# 2. Instalar dependencias (IMPORTANTE: usar --production=false)
npm install --production=false

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará corriendo en: http://localhost:3000

## 📝 Flujo de Trabajo

### 1. Crear un Nuevo Componente

#### Estructura de Carpetas
Cada componente debe seguir esta estructura:

```
components/
└── atoms/Button/
    ├── Button.tsx          # Componente principal
    ├── Button.types.ts     # Tipos TypeScript (opcional)
    ├── Button.test.tsx     # Tests (futuro)
    └── index.ts            # Export del componente
```

#### Ejemplo: Crear un Botón

**Button.tsx**
```typescript
import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
};
```

**index.ts**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### 2. Crear un Custom Hook

**hooks/useLocalStorage.ts**
```typescript
import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

**hooks/index.ts** (Exportar todos los hooks)
```typescript
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
// ... más hooks
```

### 3. Trabajar con Formularios

#### Ejemplo con React Hook Form + Zod

**lib/validation/schemas.ts**
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**components/organisms/ContactForm/ContactForm.tsx**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validation/schemas';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Enviar datos al API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('Mensaje enviado!');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          placeholder="Nombre"
          error={errors.name?.message}
        />
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          error={errors.email?.message}
        />
      </div>

      <div>
        <textarea
          {...register('message')}
          placeholder="Mensaje"
          className="w-full p-2 border rounded"
          rows={4}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
};
```

### 4. Gestión de Estado con Zustand

**lib/stores/authStore.ts**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

**Uso en componentes:**
```typescript
import { useAuthStore } from '@/lib/stores/authStore';

function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Hola, {user?.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <a href="/login">Iniciar sesión</a>
      )}
    </header>
  );
}
```

### 5. Animaciones con Framer Motion

**Ejemplo de animación básica:**
```typescript
import { motion } from 'framer-motion';

export const AnimatedCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="card"
    >
      <h3>Card Title</h3>
      <p>Card content</p>
    </motion.div>
  );
};
```

**Animación de lista:**
```typescript
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export const AnimatedList = ({ items }) => {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      {items.map((item) => (
        <motion.li key={item.id} variants={item}>
          {item.title}
        </motion.li>
      ))}
    </motion.ul>
  );
};
```

## 🎨 Estilos con Tailwind CSS

### Convenciones

1. **Usar clases de utilidad directamente en JSX**
```typescript
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-2xl font-bold text-gray-800">Título</h2>
</div>
```

2. **Para estilos complejos, usar @apply en CSS**
```css
/* styles/components.css */
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
}
```

3. **Responsive design**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Contenido */}
</div>
```

### Personalización del Tema

Editar `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
};
```

## 🔍 Debugging y Desarrollo

### React DevTools
Instalar extensión de navegador para debugging de React

### TypeScript Errors
```bash
# Verificar errores de tipos
npm run type-check
```

### Linting
```bash
# Ver errores
npm run lint

# Corregir automáticamente
npm run lint:fix
```

### Performance
```bash
# Analizar bundle size
npm run analyze
```

## 📦 Agregar una Nueva Dependencia

```bash
# Dependencia de producción
npm install nombre-del-paquete

# Dependencia de desarrollo
npm install -D nombre-del-paquete
```

**Importante:** Actualizar documentación si agregas una dependencia importante.

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Limpiar y reinstalar
npm run clean:all
npm install --production=false
```

### Puerto 3000 ocupado
```bash
# Cambiar puerto en vite.config.ts
server: {
  port: 3001,
}
```

### Errores de TypeScript
```bash
# Verificar tsconfig.json
# Asegurarse de que los path aliases estén configurados
```

## 🚀 Antes de Hacer un Commit

```bash
# 1. Verificar TypeScript
npm run type-check

# 2. Ejecutar linter
npm run lint

# 3. Verificar que el build funciona
npm run build

# 4. (Opcional) Formatear código
npm run format
```

## 📚 Recursos de Aprendizaje

- [React Docs](https://react.dev) - Documentación oficial de React
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - Aprender TypeScript
- [Tailwind CSS](https://tailwindcss.com/docs) - Documentación de Tailwind
- [Framer Motion](https://www.framer.com/motion) - Guía de animaciones
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Hook Form](https://react-hook-form.com) - Gestión de formularios

## 💡 Tips de Productividad

1. **Usar path aliases** para imports más limpios:
   ```typescript
   import { Button } from '@/components/atoms/Button';
   ```

2. **Aprovechar TypeScript** para autocompletado y detección de errores

3. **Usar snippets** de tu editor para componentes comunes

4. **Hot reload**: Los cambios se reflejan automáticamente sin recargar

5. **ESLint**: Prestar atención a las advertencias del linter

---

**¿Preguntas?** Consulta la [documentación de arquitectura](./ARCHITECTURE.md) o pregunta al equipo.
