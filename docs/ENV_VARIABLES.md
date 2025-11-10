# 🔐 Variables de Entorno - Documentación Completa

**Última actualización:** Sprint 4 (2025-11-10)

Esta documentación detalla todas las variables de entorno disponibles en el proyecto PibeLabs Frontend, cómo configurarlas, y dónde se usan.

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración Básica](#configuración-básica)
3. [Variables por Categoría](#variables-por-categoría)
4. [Configuración por Entorno](#configuración-por-entorno)
5. [Seguridad](#seguridad)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Introducción

### ¿Qué son las Variables de Entorno?

Las variables de entorno son configuraciones que permiten personalizar el comportamiento de la aplicación sin modificar el código fuente. En Vite, todas las variables expuestas al navegador deben tener el prefijo `VITE_`.

### Archivo de Configuración

El proyecto usa archivos `.env`:

```
.env                 # Variables para desarrollo local (NO commitear)
.env.example         # Plantilla con todas las variables disponibles (SÍ commitear)
.env.production      # Variables para producción (NO commitear)
.env.staging         # Variables para staging (NO commitear)
```

---

## ⚙️ Configuración Básica

### Paso 1: Crear archivo .env

```bash
# En la raíz del proyecto
cp .env.example .env
```

### Paso 2: Editar variables

Abre `.env` y personaliza los valores:

```env
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
VITE_CONTACT_EMAIL=contact@tuempresa.com
# ... etc
```

### Paso 3: Reiniciar servidor

**IMPORTANTE:** Después de cambiar variables, siempre reinicia:

```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

### Paso 4: Acceder en el código

```typescript
// Correcto
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Incorrecto (no funciona en Vite)
const gaId = process.env.VITE_GA_MEASUREMENT_ID;
```

---

## 📊 Variables por Categoría

### 🔍 Google Analytics 4

#### VITE_GA_MEASUREMENT_ID

**Descripción:** ID de medición de Google Analytics 4 para tracking de eventos y conversiones.

**Tipo:** `string`
**Requerido:** ❌ No (pero recomendado para analytics)
**Formato:** `G-XXXXXXXXXX` (G- seguido de 10 caracteres)
**Ejemplo:** `G-ABC123XYZ7`

**Dónde se usa:**
- `src/lib/analytics/googleAnalytics.ts:50-52` - Función `getGAMeasurementId()`
- `src/lib/analytics/googleAnalytics.ts:62-94` - Función `initGA()`
- `src/App.tsx:7` - Importación y uso de `initGA()`

**Cómo obtenerlo:**
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Admin → Flujos de datos → Tu flujo web
3. Copia el **Measurement ID**

**Testing:**
```bash
# Verifica que esté configurada
echo $VITE_GA_MEASUREMENT_ID

# En el navegador (DevTools Console)
console.log(import.meta.env.VITE_GA_MEASUREMENT_ID);
```

**Documentación relacionada:**
- [docs/ANALYTICS_CONFIGURATION.md](./ANALYTICS_CONFIGURATION.md)
- [docs/GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md](./GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md)

---

### 🏢 Información de la Empresa

#### VITE_COMPANY_NAME

**Descripción:** Nombre de la empresa (usado en metadata y SEO).

**Tipo:** `string`
**Requerido:** ✅ Sí
**Default:** `PibeLabs`
**Ejemplo:** `PibeLabs`

**Dónde se usa:**
- `src/components/atoms/SEO/SEO.tsx` - Meta tags
- `src/components/organisms/Footer/Footer.tsx` - Copyright

---

#### VITE_CONTACT_EMAIL

**Descripción:** Email de contacto de la empresa.

**Tipo:** `string` (email válido)
**Requerido:** ✅ Sí
**Ejemplo:** `contact@pibelabs.com`

**Dónde se usa:**
- `src/lib/constants/config.ts:70` - `COMPANY_INFO.email`
- `src/components/organisms/ContactForm/ContactForm.tsx` - Envío de formulario
- `src/components/organisms/Footer/Footer.tsx` - Enlaces de contacto

---

#### VITE_PHONE

**Descripción:** Teléfono de contacto de la empresa.

**Tipo:** `string`
**Requerido:** ❌ No
**Formato:** `+XX XX XXXX-XXXX` (con espacios y guiones para visualización)
**Ejemplo:** `+54 11 1234-5678`

**Dónde se usa:**
- `src/lib/constants/config.ts:71` - `COMPANY_INFO.phone`
- `src/components/organisms/Footer/Footer.tsx` - Información de contacto

---

#### VITE_SITE_URL

**Descripción:** URL completa del sitio web (usado en SEO y Open Graph).

**Tipo:** `string` (URL válida)
**Requerido:** ✅ Sí
**Formato:** `https://dominio.com` (sin `/` al final)
**Ejemplo:** `https://pibelabs.com`

**Dónde se usa:**
- `src/components/atoms/SEO/SEO.tsx` - Meta tags Open Graph
- Sitemap generation (si aplica)
- Canonical URLs

---

### 📱 WhatsApp

#### VITE_WHATSAPP_PHONE

**Descripción:** Número de WhatsApp para el widget de contacto.

**Tipo:** `string`
**Requerido:** ❌ No (pero recomendado si usas WhatsAppWidget)
**Formato:** `[código país][código área][número]` (sin espacios, sin + inicial)
**Ejemplo:** `5491112345678` (Argentina: 54 + 9 + 11 + 12345678)

**Dónde se usa:**
- `src/App.tsx:114` - WhatsAppWidget component
- `src/components/atoms/WhatsAppWidget/WhatsAppWidget.tsx` - Props

**Formato por país:**
```
Argentina:   5491112345678  (54 + 9 + código área + número)
España:      34612345678    (34 + número)
México:      5215512345678  (52 + 1 + código área + número)
Colombia:    573001234567   (57 + código área + número)
Chile:       56912345678    (56 + número)
```

**Documentación:** [WhatsApp Click to Chat](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)

---

#### VITE_WHATSAPP_MESSAGE

**Descripción:** Mensaje pre-rellenado cuando se abre WhatsApp.

**Tipo:** `string`
**Requerido:** ❌ No
**Default:** `"¡Hola! Me gustaría obtener más información sobre sus servicios."`
**Ejemplo:** `"Hola, quiero información sobre sus servicios de desarrollo web."`

**Dónde se usa:**
- `src/App.tsx:115` - WhatsAppWidget component
- `src/components/atoms/WhatsAppWidget/WhatsAppWidget.tsx` - Query parameter

**Nota:** El mensaje se URL-encodea automáticamente.

---

### 🔗 Redes Sociales

#### VITE_LINKEDIN_URL

**Descripción:** URL de la página de LinkedIn de la empresa.

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No
**Formato:** `https://linkedin.com/company/nombre-empresa`
**Ejemplo:** `https://linkedin.com/company/pibelabs`

**Dónde se usa:**
- `src/lib/constants/config.ts:73-78` - `COMPANY_INFO.social.linkedin`
- `src/components/organisms/Footer/Footer.tsx` - Íconos de redes sociales
- `src/components/organisms/Header/Header.tsx` - Enlaces de redes

---

#### VITE_GITHUB_URL

**Descripción:** URL de la organización o usuario de GitHub.

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No
**Formato:** `https://github.com/nombre-usuario-o-org`
**Ejemplo:** `https://github.com/pibelabs`

**Dónde se usa:**
- `src/lib/constants/config.ts:73-78` - `COMPANY_INFO.social.github`
- `src/components/organisms/Footer/Footer.tsx` - Íconos de redes sociales

---

#### VITE_TWITTER_URL

**Descripción:** URL de la cuenta de Twitter/X de la empresa.

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No
**Formato:** `https://twitter.com/nombre-usuario`
**Ejemplo:** `https://twitter.com/pibelabs`

**Dónde se usa:**
- `src/lib/constants/config.ts:73-78` - `COMPANY_INFO.social.twitter`
- `src/components/organisms/Footer/Footer.tsx` - Íconos de redes sociales

---

#### VITE_INSTAGRAM_URL

**Descripción:** URL del perfil de Instagram de la empresa.

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No
**Formato:** `https://instagram.com/nombre-usuario`
**Ejemplo:** `https://instagram.com/pibelabs`

**Dónde se usa:**
- `src/lib/constants/config.ts:73-78` - `COMPANY_INFO.social.instagram`
- `src/components/organisms/Footer/Footer.tsx` - Íconos de redes sociales

---

#### VITE_FACEBOOK_URL

**Descripción:** URL de la página de Facebook de la empresa.

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No
**Formato:** `https://facebook.com/nombre-pagina`
**Ejemplo:** `https://facebook.com/pibelabs`

**Dónde se usa:**
- `src/lib/constants/config.ts:73-78` - `COMPANY_INFO.social.facebook`
- `src/components/organisms/Footer/Footer.tsx` - Íconos de redes sociales

---

### 🌐 API Configuration

#### VITE_API_URL

**Descripción:** URL base del backend API (si aplica).

**Tipo:** `string` (URL válida)
**Requerido:** ❌ No (actualmente no hay backend propio)
**Formato:** `https://api.dominio.com/api/v1`
**Ejemplo:** `http://localhost:5000/api/v1` (desarrollo)

**Dónde se usa:**
- Actualmente NO se usa (el formulario va directo a Hostinger PHP)
- Reservado para futura implementación de backend propio

**Nota:** Para el formulario de contacto, ver `docs/HOSTINGER_CONTACT_FORM.md`

---

### 🐛 Error Tracking (Sentry)

#### VITE_SENTRY_DSN

**Descripción:** Data Source Name de Sentry para error tracking.

**Tipo:** `string`
**Requerido:** ❌ No (opcional, para producción)
**Formato:** `https://[key]@[org].ingest.sentry.io/[project]`
**Ejemplo:** `https://abc123@o123456.ingest.sentry.io/789012`

**Cómo obtenerlo:**
1. Crea cuenta en [Sentry.io](https://sentry.io/)
2. Crea un proyecto
3. Ve a Settings → Client Keys (DSN)
4. Copia el DSN

**Dónde se usaría:**
- Actualmente NO implementado
- Para implementar: Ver [Sentry Vite docs](https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/vite/)

---

#### VITE_SENTRY_ENVIRONMENT

**Descripción:** Nombre del entorno para Sentry.

**Tipo:** `string`
**Requerido:** ❌ No
**Valores:** `development` | `staging` | `production`
**Ejemplo:** `production`

**Uso:** Permite filtrar errores por entorno en Sentry dashboard.

---

### 🚩 Feature Flags

#### VITE_ENABLE_BLOG

**Descripción:** Habilitar/deshabilitar sección de blog.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true`
**Valores:** `true` | `false`

**Dónde se usaría:**
- `src/App.tsx` - Renderizado condicional de BlogSection

**Ejemplo de implementación:**
```typescript
{import.meta.env.VITE_ENABLE_BLOG === 'true' && <BlogSection />}
```

---

#### VITE_ENABLE_PORTFOLIO

**Descripción:** Habilitar/deshabilitar sección de portfolio.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true`
**Valores:** `true` | `false`

---

#### VITE_ENABLE_TESTIMONIALS

**Descripción:** Habilitar/deshabilitar sección de testimonios.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true`
**Valores:** `true` | `false`

---

#### VITE_ENABLE_CONTACT_FORM

**Descripción:** Habilitar/deshabilitar formulario de contacto.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true`
**Valores:** `true` | `false`

---

### ⚡ Performance Monitoring

#### VITE_ENABLE_WEB_VITALS

**Descripción:** Habilitar monitoreo de Web Vitals (LCP, FID, CLS, etc.).

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true`
**Valores:** `true` | `false`

**Dónde se usa:**
- `src/App.tsx:8` - `reportWebVitals()`
- `src/lib/performance/webVitals.ts`

**Métricas rastreadas:**
- **LCP** (Largest Contentful Paint) - Velocidad de carga
- **FID** (First Input Delay) - Interactividad
- **CLS** (Cumulative Layout Shift) - Estabilidad visual
- **FCP** (First Contentful Paint) - Primera pintura
- **TTFB** (Time to First Byte) - Tiempo de respuesta

---

#### VITE_WEB_VITALS_LOG

**Descripción:** Mostrar logs de Web Vitals en consola.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `false`
**Valores:** `true` | `false`

**Uso:** Útil en desarrollo para ver métricas en tiempo real.

---

### 🛠️ Development Settings

#### VITE_ENV

**Descripción:** Entorno de ejecución.

**Tipo:** `string`
**Requerido:** ❌ No
**Default:** `development`
**Valores:** `development` | `staging` | `production`

**Uso:** Permite comportamientos diferentes por entorno.

---

#### VITE_PORT

**Descripción:** Puerto del servidor de desarrollo.

**Tipo:** `number`
**Requerido:** ❌ No
**Default:** `3000` (configurado en `vite.config.ts`)
**Ejemplo:** `5173`

**Configuración en vite.config.ts:**
```typescript
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
  }
});
```

---

#### VITE_OPEN

**Descripción:** Auto-abrir navegador al iniciar servidor.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `true` (configurado en `vite.config.ts`)
**Valores:** `true` | `false`

---

### 📱 Social Media Analytics

#### VITE_FB_PIXEL_ID

**Descripción:** ID del pixel de Facebook para tracking de ads.

**Tipo:** `string`
**Requerido:** ❌ No
**Formato:** Número de 15-16 dígitos
**Ejemplo:** `123456789012345`

**Cómo obtenerlo:**
1. Ve a [Facebook Business Manager](https://business.facebook.com/)
2. Events Manager → Pixels
3. Copia el Pixel ID

**Dónde se usaría:**
- Actualmente NO implementado
- Para implementar: Ver [Facebook Pixel docs](https://developers.facebook.com/docs/meta-pixel)

---

#### VITE_ANALYTICS_ENABLED

**Descripción:** Flag global para habilitar/deshabilitar todo tipo de analytics.

**Tipo:** `boolean`
**Requerido:** ❌ No
**Default:** `false`
**Valores:** `true` | `false`

**Uso:** Master switch para todos los analytics (útil para desarrollo).

---

## 🌍 Configuración por Entorno

### Development (.env)

```env
# Analytics con datos de prueba
VITE_GA_MEASUREMENT_ID=G-TESTID123

# URLs locales
VITE_API_URL=http://localhost:5000/api/v1
VITE_SITE_URL=http://localhost:3000

# Features habilitadas
VITE_ENABLE_BLOG=true
VITE_ENABLE_PORTFOLIO=true

# Debugging habilitado
VITE_WEB_VITALS_LOG=true
VITE_ANALYTICS_ENABLED=true

# Entorno
VITE_ENV=development
```

---

### Staging (.env.staging)

```env
# Analytics separado para staging
VITE_GA_MEASUREMENT_ID=G-STAGINGID

# URLs de staging
VITE_API_URL=https://staging-api.pibelabs.com/api/v1
VITE_SITE_URL=https://staging.pibelabs.com

# Sentry para staging
VITE_SENTRY_DSN=https://...
VITE_SENTRY_ENVIRONMENT=staging

# Features habilitadas
VITE_ENABLE_BLOG=true
VITE_ENABLE_PORTFOLIO=true

# Performance monitoring
VITE_ENABLE_WEB_VITALS=true
VITE_WEB_VITALS_LOG=false

# Entorno
VITE_ENV=staging
```

**Build para staging:**
```bash
vite build --mode staging
```

---

### Production (.env.production)

```env
# Analytics de producción
VITE_GA_MEASUREMENT_ID=G-PRODID123

# URLs de producción
VITE_SITE_URL=https://pibelabs.com
VITE_CONTACT_EMAIL=contact@pibelabs.com
VITE_PHONE=+54 351 3088400

# WhatsApp
VITE_WHATSAPP_PHONE=5493513088400
VITE_WHATSAPP_MESSAGE=¡Hola! Me gustaría obtener más información sobre sus servicios.

# Redes sociales
VITE_LINKEDIN_URL=https://linkedin.com/company/pibelabs
VITE_GITHUB_URL=https://github.com/pibelabs

# Sentry para producción
VITE_SENTRY_DSN=https://...
VITE_SENTRY_ENVIRONMENT=production

# Features habilitadas
VITE_ENABLE_BLOG=true
VITE_ENABLE_PORTFOLIO=true
VITE_ENABLE_TESTIMONIALS=true
VITE_ENABLE_CONTACT_FORM=true

# Performance monitoring
VITE_ENABLE_WEB_VITALS=true
VITE_WEB_VITALS_LOG=false

# Analytics
VITE_ANALYTICS_ENABLED=true

# Entorno
VITE_ENV=production
```

**Build para producción:**
```bash
npm run build
# Usa .env.production automáticamente
```

---

## 🔒 Seguridad

### ¿Qué NO incluir en variables de entorno?

❌ **NUNCA incluyas:**
- API Keys privadas
- Database passwords
- OAuth client secrets
- Private keys

**Razón:** Las variables `VITE_*` se exponen en el código JavaScript del navegador y son visibles para cualquier usuario.

### ¿Qué SÍ es seguro incluir?

✅ **Seguro incluir:**
- Google Analytics Measurement ID (público por diseño)
- URLs públicas
- Feature flags
- IDs de servicios públicos (Facebook Pixel, etc.)

### Proteger archivos .env

**Asegúrate de que `.gitignore` contenga:**

```gitignore
# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.production
.env.staging

# Keep only the example
!.env.example
```

**Verificar:**
```bash
git status
# .env NO debe aparecer como archivo a commitear
```

---

## 🐛 Troubleshooting

### Problema: "Variable undefined"

**Síntomas:**
```typescript
console.log(import.meta.env.VITE_GA_MEASUREMENT_ID); // undefined
```

**Soluciones:**

1. **Verifica que la variable esté en .env:**
   ```bash
   cat .env | grep VITE_GA_MEASUREMENT_ID
   ```

2. **Verifica el prefijo VITE_:**
   ```env
   # ❌ Incorrecto
   GA_MEASUREMENT_ID=G-123

   # ✅ Correcto
   VITE_GA_MEASUREMENT_ID=G-123
   ```

3. **Reinicia el servidor:**
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

4. **Borra caché de Vite:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

---

### Problema: "Variable con valor incorrecto"

**Síntomas:**
```typescript
// Debería ser "G-ABC123" pero es "G-XYZ789"
```

**Soluciones:**

1. **Verifica archivo correcto:**
   ```bash
   # Development
   cat .env

   # Production
   cat .env.production
   ```

2. **Verifica que no haya conflictos:**
   ```bash
   # .env.local tiene prioridad sobre .env
   rm .env.local
   ```

3. **Orden de prioridad de Vite:**
   ```
   .env.production.local
   .env.production
   .env.local
   .env
   ```

---

### Problema: "Works in dev, not in production"

**Síntomas:**
- Funciona con `npm run dev`
- No funciona con `npm run build` + deploy

**Soluciones:**

1. **Verifica archivo de producción:**
   ```bash
   # Debe existir .env.production o variables en CI/CD
   ls -la .env*
   ```

2. **Build con variables correctas:**
   ```bash
   # Opción 1: Usar .env.production
   npm run build

   # Opción 2: Inline
   VITE_GA_MEASUREMENT_ID=G-123 npm run build
   ```

3. **Para Hostinger, configura variables en hPanel:**
   - hPanel → Variables de Entorno
   - Agrega cada variable `VITE_*`

4. **Para GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   - name: Build
     run: npm run build
     env:
       VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
   ```

---

### Problema: "TypeScript error"

**Síntomas:**
```typescript
// Property 'VITE_GA_MEASUREMENT_ID' does not exist on type 'ImportMetaEnv'
```

**Solución:**

Agrega tipos en `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_PHONE: string;
  readonly VITE_SITE_URL: string;
  // ... agregar todas las variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- [ANALYTICS_CONFIGURATION.md](./ANALYTICS_CONFIGURATION.md) - Configuración de Google Analytics
- [GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md](./GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md) - Setup completo
- [DEPLOY_SETUP.md](./DEPLOY_SETUP.md) - Deployment a Hostinger
- [HOSTINGER_CONTACT_FORM.md](./HOSTINGER_CONTACT_FORM.md) - Configuración de formulario

### Documentación Oficial

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vite TypeScript types](https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript)

---

## ✅ Checklist de Configuración

### Inicial
- [ ] Archivo `.env` creado desde `.env.example`
- [ ] Archivo `.env` en `.gitignore`
- [ ] Variables mínimas configuradas (GA, email, teléfono)

### Google Analytics
- [ ] `VITE_GA_MEASUREMENT_ID` configurado
- [ ] Formato correcto `G-XXXXXXXXXX`
- [ ] Measurement ID copiado desde Google Analytics

### Información de Empresa
- [ ] `VITE_CONTACT_EMAIL` configurado
- [ ] `VITE_PHONE` configurado (opcional)
- [ ] `VITE_SITE_URL` configurado

### WhatsApp (opcional)
- [ ] `VITE_WHATSAPP_PHONE` configurado
- [ ] Formato correcto (sin espacios, sin +)
- [ ] `VITE_WHATSAPP_MESSAGE` personalizado

### Redes Sociales (opcional)
- [ ] URLs de redes sociales configuradas
- [ ] URLs verificadas (funcionan correctamente)

### Testing
- [ ] Servidor reiniciado después de cambios
- [ ] Variables accesibles en código
- [ ] No hay errores en console

### Producción
- [ ] `.env.production` configurado
- [ ] Variables en Hostinger/GitHub Secrets
- [ ] Build funciona correctamente
- [ ] Deploy exitoso

---

## 🎯 Resumen de Variables por Prioridad

### 🔴 Críticas (Deben configurarse)

```env
VITE_CONTACT_EMAIL=contact@pibelabs.com
VITE_SITE_URL=https://pibelabs.com
```

### 🟡 Importantes (Recomendadas)

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_WHATSAPP_PHONE=5491112345678
VITE_PHONE=+54 11 1234-5678
```

### 🟢 Opcionales (Mejoras)

```env
VITE_LINKEDIN_URL=https://linkedin.com/company/pibelabs
VITE_GITHUB_URL=https://github.com/pibelabs
VITE_WHATSAPP_MESSAGE=Mensaje personalizado
VITE_FB_PIXEL_ID=123456789012345
```

### ⚪ Avanzadas (Futuro)

```env
VITE_SENTRY_DSN=https://...
VITE_API_URL=https://api.pibelabs.com
VITE_ENABLE_BLOG=true
```

---

**Última actualización:** Sprint 4
**Creado por:** PibeLabs
**Fundadores:** Lucas Benavidez y Juan Carlos Ferri
**Ubicación:** Despeñaderos, Córdoba, Argentina 🇦🇷
