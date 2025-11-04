# 🚀 Guía Rápida: Google Sheets + Analytics (25 minutos)

Esta guía te llevará paso a paso para configurar Google Sheets y Google Analytics 4 en tu sitio de PibeLabs.

⏱️ **Tiempo estimado**: 25 minutos
- Google Sheets: 15 minutos
- Google Analytics: 10 minutos

---

## 📋 PARTE 1: Google Sheets (15 minutos)

### Paso 1: Crear Google Sheet (2 minutos)

1. Ve a [sheets.google.com](https://sheets.google.com)
2. Haz clic en el botón **+** (Crear hoja de cálculo en blanco)
3. Nómbrala: **PibeLabs - Leads 2025**
4. Haz clic en **Compartir** (botón azul arriba a la derecha)
5. Cambia a: **"Cualquiera con el enlace puede ver"**
6. Copia el enlace y guárdalo (lo necesitarás después)

✅ **Verificación**: Deberías tener una hoja de cálculo vacía con el nombre correcto.

---

### Paso 2: Configurar Google Apps Script (5 minutos)

1. En tu Google Sheet, ve al menú superior:
   ```
   Extensiones → Apps Script
   ```

2. Se abrirá un editor de código. **Borra todo** el código que aparece por defecto

3. **Abre** el archivo del proyecto:
   ```
   pibelabs-frontend/server/google-sheets-script.js
   ```

4. **Copia todo** el contenido (Ctrl+A, Ctrl+C / Cmd+A, Cmd+C)

5. **Pega** en el editor de Apps Script (Ctrl+V / Cmd+V)

6. Haz clic en el ícono del **disquete** para guardar (💾) o presiona Ctrl+S / Cmd+S

7. Cuando te pida un nombre, escribe:
   ```
   PibeLabs Leads Collector
   ```

8. Haz clic en **OK**

✅ **Verificación**: Deberías ver el código pegado sin errores de sintaxis.

---

### Paso 3: Desplegar como Web App (5 minutos)

1. En el editor de Apps Script, busca el botón **Implementar** (arriba a la derecha)

2. Haz clic en **Implementar** → **Nueva implementación**

3. Verás un modal. Haz clic en el ícono de **engranaje** (⚙️) junto a "Select type"

4. En el menú que aparece, selecciona **Aplicación web**

5. Configura los siguientes campos:

   📝 **Configuración:**
   ```
   Nueva descripción: PibeLabs Contact Form Integration
   Ejecutar como: Yo (tu@email.com)
   Quién tiene acceso: Cualquier persona
   ```

6. Haz clic en **Implementar**

7. **⚠️ IMPORTANTE**: Aparecerá un mensaje de autorización:

   a. Haz clic en **Authorize access**

   b. Selecciona tu cuenta de Google

   c. Si aparece una advertencia de seguridad:
      - Haz clic en **Advanced** (Configuración avanzada)
      - Haz clic en **Go to PibeLabs Leads Collector (unsafe)**
      - (No te preocupes, es tu propio script, es seguro)

   d. Haz clic en **Allow** (Permitir)

8. **🎯 CRUCIAL**: Después de autorizar, verás un modal con una **URL de implementación web**

   Se verá algo así:
   ```
   https://script.google.com/macros/s/AKfycbw...abc123.../exec
   ```

9. **COPIA** esta URL completa. La necesitarás en el siguiente paso.

   💡 **Consejo**: Pégala en un archivo de texto temporal para no perderla.

✅ **Verificación**: Debes tener la URL completa que termina en `/exec`

---

### Paso 4: Actualizar Backend PHP (3 minutos)

1. **Abre** el archivo en tu editor de código:
   ```
   pibelabs-frontend/server/google-sheets-integration.php
   ```

2. Busca la **línea 17**. Verás esto:
   ```php
   $scriptUrl = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec';
   ```

3. **Reemplaza** `TU_DEPLOYMENT_ID` con tu URL completa que copiaste:

   **ANTES:**
   ```php
   $scriptUrl = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec';
   ```

   **DESPUÉS:**
   ```php
   $scriptUrl = 'https://script.google.com/macros/s/AKfycbw...abc123.../exec';
   ```

4. **Guarda** el archivo (Ctrl+S / Cmd+S)

5. **Sube** este archivo a Hostinger:
   - Abre hPanel → File Manager
   - Navega a `public_html/api/`
   - Arrastra y suelta `google-sheets-integration.php`

✅ **Verificación**: El archivo debe estar en `public_html/api/google-sheets-integration.php`

---

### Paso 5: Probar Google Sheets (2 minutos)

Ahora vamos a probar que todo funcione:

1. **Abre una terminal** o **símbolo del sistema**

2. **Ejecuta** este comando (reemplaza la URL con la tuya):

   ```bash
   curl -X POST "https://script.google.com/macros/s/TU_URL_AQUI/exec" \
     -d "timestamp=2025-11-03 10:30:00" \
     -d "name=Test Usuario" \
     -d "email=test@pibelabs.com" \
     -d "service=web" \
     -d "message=Mensaje de prueba desde curl" \
     -d "ip=192.168.1.100" \
     -d "userAgent=Test Browser" \
     -d "referrer=Direct"
   ```

3. **Ve a tu Google Sheet**

4. **Refresca la página** (F5 o Cmd+R)

5. **Deberías ver**:
   - Una fila con headers (Timestamp, Nombre, Email, etc.)
   - Una segunda fila con los datos de prueba

**Si aparecen los datos: ✅ ¡Google Sheets está configurado correctamente!**

**Si NO aparecen:**
- Espera 10 segundos y refresca
- Verifica que la URL sea exactamente la que copiaste
- Revisa que termine en `/exec`

---

## 📈 PARTE 2: Google Analytics 4 (10 minutos)

### Paso 1: Crear Cuenta de Google Analytics (3 minutos)

1. Ve a [analytics.google.com](https://analytics.google.com/)

2. Si ya tienes cuenta, inicia sesión. Si no:
   - Haz clic en **Comenzar** o **Start measuring**
   - Usa tu cuenta de Gmail

3. Haz clic en **Admin** (⚙️ icono de engranaje, abajo a la izquierda)

4. En la columna **CUENTA**, haz clic en **+ Crear cuenta**

5. **Nombre de la cuenta**: `PibeLabs`

6. Marca todas las casillas de "Uso compartido de datos" (recomendado)

7. Haz clic en **Siguiente**

✅ **Verificación**: Estás en la pantalla de configuración de propiedad.

---

### Paso 2: Configurar Propiedad (2 minutos)

1. **Nombre de la propiedad**: `PibeLabs Website`

2. **Zona horaria**:
   - Busca: `Buenos Aires`
   - Selecciona: `(GMT-03:00) Buenos Aires`

3. **Moneda**:
   - Busca: `Peso`
   - Selecciona: `Peso argentino (ARS)` o `Dólar estadounidense (USD)`

4. Haz clic en **Siguiente**

5. **Detalles del negocio**:
   ```
   Sector: Computadoras y electrónica
   Tamaño de la empresa: Pequeña (1-10 empleados)
   ¿Cómo piensa usar Google Analytics?: Generar clientes potenciales
   ```

6. Haz clic en **Crear**

7. Acepta los **Términos del Servicio de Google Analytics**:
   - Marca las casillas
   - Haz clic en **Acepto**

✅ **Verificación**: Estás en la pantalla "Configurar recopilación de datos"

---

### Paso 3: Configurar Recopilación de Datos (2 minutos)

1. En "Configurar recopilación de datos", selecciona **Web**

2. Configura el flujo de datos:
   ```
   URL del sitio web: https://tudominio.com
   Nombre del flujo: PibeLabs Website
   ```

   💡 **Importante**: Reemplaza `tudominio.com` con tu dominio real

3. **Deja desmarcada** la opción "Medición mejorada" por ahora (puedes activarla después)

4. Haz clic en **Crear flujo**

5. **🎯 CRUCIAL**: Verás una pantalla con detalles del flujo de datos web

6. En la parte superior, busca el **MEASUREMENT ID**. Se verá así:
   ```
   G-XXXXXXXXXX
   ```
   Donde las X son letras y números.

7. **COPIA** este Measurement ID completo

   💡 **Consejo**: Guárdalo en un lugar seguro, lo necesitarás ahora.

✅ **Verificación**: Tienes el Measurement ID que empieza con `G-`

---

### Paso 4: Configurar Variable de Entorno (2 minutos)

Ahora vamos a configurar tu proyecto para usar Google Analytics:

1. **Abre** tu proyecto en el editor de código

2. En la **raíz del proyecto**, busca el archivo `.env`
   - Si existe, ábrelo
   - Si NO existe, créalo

3. **Agrega** esta línea al archivo `.env`:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   💡 Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real

4. **Guarda** el archivo (Ctrl+S / Cmd+S)

5. **⚠️ IMPORTANTE - Para Producción (Hostinger)**:

   Si ya desplegaste a Hostinger, también debes configurarlo allí:

   a. Ve a **hPanel** de Hostinger

   b. Busca la sección **Variables de entorno** o **Environment Variables**

   c. Agrega una nueva variable:
      ```
      Nombre: VITE_GA_MEASUREMENT_ID
      Valor: G-XXXXXXXXXX
      ```

   d. Haz clic en **Guardar**

   e. **Reinicia** la aplicación si es necesario

6. **Reinicia tu servidor de desarrollo**:
   ```bash
   # Presiona Ctrl+C para detener el servidor
   # Luego vuelve a iniciarlo:
   npm run dev
   ```

✅ **Verificación**: El archivo `.env` tiene la línea con tu Measurement ID.

---

### Paso 5: Verificar que Funciona (1 minuto)

1. **Abre** tu navegador en `http://localhost:3000`

2. **Abre DevTools**:
   - Windows/Linux: F12 o Ctrl+Shift+I
   - Mac: Cmd+Option+I

3. Ve a la pestaña **Console**

4. **Navega** por tu sitio web (haz clic en diferentes secciones)

5. **Completa el formulario de contacto**

6. En la **Console**, deberías ver mensajes como:
   ```
   Google Analytics initialized: G-XXXXXXXXXX
   GA Event: form_start {...}
   GA Event: form_field_complete {...}
   GA Event: form_submit {...}
   GA Event: generate_lead {...}
   ✅ Lead conversion tracked: {...}
   ```

**Si ves estos mensajes: ✅ ¡Google Analytics está funcionando!**

---

### Paso 6: Verificar en Google Analytics en Tiempo Real (1 minuto)

1. Ve a [analytics.google.com](https://analytics.google.com/)

2. Selecciona tu propiedad **PibeLabs Website**

3. En el menú izquierdo, haz clic en:
   ```
   Informes → Tiempo real
   ```

4. **Completa el formulario** de contacto en tu sitio

5. En 1-2 segundos, deberías ver en Google Analytics:
   - **1 usuario activo** en el gráfico
   - El evento **generate_lead** en la lista de "Eventos por conteo de eventos"

**Si aparece el evento: ✅ ¡Todo está configurado perfectamente!**

---

## 🎉 ¡Configuración Completada!

### ✅ Checklist Final

Verifica que todo esté listo:

**Google Sheets:**
- [ ] Google Sheet creado
- [ ] Apps Script configurado con el código
- [ ] Web App desplegada y autorizada
- [ ] URL de implementación copiada
- [ ] `google-sheets-integration.php` actualizado
- [ ] Archivo subido a Hostinger
- [ ] Test realizado - datos aparecen en el Sheet

**Google Analytics:**
- [ ] Cuenta GA4 creada
- [ ] Propiedad configurada
- [ ] Flujo de datos web creado
- [ ] Measurement ID copiado
- [ ] Variable `.env` configurada localmente
- [ ] (Si aplica) Variable configurada en Hostinger
- [ ] Servidor reiniciado
- [ ] Eventos aparecen en DevTools Console
- [ ] Eventos aparecen en GA Tiempo Real

---

## 🔄 Flujo Completo de un Lead

Cuando un cliente llena el formulario:

1. **Frontend** valida los datos
2. **Backend PHP** recibe y procesa
3. **Email** se envía a `contact@pibelabs.com`
4. **Google Sheets** guarda el lead automáticamente
5. **Google Analytics** registra la conversión (`generate_lead`)
6. **Archivo Log** guarda respaldo en `leads.log`

**Resultado**: Tienes el lead en 4 lugares diferentes 🎯

---

## 📊 ¿Qué Puedes Hacer Ahora?

### En Google Sheets:

1. **Ver todos los leads** en tiempo real
2. **Filtrar por servicio**: Web, IA, Diseño, Cloud
3. **Ordenar por fecha**: Más recientes primero
4. **Cambiar estados**: Usa el menú "PibeLabs Leads"
5. **Exportar a Excel**: Archivo → Descargar → Excel
6. **Compartir con el equipo**: Botón "Compartir"

### En Google Analytics:

1. **Ver conversiones en tiempo real**: Informes → Tiempo real
2. **Analizar tráfico**: De dónde vienen tus leads
3. **Ver dispositivos**: Móvil vs Desktop
4. **Tasa de conversión**: % de visitantes que se convierten en leads
5. **Comparar períodos**: Esta semana vs semana pasada

---

## 🆘 Problemas Comunes

### Google Sheets: Los datos no aparecen

**Solución rápida:**
1. Espera 10 segundos y refresca el Sheet
2. Verifica que la URL en `google-sheets-integration.php` sea exacta
3. Asegúrate de que termine en `/exec`
4. Prueba ejecutando el curl de nuevo

**Si persiste:** Ve a Apps Script → Ejecuciones (panel izquierdo) → Busca errores

---

### Google Analytics: Los eventos no aparecen

**Solución rápida:**
1. Verifica que el Measurement ID en `.env` sea correcto
2. Reinicia el servidor: Ctrl+C y luego `npm run dev`
3. Borra la caché del navegador: Ctrl+Shift+Del
4. Prueba en modo incógnito
5. Desactiva ad blockers temporalmente

**Si persiste:** Abre DevTools → Network → Filtra por "gtag" → Deberías ver peticiones a Google

---

### "Permission denied" en Apps Script

**Solución:**
1. Ve a Apps Script → Implementar → Administrar implementaciones
2. Haz clic en el ícono de lápiz (editar)
3. Cambia a "Nueva versión"
4. Implementar
5. Autoriza de nuevo

---

## 📚 Documentación Completa

Para información más detallada, consulta:

- **`docs/GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md`** - Guía completa (1000+ líneas)
- **`docs/HOSTINGER_CONTACT_FORM.md`** - Setup del formulario
- **`server/README.md`** - Documentación del backend

---

## 🎯 Próximos Pasos Opcionales

Una vez que todo funcione:

1. **Configurar conversión en GA4**:
   - Admin → Conversiones → Marcar evento `generate_lead`

2. **Resumen diario por email**:
   - Apps Script → Triggers → Configurar `doSendDailySummary` a las 9 AM

3. **Dashboard personalizado**:
   - Google Sheets: Crear pestaña "Dashboard" con gráficos
   - Google Analytics: Crear informe personalizado

4. **Integraciones**:
   - Conectar con Zapier para automatizar más
   - Integrar con tu CRM (HubSpot, Pipedrive, etc.)

---

## ✅ Todo Listo

**¡Felicitaciones! 🎉**

Tu sistema de captura y análisis de leads está 100% funcional.

Cada vez que un cliente potencial llene el formulario:
- ✉️ Recibirás un email
- 📊 Se guardará en Google Sheets
- 📈 Se trackeará en Google Analytics
- 💾 Se respaldará en el log

**Tu equipo puede trabajar más eficientemente con todos los leads organizados y rastreados.**

---

**Creado para PibeLabs**
📍 Despeñaderos, Córdoba, Argentina
👥 Fundado por Lucas Benavidez y Juan Cruz Ferri
📞 WhatsApp: +54 9 351 3088400

¿Preguntas? Revisa la documentación completa en `docs/`
