# 📊 Configuración de Google Sheets y Google Analytics

Esta guía explica cómo configurar la integración automática de leads en Google Sheets y el tracking de conversiones con Google Analytics 4.

## 📋 Tabla de Contenidos

1. [Google Sheets - Exportar Leads Automáticamente](#google-sheets)
2. [Google Analytics 4 - Trackear Conversiones](#google-analytics-4)
3. [Testing y Verificación](#testing-y-verificación)
4. [Troubleshooting](#troubleshooting)

---

## 🟢 PARTE 1: Google Sheets - Exportar Leads Automáticamente

### ¿Por Qué Google Sheets?

- **📊 Visualización Inmediata**: Ver todos los leads en tiempo real
- **📤 Fácil Exportación**: CSV, Excel, PDF con un clic
- **🤝 Colaboración**: Compartir con el equipo fácilmente
- **📈 Análisis**: Crear gráficos y reportes automáticos
- **💰 Gratis**: Sin costos adicionales

### Paso 1: Crear tu Google Sheet de Leads

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: `PibeLabs - Leads 2025`
4. Haz clic en **Compartir** → Cambia a "Cualquiera con el enlace puede ver"
5. Guarda el URL de tu Sheet

**⚠️ Importante**: Anota el ID de tu Sheet (está en el URL):
```
https://docs.google.com/spreadsheets/d/ABC123xyz456/edit
                                        ↑↑↑ Este es tu Sheet ID
```

### Paso 2: Configurar Google Apps Script

1. En tu Google Sheet, ve a **Extensiones** → **Apps Script**
2. Se abrirá un editor de código
3. **Borra todo** el código que aparece por defecto
4. **Copia y pega** el contenido del archivo `server/google-sheets-script.js`
5. Haz clic en el ícono del **disquete** para guardar (o Ctrl+S / Cmd+S)
6. Nómbralo: `PibeLabs Leads Collector`

### Paso 3: Desplegar como Web App

1. En el editor de Apps Script, haz clic en **Implementar** → **Nueva implementación**
2. Haz clic en el ícono de **engranaje** (⚙️) al lado de "Select type"
3. Selecciona **Aplicación web**
4. Configura los siguientes campos:

   - **Nueva descripción**: "PibeLabs Contact Form Integration"
   - **Ejecutar como**: `Yo (tu email)`
   - **Quién tiene acceso**: `Cualquier persona`

5. Haz clic en **Implementar**
6. **Autoriza el acceso** cuando te lo pida:
   - Haz clic en **Authorize access**
   - Selecciona tu cuenta de Google
   - Haz clic en **Advanced** (si aparece advertencia)
   - Haz clic en **Go to PibeLabs Leads Collector (unsafe)** - No te preocupes, es tu propio script
   - Haz clic en **Allow**

7. **¡IMPORTANTE!** Copia la **URL de implementación web**. Se verá así:
   ```
   https://script.google.com/macros/s/AKfycbw...xyz/exec
   ```

### Paso 4: Configurar el Backend PHP

1. Abre el archivo `/server/google-sheets-integration.php`
2. En la **línea 17**, reemplaza `TU_DEPLOYMENT_ID` con tu URL completa:

   ```php
   // ANTES:
   $scriptUrl = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec';

   // DESPUÉS:
   $scriptUrl = 'https://script.google.com/macros/s/AKfycbw...xyz/exec';
   ```

3. Guarda el archivo
4. Sube este archivo a Hostinger junto con `contact.php` en la carpeta `api/`

### Paso 5: Probar la Integración

1. Abre Postman, Insomnia, o usa este comando curl:

   ```bash
   curl -X POST "https://script.google.com/macros/s/TU_URL/exec" \
     -d "timestamp=2025-11-03 10:30:00" \
     -d "name=Test User" \
     -d "email=test@example.com" \
     -d "service=web" \
     -d "message=This is a test message" \
     -d "ip=192.168.1.1" \
     -d "userAgent=Test Browser" \
     -d "referrer=Direct"
   ```

2. Ve a tu Google Sheet
3. Deberías ver una **nueva fila** con los datos del test

**Si no funciona**, revisa la sección de [Troubleshooting](#troubleshooting-google-sheets)

### Paso 6: Opcional - Configurar Menú Personalizado

El script incluye un menú personalizado para facilitar la gestión de leads:

1. Recarga tu Google Sheet (F5 o Cmd+R)
2. Verás un nuevo menú: **"PibeLabs Leads"**
3. Opciones disponibles:
   - **Marcar como Contactado** - Cambia el estado a "Contactado" (verde)
   - **Marcar como Cerrado** - Cambia el estado a "Cerrado" (cyan)
   - **Marcar como Descartado** - Cambia el estado a "Descartado" (rojo)

**Uso:**
- Selecciona una fila (cualquier celda de esa fila)
- Ve al menú "PibeLabs Leads"
- Elige la acción

### Paso 7: Opcional - Resumen Diario por Email

El script puede enviar un resumen diario automático:

1. En el editor de Apps Script, haz clic en **⏰ Triggers** (reloj, panel izquierdo)
2. Haz clic en **+ Add Trigger** (abajo a la derecha)
3. Configura:
   - **Choose which function to run**: `doSendDailySummary`
   - **Choose which deployment should run**: `Head`
   - **Select event source**: `Time-driven`
   - **Select type of time based trigger**: `Day timer`
   - **Select time of day**: `9am to 10am` (o la hora que prefieras)
4. Haz clic en **Save**
5. Autoriza el acceso nuevamente si te lo pide

**📧 Recibirás un email diario con:**
- Leads de hoy
- Leads de esta semana
- Total de leads

### Columnas del Sheet

El script crea automáticamente estas columnas:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| Timestamp | Fecha y hora del contacto | 03/11/2025 14:30:25 |
| Nombre | Nombre completo del cliente | Juan Pérez |
| Email | Email (con enlace mailto:) | juan@example.com |
| Servicio | Servicio de interés | 🌐 Desarrollo Web |
| Mensaje | Mensaje del cliente | Necesito un sitio web... |
| IP | Dirección IP del cliente | 192.168.1.100 |
| User Agent | Navegador/dispositivo | Chrome 120.0.0.0 |
| Referrer | De dónde vino | https://google.com |
| Estado | Estado del lead | Nuevo / Contactado / Cerrado |

---

## 📈 PARTE 2: Google Analytics 4 - Trackear Conversiones

### ¿Por Qué Google Analytics?

- **🎯 Tracking de Conversiones**: Saber cuántos leads generas
- **📊 Métricas de Rendimiento**: Tasa de conversión, tiempo en página, etc.
- **🔍 Análisis de Comportamiento**: Qué secciones generan más leads
- **💰 ROI de Marketing**: Medir efectividad de campañas
- **📱 Analytics Móvil**: Ver comportamiento por dispositivo

### Paso 1: Crear Propiedad en Google Analytics 4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Si no tienes cuenta, crea una (gratis)
3. Haz clic en **Admin** (⚙️ abajo a la izquierda)
4. En la columna **CUENTA**, haz clic en **Crear cuenta**:
   - **Nombre de la cuenta**: PibeLabs
   - Acepta los términos
   - Haz clic en **Siguiente**
5. Configura la **Propiedad**:
   - **Nombre de la propiedad**: PibeLabs Website
   - **Zona horaria**: (GMT-3:00) Buenos Aires
   - **Moneda**: Peso argentino (ARS)
   - Haz clic en **Siguiente**
6. **Detalles del negocio**:
   - Sector: Computadoras y electrónica
   - Tamaño: Pequeña empresa
   - Uso: Generar clientes potenciales
   - Haz clic en **Crear**
7. Acepta los Términos del Servicio
8. En **Configurar recopilación de datos**, selecciona **Web**
9. Configura el flujo de datos web:
   - **URL del sitio web**: `https://tudominio.com`
   - **Nombre del flujo**: PibeLabs Website
   - Haz clic en **Crear flujo**
10. **¡IMPORTANTE!** Copia tu **Measurement ID**. Se verá así:
    ```
    G-XXXXXXXXXX
    ```

### Paso 2: Configurar Variables de Entorno

1. Crea o edita el archivo `.env` en la raíz del proyecto:

   ```bash
   # Google Analytics
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real

3. **⚠️ IMPORTANTE**: Asegúrate de que `.env` esté en tu `.gitignore`:

   ```bash
   # .gitignore
   .env
   .env.local
   .env.production
   ```

4. Si despliegas en Hostinger, configura la variable de entorno:
   - Ve a hPanel → Variables de Entorno
   - Agrega: `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

### Paso 3: El Código Ya Está Implementado! ✅

El proyecto ya tiene toda la integración de Google Analytics implementada:

#### Inicialización Automática

En `src/App.tsx`, Google Analytics se inicializa automáticamente:

```typescript
import { initGA } from '@/lib/analytics';

useEffect(() => {
  initGA(); // Lee VITE_GA_MEASUREMENT_ID automáticamente
}, []);
```

#### Eventos Trackeados en el Formulario

El `ContactForm` ya tiene todos estos eventos configurados:

| Evento | Cuándo se Dispara | Parámetros |
|--------|-------------------|------------|
| `form_start` | Usuario comienza a llenar el formulario | form_name: "contact_form" |
| `form_field_complete` | Usuario completa un campo | form_name, field_name |
| `form_error` | Error de validación | form_name, field_name, error_message |
| `form_submit` | Usuario envía el formulario | form_name, service |
| `generate_lead` | **CONVERSIÓN** - Formulario enviado exitosamente | currency, value, service, lead_source |
| `form_submission_success` | Confirmación de éxito | form_name, service |
| `form_submission_failure` | Fallo en el envío | form_name, error_message |

#### Evento Principal de Conversión 🎯

El evento más importante es `generate_lead`, que Google Analytics reconoce automáticamente como una conversión. Se dispara cuando el formulario se envía exitosamente:

```typescript
// Esto sucede automáticamente en ContactForm.tsx línea 116
trackFormSuccess(data); // Envía evento generate_lead

// Parámetros enviados:
{
  currency: 'USD',
  value: 100, // Valor estimado del lead (ajustable)
  service: 'web' | 'ia' | 'design' | 'cloud',
  lead_source: 'website'
}
```

### Paso 4: Verificar que Funciona

#### 4.1. Testing en Desarrollo

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el navegador en `http://localhost:3000`

3. Abre las **DevTools** (F12) → Pestaña **Console**

4. Completa el formulario de contacto

5. Deberías ver estos logs en la consola:
   ```
   GA Event: form_start {form_name: "contact_form", timestamp: "2025-11-03..."}
   GA Event: form_field_complete {form_name: "contact_form", field_name: "name"}
   GA Event: form_submit {form_name: "contact_form", service: "web"}
   GA Event: generate_lead {currency: "USD", value: 100, service: "web"...}
   ✅ Lead conversion tracked: {name: "...", email: "...", ...}
   ```

#### 4.2. Verificar en Google Analytics (Tiempo Real)

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad **PibeLabs Website**
3. En el menú izquierdo, haz clic en **Informes** → **Tiempo real**
4. Completa el formulario en tu sitio
5. En 1-2 segundos, deberías ver:
   - **1 usuario activo** en la página
   - El evento **generate_lead** en la sección "Eventos por conteo de eventos"

**Si no aparece**, revisa [Troubleshooting](#troubleshooting-google-analytics)

### Paso 5: Configurar Conversión en Google Analytics

Para que Google Analytics reconozca tus leads como conversiones:

1. En Google Analytics, ve a **Admin** (⚙️ abajo a la izquierda)
2. En la columna **PROPIEDAD**, haz clic en **Conversiones**
3. Haz clic en **Nuevo evento de conversión**
4. Nombre del evento: `generate_lead`
5. Haz clic en **Guardar**

**Nota**: `generate_lead` ya es un evento recomendado de Google, pero marcarlo explícitamente como conversión te permite verlo en los informes de conversiones.

### Paso 6: Ver Reportes de Conversión

Después de 24-48 horas de recopilación de datos:

1. Ve a **Informes** → **Conversiones**
2. Verás:
   - Número total de conversiones (leads generados)
   - Tasa de conversión
   - Valor de las conversiones
   - Conversiones por fuente/medio (orgánico, directo, referencia, etc.)

### Paso 7: Opcional - Configurar Objetivos Personalizados

Puedes crear más objetivos personalizados:

1. Ve a **Admin** → **Propiedad** → **Conversiones**
2. Haz clic en **Nuevo evento de conversión**
3. Eventos sugeridos:
   - `form_start` - Para medir abandono del formulario
   - `button_click` - Para CTAs importantes
   - `section_view` - Para engagement por sección

### Eventos Adicionales Disponibles

El proyecto incluye muchas funciones de tracking listas para usar:

#### Interacciones

```typescript
import { trackButtonClick, trackCTAClick } from '@/lib/analytics/googleAnalytics';

// En cualquier botón
<button onClick={() => trackButtonClick('Download PDF', 'Hero Section')}>
  Descargar PDF
</button>

// En CTAs
<button onClick={() => trackCTAClick('Start Project', 'Footer')}>
  Iniciar Proyecto
</button>
```

#### Portfolio y Blog

```typescript
import { trackPortfolioView, trackBlogPostView } from '@/lib/analytics/googleAnalytics';

// Cuando se abre un proyecto
trackPortfolioView('project-123', 'E-commerce Platform');

// Cuando se lee un post
trackBlogPostView('post-456', 'Cómo usar React');
```

#### WhatsApp y Email

```typescript
import { trackWhatsAppClick, trackEmailClick } from '@/lib/analytics/googleAnalytics';

// Cuando se hace clic en WhatsApp
<a href="https://wa.me/..." onClick={() => trackWhatsAppClick('Footer')}>
  Contactar por WhatsApp
</a>

// Cuando se hace clic en email
<a href="mailto:..." onClick={() => trackEmailClick('Header')}>
  Enviar Email
</a>
```

#### Scroll Depth

```typescript
import { trackScrollDepth } from '@/lib/analytics/googleAnalytics';

// Trackear cuando el usuario llega al 75% de la página
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100;
    if (scrollPercentage >= 75) {
      trackScrollDepth(75);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 🧪 PARTE 3: Testing y Verificación

### Testing Completo del Flujo

1. **Preparación**:
   ```bash
   # Asegúrate de que las variables estén configuradas
   echo $VITE_GA_MEASUREMENT_ID

   # Inicia el servidor
   npm run dev
   ```

2. **Testing del Formulario**:
   - Ve a `http://localhost:3000/#contact`
   - Abre DevTools → Console
   - Completa el formulario paso a paso
   - Observa los logs de eventos:
     - `form_start` al hacer clic en el primer campo
     - `form_field_complete` al completar cada campo
     - `form_error` si hay errores de validación
     - `form_submit` al hacer clic en "Enviar"
     - `generate_lead` si se envió exitosamente

3. **Verificar en Google Sheets**:
   - Ve a tu Google Sheet
   - Debería aparecer una nueva fila con los datos
   - Verifica que todos los campos tengan información

4. **Verificar en Google Analytics**:
   - Ve a Google Analytics → Tiempo real
   - Deberías ver el evento `generate_lead`
   - Verifica que los parámetros sean correctos

### Testing con Datos de Prueba

```typescript
// En ContactForm, puedes usar estos datos de prueba:
{
  name: "Test User " + Date.now(),
  email: "test" + Date.now() + "@example.com",
  service: "web",
  message: "This is a test message for integration testing"
}
```

---

## 🔧 PARTE 4: Troubleshooting

### Troubleshooting Google Sheets

#### Problema: "No aparecen los leads en el Sheet"

**Causa Posible 1**: URL del script incorrecta

**Solución**:
1. Verifica que la URL en `google-sheets-integration.php` sea correcta
2. Debe ser la URL completa de implementación, no el ID del script
3. Debe terminar en `/exec`

**Causa Posible 2**: Script no autorizado

**Solución**:
1. Ve al editor de Apps Script
2. Ejecuta manualmente la función `doPost`
3. Autoriza los permisos cuando te lo pida

**Causa Posible 3**: Error en el script

**Solución**:
1. Ve al editor de Apps Script
2. Haz clic en **Ejecuciones** (panel izquierdo)
3. Busca ejecuciones con error
4. Haz clic en el error para ver detalles
5. Copia el error y búscalo en Google

#### Problema: "Permission denied" al ejecutar el script

**Solución**:
1. Ve a Apps Script → **Implementar** → **Administrar implementaciones**
2. Haz clic en **Editar** (ícono de lápiz)
3. Cambia la versión a **Nueva versión**
4. Asegúrate de que "Quién tiene acceso" sea "Cualquier persona"
5. Haz clic en **Implementar**

#### Problema: "Los datos llegan pero sin formato"

**Solución**:
1. Ejecuta manualmente `setupCurrentSheet` desde el menú PibeLabs Leads
2. O ejecuta la función `setupSheet(sheet)` desde el editor

### Troubleshooting Google Analytics

#### Problema: "No aparecen eventos en Tiempo Real"

**Causa Posible 1**: Measurement ID incorrecto

**Solución**:
1. Verifica el `.env`:
   ```bash
   cat .env | grep VITE_GA_MEASUREMENT_ID
   ```
2. Debe empezar con `G-` seguido de 10 caracteres
3. Verifica que sea exactamente el de tu propiedad en Google Analytics

**Causa Posible 2**: Variables de entorno no cargadas

**Solución**:
1. Detén el servidor (Ctrl+C)
2. Borra la caché de Vite:
   ```bash
   rm -rf node_modules/.vite
   ```
3. Reinicia:
   ```bash
   npm run dev
   ```

**Causa Posible 3**: Ad blocker bloqueando Google Analytics

**Solución**:
1. Desactiva ad blockers (uBlock Origin, Adblock Plus, etc.)
2. Prueba en modo incógnito
3. Usa otro navegador

**Causa Posible 4**: Script no se está cargando

**Solución**:
1. Abre DevTools → Network
2. Filtra por "gtag"
3. Deberías ver una petición a `googletagmanager.com`
4. Si no aparece, verifica que `initGA()` se esté ejecutando en `App.tsx`

#### Problema: "Los eventos aparecen con delay"

**Respuesta**: Es normal. Google Analytics tiene un delay de 1-5 segundos para eventos en tiempo real. Para reportes históricos, el delay puede ser de 24-48 horas.

#### Problema: "El evento generate_lead no se marca como conversión"

**Solución**:
1. Ve a Admin → Conversiones
2. Busca `generate_lead` en la lista
3. Si no está, agrégalo manualmente
4. Si ya está pero no aparece en reportes, espera 24-48 horas

### Troubleshooting General

#### Problema: "Error 403 Forbidden"

**Causa**: Permisos incorrectos en Hostinger

**Solución**:
```bash
# En Hostinger File Manager
chmod 644 contact.php
chmod 644 google-sheets-integration.php
chmod 755 api/
```

#### Problema: "CORS Error"

**Causa**: Google Apps Script rechaza peticiones

**Solución**:
El script ya maneja CORS correctamente. Si persiste:
1. Ve al editor de Apps Script
2. Verifica que en la implementación, "Quién tiene acceso" sea "Cualquier persona"
3. Re-despliega como nueva versión

---

## 📊 Dashboards Recomendados

### Google Sheets Dashboard

Crea una pestaña "Dashboard" en tu Sheet con:

```
=QUERY(Leads!A:I, "SELECT A, B, C, D WHERE I = 'Nuevo'")  // Leads nuevos
=COUNTIF(Leads!I:I, "Nuevo")                               // Conteo de nuevos
=COUNTIF(Leads!I:I, "Contactado")                          // Conteo contactados
=COUNTIF(Leads!I:I, "Cerrado")                             // Conteo cerrados
```

### Google Analytics Dashboard

En Google Analytics, crea un dashboard personalizado con:

1. **Widget de Conversiones**: Gráfico de líneas de `generate_lead` por día
2. **Fuentes de Tráfico**: Tabla de conversiones por fuente/medio
3. **Dispositivos**: Conversiones por dispositivo (móvil, desktop, tablet)
4. **Abandono de Formulario**: Comparar `form_start` vs `generate_lead`

---

## ✅ Checklist de Implementación

### Google Sheets

- [ ] Google Sheet creado
- [ ] Google Apps Script configurado
- [ ] Script desplegado como Web App
- [ ] URL de implementación copiada
- [ ] `google-sheets-integration.php` actualizado con la URL
- [ ] Archivo subido a Hostinger
- [ ] Testing completado - Lead aparece en Sheet
- [ ] Menú personalizado aparece
- [ ] (Opcional) Trigger de resumen diario configurado

### Google Analytics

- [ ] Cuenta de Google Analytics creada
- [ ] Propiedad GA4 configurada
- [ ] Measurement ID copiado
- [ ] Variable de entorno `VITE_GA_MEASUREMENT_ID` configurada
- [ ] Aplicación reiniciada después de configurar .env
- [ ] Testing en DevTools - Eventos aparecen en Console
- [ ] Testing en GA Tiempo Real - Eventos aparecen
- [ ] Evento `generate_lead` marcado como conversión
- [ ] (Opcional) Objetivos personalizados configurados

### Integración Completa

- [ ] Formulario funciona correctamente
- [ ] Lead llega al email
- [ ] Lead se guarda en Google Sheets
- [ ] Evento se registra en Google Analytics
- [ ] Todo funciona en producción (Hostinger)

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa esta documentación primero** - La mayoría de problemas están resueltos aquí
2. **Revisa los logs**:
   - DevTools Console para errores de JavaScript
   - Apps Script → Ejecuciones para errores del script
   - Google Analytics → DebugView para eventos en tiempo real
3. **Busca el error en Google** - Copia el mensaje de error exacto
4. **Contacta al soporte**:
   - Google Workspace: https://support.google.com/a/
   - Google Analytics: https://support.google.com/analytics/

---

## 🎯 Próximos Pasos

Una vez que tengas todo funcionando:

1. **Configurar alertas** en Google Analytics cuando haya nuevas conversiones
2. **Crear reportes automáticos** semanales o mensuales
3. **Integrar con CRM** (HubSpot, Pipedrive, etc.) usando Zapier
4. **A/B Testing** del formulario para mejorar conversión
5. **Agregar más eventos** de tracking para mejor análisis

---

**Creado para PibeLabs**
Fundado por Lucas Benavidez y Juan Cruz Ferri
Despeñaderos, Córdoba, Argentina 🇦🇷
