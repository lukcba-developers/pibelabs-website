# Arquitectura del Proyecto - PibeLabs Website

Este documento describe la arquitectura del sitio web de PibeLabs, un proyecto full-stack compuesto por un frontend de React y un backend de servicios en PHP.

## 📁 Estructura del Proyecto

```
pibelabs-frontend/
├── src/                  # Código fuente del frontend (React + TypeScript)
│   ├── components/       # Componentes React organizados por Atomic Design
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Librerías, constantes y utilidades
│   ├── styles/           # Estilos globales y configuración de Tailwind
│   └── ...
├── public/               # Archivos estáticos (imágenes, sitemap, etc.)
├── server/               # Backend de servicios en PHP
│   ├── contact.php       # Endpoint para el formulario de contacto
│   └── google-sheets-integration.php # Lógica para enviar datos a Google Sheets
├── docs/                 # Documentación del proyecto
├── .github/              # Workflows de GitHub Actions (CI/CD)
├── .husky/               # Configuración de Git Hooks (pre-commit)
├── Dockerfile            # Dockerfile para producción
├── docker-compose.yml    # Configuración de Docker Compose
├── package.json          # Dependencias y scripts del proyecto
└── vite.config.ts        # Configuración de Vite
```

## 🏗️ Arquitectura General

El sistema se divide en dos componentes principales:

1.  **Frontend (Cliente)**: Una Single-Page Application (SPA) construida con **React** y **Vite**. Es responsable de toda la interfaz de usuario, las interacciones y la experiencia visual. Se comunica con el backend a través de llamadas API (fetch) para tareas específicas como el envío de formularios.

2.  **Backend (Servidor)**: Un conjunto de micro-servicios sin estado escritos en **PHP**, alojados en el mismo servidor que el frontend (ej. Hostinger). Su única responsabilidad es procesar solicitudes específicas que no pueden manejarse en el cliente, como el envío de correos y la comunicación con APIs de terceros (Google Sheets).

### Flujo de Datos del Formulario de Contacto

1.  **Usuario** completa y envía el formulario en el frontend de React.
2.  **React Hook Form** y **Zod** validan los datos en el cliente.
3.  El frontend realiza una petición `POST` al endpoint `server/contact.php`.
4.  El script `contact.php` sanitiza los datos y envía un correo electrónico al equipo de PibeLabs.
5.  Simultáneamente, `contact.php` puede invocar a `google-sheets-integration.php`, que a su vez envía los datos a un Google Apps Script para registrar el lead en una hoja de cálculo.
6.  El backend responde al frontend con un estado de éxito o error.

## ⚛️ Arquitectura del Frontend

### 1. Atomic Design

Los componentes se organizan siguiendo la metodología de Atomic Design para maximizar la reutilización y la consistencia.

-   **Atoms**: Componentes indivisibles (`Button`, `Input`, `LazyImage`).
-   **Molecules**: Combinaciones simples de átomos que forman componentes funcionales (`Newsletter`, `Card`).
-   **Organisms**: Secciones complejas de la UI que agrupan moléculas y/o átomos (`Header`, `Hero`, `ContactForm`).

### 2. Gestión de Estado con Zustand

Para el estado global (como el estado del menú móvil), se utiliza **Zustand**. Es una solución ligera y sin boilerplate que permite crear "stores" reactivos.

```typescript
// Ejemplo de un store simple
import { create } from 'zustand';

interface MobileMenuStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
```

### 3. Path Aliases

Configurados en `vite.config.ts` y `tsconfig.json` para importaciones más limpias.

```typescript
import { Button } from '@/components/atoms/Button';
import { useScrollAnimations } from '@/hooks/animations';
```

## 🐘 Arquitectura del Backend (PHP)

El backend es deliberadamente simple y está diseñado para funcionar en entornos de hosting compartido como Hostinger.

-   **Stateless**: Cada script se ejecuta de forma independiente y no comparte estado.
-   **Single Responsibility**: Cada archivo tiene un propósito claro (`contact.php` para emails, `google-sheets-integration.php` para Sheets).
-   **Seguridad**:
    -   Se sanitizan todas las entradas del usuario.
    -   Se configuran cabeceras CORS para permitir peticiones solo desde el dominio del frontend (aunque el ejemplo actual es `*`, se recomienda restringirlo).
    -   No se exponen credenciales sensibles; se configuran en el entorno del servidor si es posible.

## 🛠️ Stack Tecnológico Detallado

-   **Core Frontend**: React 18, TypeScript, Vite
-   **Estilos**: Tailwind CSS, PostCSS
-   **Animaciones**: Framer Motion
-   **Formularios**: React Hook Form + Zod
-   **Iconos**: Lucide React
-   **Notificaciones**: React Hot Toast
-   **Backend**: PHP
-   **Calidad de Código**: ESLint, Prettier, lint-staged, Husky
-   **Contenerización**: Docker, Docker Compose

## 📦 Scripts y Calidad de Código

La calidad del código se mantiene mediante un conjunto de herramientas y scripts que se ejecutan tanto manualmente como de forma automática.

-   **`npm run lint` / `npm run format`**: Para análisis y formateo manual.
-   **Hook `pre-commit`**: Gracias a **Husky** y **lint-staged**, antes de cada `git commit`, se ejecutan automáticamente `eslint` y `prettier` sobre los archivos modificados. Esto asegura que no se introduzca código con errores de estilo o sintaxis al repositorio.

La lista completa y actualizada de scripts se encuentra en el `README.md` principal.

## 🧪 Testing

El proyecto está configurado con **Vitest** para pruebas unitarias y de componentes.

-   **Ejecución**: `npm test` o `npm run test:ui` para la interfaz gráfica.
-   **Estructura**: Los archivos de prueba (`*.test.tsx`) se colocan junto a los componentes que prueban para facilitar su localización.
-   **Cobertura**: Se puede generar un informe de cobertura con `npm run test:coverage`.

## 🚀 Despliegue (CI/CD)

El despliegue está automatizado con **GitHub Actions**.

-   **Triggers**: El workflow de despliegue se activa en cada `push` a la rama `main`.
-   **Proceso**:
    1.  El job instala las dependencias.
    2.  Se ejecutan las verificaciones de calidad (`lint`, `type-check`).
    3.  Se construye el proyecto de React (`npm run build`).
    4.  Los archivos estáticos generados en la carpeta `dist/` se suben al servidor (ej. Hostinger) vía FTP.
    5.  Los scripts de la carpeta `server/` se suben junto con el resto del código.

Para más detalles, consulta `/.github/workflows/ci-cd.yml` y `docs/DEPLOY_SETUP.md`.