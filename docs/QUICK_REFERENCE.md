# 🚀 Quick Reference - PibeLabs Frontend

## Comandos Más Usados

```bash
# Iniciar desarrollo
npm run dev

# Build de producción
npm run build

# Limpiar y reinstalar
npm run clean:all && npm install --production=false

# Verificar código
npm run type-check && npm run lint
```

## Estructura de Imports

```typescript
// Path aliases configurados
import { Button } from '@/components/atoms/Button';
import { useAuth } from '@/hooks';
import { API_URL } from '@/lib/constants/config';
import { validateEmail } from '@/lib/utils';
import type { User } from '@/types';
```

## Crear Nuevo Componente

```bash
# Estructura recomendada
mkdir -p src/components/atoms/NuevoComponente
touch src/components/atoms/NuevoComponente/{index.ts,NuevoComponente.tsx}
```

```typescript
// NuevoComponente.tsx
import { FC } from 'react';

interface NuevoComponenteProps {
  // props aquí
}

export const NuevoComponente: FC<NuevoComponenteProps> = (props) => {
  return <div>Componente</div>;
};

// index.ts
export { NuevoComponente } from './NuevoComponente';
```

## Formulario con Validación

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Enviar</button>
    </form>
  );
};
```

## Estado Global (Zustand)

```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Uso
const MyComponent = () => {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
};
```

## Animaciones Framer Motion

```typescript
import { motion } from 'framer-motion';

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>

// Slide up
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// Hover scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

## Tailwind CSS Classes Comunes

```typescript
// Layout
className="flex items-center justify-between"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
className="container mx-auto px-4"

// Spacing
className="p-4 m-2"
className="px-6 py-3"
className="space-y-4"

// Typography
className="text-2xl font-bold text-gray-800"
className="text-sm text-gray-600"

// Buttons
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"

// Cards
className="bg-white rounded-lg shadow-lg p-6"

// Responsive
className="hidden md:block"
className="w-full md:w-1/2 lg:w-1/3"
```

## Variables de Entorno

```env
# .env
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=PibeLabs
```

```typescript
// Acceso en código
const apiUrl = import.meta.env.VITE_API_URL;
const isProd = import.meta.env.PROD;
```

## Solución de Problemas

```bash
# Error de módulos
rm -rf node_modules package-lock.json
npm install --production=false

# Puerto ocupado
# Cambiar en vite.config.ts: server.port

# Cache de Vite
npm run clean
npm run dev

# Errores de TypeScript
npm run type-check
```

## Git Workflow

```bash
# Nueva feature
git checkout -b feature/nombre-feature
git add .
git commit -m "Add: nueva funcionalidad"
git push origin feature/nombre-feature

# Convención de commits
# Add: nueva funcionalidad
# Fix: corrección de bug
# Update: actualización
# Refactor: refactorización
# Docs: documentación
```

## Docker

```bash
# Desarrollo
docker-compose up -d

# Producción
docker build -t pibelabs-frontend .
docker run -d -p 80:80 pibelabs-frontend

# Logs
docker-compose logs -f
```

## URLs Útiles

- **Dev Server**: http://localhost:3000
- **Docs**: /docs/
- **Tailwind**: https://tailwindcss.com
- **React**: https://react.dev
- **TypeScript**: https://typescriptlang.org

---

💡 **Tip**: Guarda este archivo en marcadores para acceso rápido
