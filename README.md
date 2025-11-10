# 🚀 PibeLabs Website

Este es el repositorio para el sitio web oficial de PibeLabs, una aplicación full-stack que consiste en un frontend moderno y un backend ligero para la gestión de leads.

- **Frontend**: Construido con React, TypeScript, y Vite. Estilizado con Tailwind CSS.
- **Backend**: Un conjunto de scripts PHP para manejar el envío de formularios de contacto y la integración con Google Sheets.

## ✨ Características Principales

- ⚡️ **Vite**: Build tool ultrarrápido para una experiencia de desarrollo moderna.
- ⚛️ **React 18**: Para construir una UI interactiva y eficiente.
- 🎯 **TypeScript**: Tipado estático para un código más robusto y mantenible.
- 🎨 **Tailwind CSS**: Framework CSS utility-first para un diseño rápido y personalizable.
- 🎭 **Framer Motion**: Animaciones fluidas y profesionales para una mejor experiencia de usuario.
- 📦 **Zustand**: Gestión de estado simple y potente.
- 📝 **React Hook Form + Zod**: Para la creación de formularios con validación de esquemas robusta.
- 🐳 **Docker**: Containerización lista para desarrollo y producción.
- ⚙️ **Calidad de Código Automatizada**: ESLint, Prettier y lint-staged configurados para ejecutarse antes de cada commit.

## 📋 Prerrequisitos

- Node.js 18+
- NPM (o un gestor de paquetes compatible)
- Para el backend: Un servidor con PHP habilitado (como el que provee Hostinger).

## 🚀 Inicio Rápido

1.  **Clonar el repositorio**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd pibelabs-frontend
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**
    Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y completa los valores.
    ```bash
    cp .env.example .env
    ```
    ```env
    # URL del script de Google Apps para la integración con Google Sheets
    VITE_GOOGLE_SHEETS_URL="https://script.google.com/macros/s/..."

    # ID de medición de Google Analytics 4
    VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

    # URL del endpoint del formulario de contacto en producción
    VITE_CONTACT_FORM_ENDPOINT="https://pibelabs.com/server/contact.php"
    ```

4.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```
    El sitio estará disponible en `http://localhost:3000`.

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Compila el proyecto para producción. |
| `npm run preview` | Sirve el build de producción localmente. |
| `npm run lint` | Ejecuta ESLint para analizar el código. |
| `npm run lint:fix` | Intenta corregir automáticamente los problemas de ESLint. |
| `npm run type-check` | Verifica los tipos de TypeScript sin emitir archivos. |
| `npm run format` | Formatea el código con Prettier. |
| `npm run format:check` | Comprueba si el código está formateado. |
| `npm run test` | Ejecuta las pruebas con Vitest. |
| `npm run test:ui` | Inicia la UI de Vitest para pruebas interactivas. |
| `npm run test:coverage` | Genera un reporte de cobertura de pruebas. |
| `npm run analyze` | Analiza el tamaño del bundle de producción. |
| `npm run clean` | Elimina el directorio `dist` y la caché de Vite. |
| `npm run clean:all` | Limpieza profunda, incluyendo `node_modules`. |
| `npm run optimize:images` | Optimiza los archivos SVG en `public/assets/images`. |

## 🐳 Comandos de Docker

| Comando | Descripción |
|---|---|
| `npm run docker:build` | Construye la imagen de Docker para producción. |
| `npm run docker:run` | Ejecuta el contenedor de producción. |
| `npm run compose:up` | Inicia los servicios con Docker Compose. |
| `npm run compose:down` | Detiene los servicios de Docker Compose. |

## 🎨 Stack Tecnológico

- **React, TypeScript, Vite**
- **Tailwind CSS, PostCSS**
- **Framer Motion** (animaciones)
- **Zustand** (manejo de estado)
- **React Hook Form, Zod** (formularios y validación)
- **Lucide React** (iconos)
- **React Hot Toast** (notificaciones)
- **PHP** (backend de servicios)

## 📝 Convención de Commits

Este proyecto sigue la convención de [Conventional Commits](https://www.conventionalcommits.org/). El hook pre-commit formateará y validará tu código automáticamente.

- `feat:` Nueva funcionalidad.
- `fix:` Corrección de un bug.
- `docs:` Cambios en la documentación.
- `style:` Cambios que no afectan el significado del código (formato, etc.).
- `refactor:` Un cambio de código que no arregla un bug ni añade una característica.
- `perf:` Un cambio de código que mejora el rendimiento.
- `test:` Añadir pruebas o corregir pruebas existentes.
- `chore:` Cambios en el proceso de build o herramientas auxiliares.

## 📚 Documentación Detallada

Para más detalles sobre la arquitectura, despliegue y configuraciones específicas, consulta la carpeta `/docs`:

- **[Arquitectura del Proyecto](./docs/ARCHITECTURE.md)**
- **[Configuración del Deploy](./docs/DEPLOY_SETUP.md)**
- **[Integración con Google Sheets y Analytics](./docs/GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md)**
- **[Configuración del Formulario de Contacto](./docs/HOSTINGER_CONTACT_FORM.md)**