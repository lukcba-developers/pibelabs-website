# 🚀 GUÍA DE DEPLOYMENT - PibeLabs Frontend

## 📋 Tabla de Contenidos

1. [Preparación Pre-Deployment](#preparacion)
2. [Deployment en Vercel](#vercel)
3. [Deployment en Netlify](#netlify)
4. [Deployment con Docker](#docker)
5. [Deployment en AWS](#aws)
6. [Deployment en GitHub Pages](#github-pages)
7. [CI/CD con GitHub Actions](#cicd)
8. [Optimizaciones de Producción](#optimizaciones)
9. [Monitoreo y Analytics](#monitoreo)
10. [Troubleshooting](#troubleshooting)

---

## <a name="preparacion"></a>🔧 1. Preparación Pre-Deployment

### Checklist Antes de Deployar

- [ ] Todas las pruebas pasan (`npm run test`)
- [ ] No hay errores de TypeScript (`npm run type-check`)
- [ ] No hay errores de ESLint (`npm run lint`)
- [ ] Build funciona sin errores (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Assets optimizados (imágenes comprimidas)
- [ ] Meta tags y SEO configurados
- [ ] Sitemap.xml generado
- [ ] robots.txt configurado
- [ ] Favicon y assets públicos listos

### Variables de Entorno

Crea un archivo `.env.production`:

```env
# API Configuration
VITE_API_URL=https://api.pibelabs.com

# Analytics
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTAG_ID=GTM-XXXXXXX

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_BLOG=true
```

---

## <a name="vercel"></a>⚡ 2. Deployment en Vercel (Recomendado)

### Por qué Vercel?

✅ Deploy automático desde Git
✅ Preview deployments en PRs
✅ Edge network global (CDN)
✅ SSL automático
✅ Rollbacks fáciles
✅ Analytics incluido

### Opción A: Desde la Web

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Agrega variables de entorno
6. Click en "Deploy"

### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## <a name="netlify"></a>🌐 3. Deployment en Netlify

### Por qué Netlify?

✅ Deploy automático desde Git
✅ Forms nativas (útil para contact)
✅ Redirects y rewrites fáciles
✅ Split testing (A/B)
✅ Deploy previews

### Opción A: Desde la Web

1. Ve a [netlify.com](https://netlify.com)
2. Click en "Add new site"
3. Conecta tu repositorio
4. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click en "Deploy site"

### Opción B: Desde CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Configuración (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## <a name="docker"></a>🐳 4. Deployment con Docker

### Por qué Docker?

✅ Consistencia entre ambientes
✅ Fácil escalabilidad
✅ Portable a cualquier cloud
✅ Control total del entorno

### Build de la Imagen

```bash
# Build imagen de producción
docker build -t pibelabs-frontend:latest .

# Build imagen de desarrollo
docker build -f Dockerfile.dev -t pibelabs-frontend:dev .
```

### Ejecutar Container

```bash
# Producción
docker run -d -p 80:80 pibelabs-frontend:latest

# Desarrollo
docker run -d -p 3000:3000 -v $(pwd):/app pibelabs-frontend:dev
```

### Con Docker Compose

```bash
# Desarrollo
docker-compose up frontend-dev

# Producción
docker-compose up frontend-prod

# Background
docker-compose up -d frontend-prod

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Push a Docker Hub

```bash
# Tag
docker tag pibelabs-frontend:latest pibelabs/frontend:latest

# Login
docker login

# Push
docker push pibelabs/frontend:latest
```

---

## <a name="aws"></a>☁️ 5. Deployment en AWS

### Opción A: S3 + CloudFront

#### Paso 1: Build

```bash
npm run build
```

#### Paso 2: Crear Bucket S3

```bash
aws s3 mb s3://pibelabs-frontend
aws s3 website s3://pibelabs-frontend --index-document index.html
```

#### Paso 3: Upload

```bash
aws s3 sync dist/ s3://pibelabs-frontend --delete
```

#### Paso 4: CloudFront (CDN)

1. Crear distribución CloudFront
2. Origin: S3 bucket
3. Redirect HTTP → HTTPS
4. Custom error page: 404 → /index.html

### Opción B: Amplify

```bash
# Instalar Amplify CLI
npm i -g @aws-amplify/cli

# Configurar
amplify init

# Agregar hosting
amplify add hosting

# Deploy
amplify publish
```

### Opción C: ECS (Docker)

```bash
# Build y push a ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com

docker build -t pibelabs-frontend .
docker tag pibelabs-frontend:latest <account>.dkr.ecr.<region>.amazonaws.com/pibelabs-frontend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/pibelabs-frontend:latest

# Crear servicio ECS
# (usar AWS Console o CLI)
```

---

## <a name="github-pages"></a>📄 6. Deployment en GitHub Pages

### Configuración

1. Edita `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nombre-repo/', // Si no es custom domain
  // ...
});
```

2. Crea workflow `.github/workflows/deploy-gh-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Configura GitHub Pages:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

---

## <a name="cicd"></a>🔄 7. CI/CD con GitHub Actions

### Workflow Completo

El proyecto ya incluye `.github/workflows/ci-cd.yml` que:

✅ Ejecuta linting y type-check
✅ Build del proyecto
✅ Tests de seguridad
✅ Deploy automático a Vercel
✅ Preview deployments en PRs
✅ Performance budgets
✅ Lighthouse CI

### Configurar Secrets

En GitHub → Settings → Secrets:

```
VERCEL_TOKEN=xxxxx
VERCEL_ORG_ID=xxxxx
VERCEL_PROJECT_ID=xxxxx
LHCI_GITHUB_APP_TOKEN=xxxxx
```

---

## <a name="optimizaciones"></a>⚡ 8. Optimizaciones de Producción

### 1. Compresión de Assets

```bash
# Instalar
npm install -D vite-plugin-compression

# En vite.config.ts
import viteCompression from 'vite-plugin-compression';

plugins: [
  viteCompression({
    algorithm: 'gzip',
    ext: '.gz',
  }),
  viteCompression({
    algorithm: 'brotliCompress',
    ext: '.br',
  }),
]
```

### 2. Preload Critical Resources

```html
<!-- En index.html -->
<link rel="preload" href="/assets/font.woff2" as="font" type="font/woff2" crossorigin>
```

### 3. Image Optimization

```bash
# Instalar
npm install -D vite-plugin-image-optimizer

# Usar en vite.config.ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

plugins: [ViteImageOptimizer()]
```

### 4. Code Splitting

```typescript
// Lazy load rutas
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
```

### 5. Bundle Analysis

```bash
# Generar reporte
npm run build -- --report

# O con visualizer
npm install -D rollup-plugin-visualizer
```

---

## <a name="monitoreo"></a>📊 9. Monitoreo y Analytics

### Google Analytics 4

```typescript
// src/lib/analytics.ts
import ReactGA from 'react-ga4';

export function initGA() {
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
}

export function logPageView() {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
}
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-dsn',
  environment: import.meta.env.MODE,
});
```

### Web Vitals

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to analytics
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## <a name="troubleshooting"></a>🔧 10. Troubleshooting

### Build Fails

**Error: Out of memory**
```bash
# Aumentar memoria de Node
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

**Error: Module not found**
```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
```

### Routing 404s

**Solución en Vercel/Netlify**: Ya configurado en vercel.json/netlify.toml

**Solución en S3**: CloudFront error pages → 404 redirect a /index.html

### Slow Load Times

1. Verificar bundle size: `npm run build`
2. Lazy load componentes
3. Optimizar imágenes
4. Habilitar CDN
5. Usar code splitting

### Environment Variables No Funcionan

- Deben empezar con `VITE_`
- Reiniciar dev server después de cambios
- En producción: configurar en plataforma de hosting

---

## 📝 Scripts Útiles de Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css}\"",
    "analyze": "vite build --mode analyze"
  }
}
```

---

## ✅ Deployment Checklist Final

- [ ] Build sin errores
- [ ] Tests pasando
- [ ] Variables de entorno configuradas
- [ ] Analytics configurado
- [ ] Error tracking configurado
- [ ] SEO optimizado
- [ ] Performance optimizada
- [ ] Security headers configurados
- [ ] SSL/HTTPS habilitado
- [ ] Custom domain configurado
- [ ] Backups configurados
- [ ] Monitoring activo
- [ ] CI/CD funcionando

---

## 🎉 ¡Listo para Producción!

Tu sitio está ahora deployado y optimizado. 

**URLs de Ejemplo:**
- Vercel: `https://pibelabs.vercel.app`
- Netlify: `https://pibelabs.netlify.app`
- Custom: `https://pibelabs.com`

---

**Próximos Pasos:**
1. Configurar dominio custom
2. Habilitar analytics
3. Configurar monitoring
4. Setup backups
5. Documentar proceso para el equipo

🚀 **Building the Future, Deployed Everywhere**
