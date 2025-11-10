# 📊 Google Analytics 4 - Guía de Configuración

**Última actualización:** Sprint 4 (2025-11-10)
**Tiempo de configuración:** 10 minutos

Esta guía cubre la configuración de Google Analytics 4 en el proyecto PibeLabs Frontend, incluyendo todas las features implementadas hasta Sprint 4.

---

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Variables de Entorno](#variables-de-entorno)
3. [Eventos Implementados](#eventos-implementados)
4. [Testing y Verificación](#testing-y-verificación)
5. [Configuración por Entorno](#configuración-por-entorno)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Configuración Inicial

### Paso 1: Obtener Measurement ID

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta y propiedad GA4 si no la tienes:
   - **Admin** (⚙️) → **Crear cuenta**
   - Nombre: `PibeLabs`
   - Zona horaria: `(GMT-03:00) Buenos Aires`
   - Moneda: `ARS` o `USD`

3. Configura el flujo de datos web:
   - Admin → Propiedad → Flujos de datos
   - **Añadir flujo** → **Web**
   - URL: `https://tudominio.com`
   - Nombre del flujo: `PibeLabs Website`

4. **Copia tu Measurement ID**:
   ```
   G-XXXXXXXXXX
   ```
   Se encuentra en la parte superior de los detalles del flujo.

---

## 🔧 Variables de Entorno

### Desarrollo Local

1. Crea o edita `.env` en la raíz del proyecto:

```env
# Google Analytics 4 (REQUIRED)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real

3. **Reinicia el servidor**:
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

### Producción (Hostinger)

**IMPORTANTE:** Hostinger requiere configuración adicional.

#### Método 1: Variables de Entorno en hPanel

1. Ve a **hPanel** → Tu dominio → **Variables de Entorno**
2. Agrega:
   ```
   Nombre: VITE_GA_MEASUREMENT_ID
   Valor: G-XXXXXXXXXX
   ```
3. Guarda y reinicia la aplicación

#### Método 2: Build-time Configuration

1. Crea `.env.production` en la raíz:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Asegúrate de que esté en `.gitignore`:
   ```bash
   # .gitignore
   .env*
   !.env.example
   ```

3. Haz build local y sube:
   ```bash
   npm run build
   # Sube el contenido de dist/ a Hostinger
   ```

#### Método 3: GitHub Actions (Recomendado)

Si usas GitHub Actions para deployment:

1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**

2. Agrega secret:
   ```
   Name: VITE_GA_MEASUREMENT_ID
   Secret: G-XXXXXXXXXX
   ```

3. En `.github/workflows/deploy-hostinger.yml`, asegúrate de que el build tenga acceso:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
   ```

---

## 📊 Eventos Implementados

### Eventos de Formulario de Contacto

| Evento | Cuándo se dispara | Parámetros | Código |
|--------|-------------------|------------|--------|
| `form_start` | Usuario hace clic en el primer campo | `form_name`, `timestamp` | `ContactForm.tsx:85` |
| `form_field_complete` | Usuario completa un campo | `form_name`, `field_name` | `ContactForm.tsx:93` |
| `form_error` | Error de validación | `form_name`, `field_name`, `error_message` | `ContactForm.tsx:102` |
| `form_submit` | Usuario envía formulario | `form_name`, `service`, `timestamp` | `ContactForm.tsx:108` |
| **`generate_lead`** | ✅ **CONVERSIÓN** - Envío exitoso | `currency`, `value`, `service`, `lead_source` | `ContactForm.tsx:116` |
| `form_submission_success` | Confirmación de éxito | `form_name`, `service`, `timestamp` | `ContactForm.tsx:127` |
| `form_submission_failure` | Fallo en envío | `form_name`, `error_message`, `timestamp` | `ContactForm.tsx:135` |

**Ejemplo de uso en código:**

```typescript
import { trackFormStart, trackFormSuccess } from '@/lib/analytics/googleAnalytics';

// Al iniciar el formulario
const handleFieldFocus = () => {
  trackFormStart('contact_form');
};

// Al enviar exitosamente
const handleSubmitSuccess = (data) => {
  trackFormSuccess(data, 'contact_form');
};
```

---

### Eventos de Portfolio (Sprint 4)

| Evento | Cuándo se dispara | Parámetros | Código |
|--------|-------------------|------------|--------|
| `view_item` | Usuario abre proyecto en modal | `item_id`, `item_name`, `item_category: 'portfolio'` | `PortfolioSection.tsx:178` |
| `portfolio_filter_change` | Usuario cambia categoría | `category`, `projects_count` | `PortfolioSection.tsx:185` |

**Ejemplo de uso:**

```typescript
import { trackPortfolioView, sendEvent } from '@/lib/analytics/googleAnalytics';

// Al abrir proyecto
const handleProjectClick = (project) => {
  trackPortfolioView(project.id, project.title);
};

// Al cambiar filtro
const handleCategoryChange = (categoryId) => {
  sendEvent('portfolio_filter_change', {
    category: categoryId,
    projects_count: getProjectCount(categoryId),
  });
};
```

---

### Eventos de Interacción

| Función | Evento GA4 | Uso | Disponible |
|---------|------------|-----|------------|
| `trackButtonClick()` | `button_click` | Botones importantes | ✅ |
| `trackCTAClick()` | `cta_click` | Call-to-actions | ✅ |
| `trackExternalLink()` | `click` (outbound) | Enlaces externos | ✅ |
| `trackScrollDepth()` | `scroll` | Profundidad de scroll | ✅ |
| `trackSectionView()` | `section_view` | Navegación entre secciones | ✅ |
| `trackWhatsAppClick()` | `contact_whatsapp` | Botón de WhatsApp | ✅ |
| `trackEmailClick()` | `contact_email` | Enlace de email | ✅ |

**Ejemplo de implementación:**

```typescript
import { trackCTAClick, trackWhatsAppClick } from '@/lib/analytics/googleAnalytics';

// En un botón CTA
<button onClick={() => trackCTAClick('Start Project', 'Hero Section')}>
  Iniciar Proyecto
</button>

// En botón de WhatsApp
<a
  href="https://wa.me/5491112345678"
  onClick={() => trackWhatsAppClick('Footer')}
>
  Contactar por WhatsApp
</a>
```

---

### Eventos de Blog y Portfolio

| Función | Evento GA4 | Parámetros |
|---------|------------|------------|
| `trackPortfolioView()` | `view_item` | `item_id`, `item_name`, `item_category: 'portfolio'` |
| `trackBlogPostView()` | `view_item` | `item_id`, `item_name`, `item_category: 'blog'` |

---

## 🧪 Testing y Verificación

### Verificación en DevTools (Desarrollo)

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Abre el navegador en `http://localhost:3000`

3. Abre **DevTools** (F12) → Pestaña **Console**

4. Interactúa con la aplicación (completa formulario, cambia filtros de portfolio, etc.)

5. Deberías ver logs como:
   ```
   Google Analytics initialized: G-XXXXXXXXXX
   GA Event: form_start {form_name: "contact_form", ...}
   GA Event: portfolio_filter_change {category: "web", projects_count: 5}
   GA Event: generate_lead {currency: "USD", value: 100, ...}
   ✅ Lead conversion tracked: {...}
   ```

**Si NO ves logs:**
- Verifica que `.env` tenga `VITE_GA_MEASUREMENT_ID`
- Reinicia el servidor completamente
- Borra caché: `rm -rf node_modules/.vite && npm run dev`

---

### Verificación en Google Analytics (Tiempo Real)

1. Ve a [Google Analytics](https://analytics.google.com/)

2. Selecciona tu propiedad **PibeLabs Website**

3. Menú izquierdo: **Informes** → **Tiempo real**

4. Completa el formulario o interactúa con portfolio

5. En 1-5 segundos deberías ver:
   - **1 usuario activo** en el gráfico
   - Eventos en "Eventos por conteo de eventos":
     - `generate_lead`
     - `portfolio_filter_change`
     - `form_start`
     - etc.

**Si NO aparecen eventos:**
- Desactiva ad blockers (uBlock, Adblock Plus, etc.)
- Prueba en modo incógnito
- Verifica Network tab → Filtra por "gtag" → Deberías ver peticiones a `googletagmanager.com`

---

### Verificación en Production Build

Antes de desplegar, verifica que funcione en build de producción:

```bash
# Build
npm run build

# Preview
npm run preview
```

Abre `http://localhost:4173` y verifica eventos en DevTools Console.

**Nota:** En producción, los logs de console NO aparecen (son removidos por Terser en el build).

---

## 🌍 Configuración por Entorno

### Development

```env
# .env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Características:**
- ✅ Console logs habilitados
- ✅ Eventos enviados a GA4
- ✅ Debugging visible

---

### Staging/Testing

```env
# .env.staging
VITE_GA_MEASUREMENT_ID=G-YYYYYYYYYY
```

**Recomendación:** Usa un Measurement ID diferente para staging para no contaminar datos de producción.

**Configuración:**
1. Crea una propiedad GA4 separada: "PibeLabs Website - Staging"
2. Usa su Measurement ID en `.env.staging`
3. Build con: `vite build --mode staging`

---

### Production

```env
# .env.production (NO commitear a git)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Características:**
- ❌ Console logs removidos (Terser)
- ✅ Eventos enviados a GA4
- ✅ Performance optimizado

**Deployment:**
```bash
npm run build
# Sube dist/ a Hostinger
```

---

## 🔍 Debugging

### Verificar que GA está cargado

Abre DevTools Console y ejecuta:

```javascript
// Verificar que gtag existe
console.log(typeof window.gtag); // Debe ser "function"

// Verificar dataLayer
console.log(window.dataLayer); // Debe ser un array con datos

// Enviar evento de prueba
gtag('event', 'test_event', { test: 'value' });
```

Si `gtag` es `undefined`, significa que el script no se cargó.

---

### Verificar Network Requests

1. DevTools → **Network**
2. Filtra por "gtag" o "google-analytics"
3. Deberías ver:
   - `gtag/js?id=G-XXXXXXXXXX` (cargar script)
   - `collect?...` (enviar eventos)

Si NO hay requests:
- Verifica que `initGA()` se llame en `App.tsx`
- Verifica que el Measurement ID sea correcto
- Desactiva ad blockers

---

### Verificar Variables de Entorno

```bash
# En desarrollo, ejecuta:
echo $VITE_GA_MEASUREMENT_ID

# O en Node.js/terminal:
node -e "console.log(process.env.VITE_GA_MEASUREMENT_ID)"
```

**En el código:**
```typescript
console.log('GA ID:', import.meta.env.VITE_GA_MEASUREMENT_ID);
```

Si es `undefined`, la variable no está configurada o el servidor no se reinició.

---

## 🐛 Troubleshooting

### Problema 1: "Google Analytics not available"

**Síntomas:**
- Console logs: `Google Analytics not available`
- No aparecen eventos en GA Tiempo Real

**Causas posibles:**
1. Measurement ID no configurado
2. Script bloqueado por ad blocker
3. CORS o CSP bloqueando script

**Soluciones:**

1. **Verifica Measurement ID:**
   ```bash
   # .env debe tener:
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

   # Verifica que no tenga espacios o comillas
   ```

2. **Desactiva ad blockers:**
   - uBlock Origin
   - Adblock Plus
   - Brave Shields
   - Privacy Badger

3. **Verifica CSP headers:**
   Si usas Content Security Policy, asegúrate de permitir:
   ```
   script-src 'self' https://www.googletagmanager.com;
   connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
   ```

---

### Problema 2: "Events not appearing in GA"

**Síntomas:**
- Console logs muestran eventos
- No aparecen en GA Tiempo Real

**Causas posibles:**
1. Measurement ID incorrecto
2. Propiedad GA4 mal configurada
3. Delay natural de GA (1-5 segundos)

**Soluciones:**

1. **Verifica Measurement ID exacto:**
   - Ve a Google Analytics → Admin → Flujos de datos
   - Copia el ID EXACTO (incluye el `G-`)
   - Verifica que coincida con tu `.env`

2. **Espera 5-10 segundos:**
   - GA tiene un delay natural
   - Refresca la página de Tiempo Real

3. **Verifica que la propiedad esté activa:**
   - Google Analytics → Admin → Propiedad
   - Estado debe ser "Activa"

---

### Problema 3: "generate_lead not marked as conversion"

**Síntomas:**
- Evento `generate_lead` aparece en Tiempo Real
- No aparece en Informes → Conversiones

**Solución:**

1. Ve a **Admin** → **Propiedad** → **Conversiones**
2. Si `generate_lead` NO está en la lista:
   - Haz clic en **Nuevo evento de conversión**
   - Nombre: `generate_lead`
   - Guardar
3. Espera 24-48 horas para que aparezca en reportes históricos

**Nota:** `generate_lead` es un evento recomendado de Google, pero debe ser marcado explícitamente como conversión.

---

### Problema 4: "Works in dev, not in production"

**Síntomas:**
- Funciona en `npm run dev`
- No funciona en producción (Hostinger)

**Causas posibles:**
1. Variable de entorno no configurada en producción
2. Build sin la variable
3. CSP headers bloqueando script

**Soluciones:**

1. **Verifica variable en Hostinger:**
   - hPanel → Variables de Entorno
   - Debe existir `VITE_GA_MEASUREMENT_ID`

2. **Build con variable:**
   ```bash
   # Opción 1: .env.production local
   echo "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env.production
   npm run build

   # Opción 2: Inline
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run build
   ```

3. **Verifica en el bundle:**
   ```bash
   # Busca el ID en el build
   grep -r "G-XXXXXXXXXX" dist/

   # Debe aparecer en algún archivo JS
   ```

---

### Problema 5: "Too many events or wrong parameters"

**Síntomas:**
- Eventos duplicados
- Parámetros incorrectos

**Debugging:**

1. **Verifica en Console:**
   ```javascript
   // Filtra logs de GA
   console.log(window.dataLayer);
   ```

2. **Usa GA Debug Mode:**
   En tu navegador, instala [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)

3. **Revisa el código:**
   - Busca llamadas duplicadas a tracking functions
   - Verifica que los event listeners no se registren múltiples veces

---

### Problema 6: "Script blocked by CORS"

**Síntomas:**
- Console error: `blocked by CORS policy`
- Script de GA no carga

**Solución:**

Esto es muy raro con Google Analytics. Si sucede:

1. Verifica que uses HTTPS en producción (no HTTP)
2. Asegúrate de que el script src sea:
   ```
   https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX
   ```
   (No `http://`)

3. Limpia caché del navegador y recarga

---

## 📈 Configurar Conversiones en GA4

Una vez que `generate_lead` esté enviando datos:

### Paso 1: Marcar como Conversión

1. Google Analytics → **Admin** (⚙️)
2. Columna **PROPIEDAD** → **Conversiones**
3. Haz clic en **Nuevo evento de conversión**
4. Nombre del evento: `generate_lead`
5. Guardar

**Resultado:** Ahora `generate_lead` aparecerá en reportes de conversiones.

---

### Paso 2: Configurar Valor de Conversión

Por defecto, cada lead tiene valor `100` USD (configurado en `googleAnalytics.ts:220`).

**Ajustar valor:**

1. Abre `src/lib/analytics/googleAnalytics.ts`
2. Línea 220:
   ```typescript
   sendEvent('generate_lead', {
     currency: 'USD',
     value: 100, // ← Ajusta este valor
     // ...
   });
   ```
3. Cambia `100` al valor estimado de un lead para tu negocio
4. Guarda y redeploy

---

### Paso 3: Ver Reportes de Conversión

Después de 24-48 horas:

1. Google Analytics → **Informes** → **Conversiones**
2. Verás:
   - Total de conversiones
   - Valor de conversiones
   - Tasa de conversión
   - Conversiones por fuente/medio

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- **Guía completa:** `/docs/GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md`
- **Quick Start:** `/docs/QUICK_START_SHEETS_ANALYTICS.md`
- **Variables de entorno:** `/docs/ENV_VARIABLES.md`
- **Implementación:** `/src/lib/analytics/googleAnalytics.ts`

### Documentación Oficial

- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [gtag.js API](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Eventos recomendados](https://support.google.com/analytics/answer/9267735)
- [DebugView](https://support.google.com/analytics/answer/7201382)

---

## 🎯 Checklist de Configuración

### Inicial
- [ ] Cuenta GA4 creada
- [ ] Propiedad configurada
- [ ] Flujo de datos web creado
- [ ] Measurement ID copiado

### Desarrollo
- [ ] Variable `VITE_GA_MEASUREMENT_ID` en `.env`
- [ ] Servidor reiniciado después de configurar `.env`
- [ ] Console logs muestran "Google Analytics initialized"
- [ ] Eventos aparecen en Console al interactuar

### Testing
- [ ] Eventos aparecen en GA Tiempo Real
- [ ] `generate_lead` se dispara al enviar formulario
- [ ] `portfolio_filter_change` se dispara al cambiar filtros
- [ ] No hay errores en Console

### Producción
- [ ] Variable configurada en Hostinger/GitHub Secrets
- [ ] Build realizado con variable correcta
- [ ] Eventos funcionan en producción
- [ ] `generate_lead` marcado como conversión en GA4
- [ ] Reportes funcionan correctamente

---

## ✅ Eventos por Componente

Referencia rápida de dónde se implementan los eventos:

### ContactForm.tsx
```typescript
trackFormStart()              // Línea 85
trackFormFieldComplete()      // Línea 93
trackFormError()              // Línea 102
trackFormSubmit()             // Línea 108
trackFormSuccess()            // Línea 116 (CONVERSIÓN)
trackFormFailure()            // Línea 135
```

### PortfolioSection.tsx (Sprint 4)
```typescript
trackPortfolioView()          // Línea 178
sendEvent('portfolio_filter_change')  // Línea 185
```

### Hero.tsx
```typescript
trackCTAClick()               // Para botones CTA principales
```

### WhatsAppWidget.tsx
```typescript
trackWhatsAppClick()          // Al hacer clic en widget
```

### Footer.tsx
```typescript
trackEmailClick()             // Al hacer clic en email
trackCTAClick()               // CTAs en footer
```

---

**Última actualización:** Sprint 4
**Creado por:** PibeLabs
**Fundadores:** Lucas Benavidez y Juan Carlos Ferri
**Ubicación:** Despeñaderos, Córdoba, Argentina 🇦🇷
