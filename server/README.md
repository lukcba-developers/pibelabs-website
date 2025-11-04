# 📁 Server - Backend para Formulario de Contacto

Esta carpeta contiene los archivos necesarios para el backend del formulario de contacto de PibeLabs en Hostinger.

## 📦 Archivos Incluidos

- **`contact.php`** - API endpoint para procesar el formulario de contacto
- **`.htaccess`** - Configuración de seguridad y rate limiting
- **`README.md`** - Esta documentación

## 🚀 Instalación Rápida en Hostinger

### Paso 1: Acceder a tu Hosting

1. Ve a **hPanel de Hostinger**
2. Busca la sección **Administrador de Archivos** (File Manager)
3. Navega a `public_html/`

### Paso 2: Crear Estructura de Carpetas

Crea la siguiente estructura:

```
public_html/
├── api/
│   ├── contact.php     ← Sube este archivo
│   └── .htaccess       ← Sube este archivo
```

### Paso 3: Subir Archivos

1. Crea la carpeta `api/` si no existe:
   - Clic en **Nueva Carpeta** → Nombre: `api`

2. Entra a la carpeta `api/`

3. Sube los archivos:
   - **Upload** → Selecciona `contact.php`
   - **Upload** → Selecciona `.htaccess`

### Paso 4: Configurar Email en contact.php

Edita `contact.php` y cambia estas líneas (líneas 27-29):

```php
define('EMAIL_TO', 'contact@pibelabs.com');        // Tu email
define('EMAIL_FROM', 'no-reply@pibelabs.com');     // Email remitente
define('ENABLE_LOG', true);                         // Mantener logs
```

### Paso 5: Configurar Permisos

Asegúrate de que los archivos tengan los permisos correctos:

- `contact.php` → **644** (rw-r--r--)
- `.htaccess` → **644** (rw-r--r--)
- Carpeta `api/` → **755** (rwxr-xr-x)

Para cambiar permisos:
1. Clic derecho en el archivo
2. **Change Permissions** o **Permisos**
3. Establecer **644** o **755** según corresponda

### Paso 6: Crear Email en Hostinger (Importante)

Si no tienes configurado el email:

1. Ve a **hPanel → Correos Electrónicos**
2. Clic en **Crear Cuenta de Email**
3. Crea: `contact@pibelabs.com`
4. Establece una contraseña segura
5. Guarda la configuración

### Paso 7: Probar el Endpoint

Abre tu navegador o usa Postman/curl para probar:

**URL de prueba:**
```
https://tudominio.com/api/contact.php
```

**Prueba con curl:**

```bash
curl -X POST https://tudominio.com/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "web",
    "message": "Este es un mensaje de prueba del formulario"
  }'
```

**Respuesta esperada (éxito):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te responderemos pronto."
}
```

### Paso 8: Actualizar Frontend

Edita el archivo del frontend:

**Archivo:** `src/components/organisms/ContactForm/ContactForm.tsx`

**Línea 82-83**, reemplaza:

```typescript
// ANTES (simulación):
await new Promise((resolve) => setTimeout(resolve, 2000));

// DESPUÉS (real):
const response = await fetch('https://tudominio.com/api/contact.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error || 'Error al enviar el mensaje');
}

console.log('Form submitted successfully:', result);
```

**Reemplaza `https://tudominio.com` con tu dominio real.**

### Paso 9: Verificar que Funciona

1. Ve a tu sitio web: `https://tudominio.com/#contact`
2. Llena el formulario de contacto
3. Haz clic en **Enviar Mensaje**
4. Verifica tu bandeja de entrada en `contact@pibelabs.com`
5. Deberías recibir un email con los datos del lead

---

## 🔧 Solución de Problemas

### Problema: "Error al enviar el email"

**Solución 1: Verificar que el email existe**
- Ve a hPanel → Correos Electrónicos
- Asegúrate de que `contact@pibelabs.com` está creado

**Solución 2: Verificar función mail()**
- Hostinger tiene `mail()` habilitado por defecto
- Si no funciona, contacta al soporte de Hostinger

**Solución 3: Usar PHPMailer con SMTP**
- Ver documentación completa en `docs/HOSTINGER_CONTACT_FORM.md`
- Sección "Opción 2: PHPMailer con SMTP"

### Problema: "Método no permitido" o Error 405

**Causa:** El servidor no está recibiendo peticiones POST correctamente

**Solución:**
1. Verifica que `.htaccess` está en la misma carpeta que `contact.php`
2. Asegúrate de que `mod_rewrite` está habilitado (normalmente sí en Hostinger)

### Problema: CORS Error en el navegador

**Síntoma:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Solución:**
El archivo `contact.php` ya incluye headers CORS. Si persiste:

1. Verifica que las líneas 14-16 de `contact.php` estén presentes:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

2. Si quieres más seguridad, reemplaza `*` con tu dominio:
```php
header('Access-Control-Allow-Origin: https://tudominio.com');
```

### Problema: "Has alcanzado el límite de envíos"

**Causa:** Rate limiting activado (protección anti-spam)

**Solución:**
- Espera 5 minutos y vuelve a intentar
- O edita `contact.php` línea 52 y cambia:
```php
$windowTime = 300; // 5 minutos → cambiar a 60 (1 minuto)
$maxAttempts = 3;  // 3 intentos → cambiar a 10
```

### Problema: No se reciben emails

**Verificaciones:**

1. **Revisar carpeta de Spam**
   - Los emails pueden llegar a spam la primera vez
   - Marca como "No es spam"

2. **Verificar logs**
   - Accede al archivo `public_html/leads.log`
   - Si el lead aparece ahí, el script funciona
   - El problema es la entrega del email

3. **Verificar configuración SPF/DKIM**
   - Ve a hPanel → Configuración de Email
   - Asegúrate de tener SPF y DKIM configurados
   - Esto mejora la entregabilidad

4. **Contactar soporte de Hostinger**
   - Si nada funciona, ellos pueden revisar logs del servidor
   - Menciona que la función `mail()` no está enviando emails

---

## 📊 Monitoreo de Leads

### Ver Logs de Leads

Los leads se guardan automáticamente en: `public_html/leads.log`

Para ver el archivo:
1. Ve a **File Manager** en hPanel
2. Navega a `public_html/`
3. Busca el archivo `leads.log`
4. Clic derecho → **View** o **Edit**

**Formato del log:**
```
2025-11-03 12:30:45 | Juan Pérez | juan@example.com | web | 192.168.1.1 | Mensaje: Necesito un sitio web...
2025-11-03 13:15:22 | María García | maria@example.com | ia | 192.168.1.2 | Mensaje: Proyecto de IA...
```

### Descargar Leads

Puedes descargar el archivo `leads.log` periódicamente para:
- Importar a Excel/Google Sheets
- Agregar a tu CRM
- Hacer análisis de leads

---

## 🔐 Seguridad

### Rate Limiting

El script incluye rate limiting automático:
- **3 envíos máximo por IP** cada 5 minutos
- Previene spam y ataques DoS
- Se guarda en `rate_limit.json`

### Validaciones Implementadas

✅ Validación de formato de email
✅ Detección de emails temporales/desechables
✅ Límite de caracteres (min/max)
✅ Sanitización de HTML
✅ Protección XSS
✅ Rate limiting por IP
✅ Headers de seguridad

### Protección de Archivos

El `.htaccess` bloquea acceso directo a:
- `*.log` → Logs de leads
- `*.json` → Rate limit data
- Archivos de configuración

---

## 📈 Próximos Pasos (Opcional)

### 1. Integrar con Base de Datos

En lugar de guardar en archivo `.log`, guarda en MySQL:

```php
$conn = new mysqli('localhost', 'usuario', 'password', 'pibelabs_db');
$stmt = $conn->prepare("INSERT INTO leads (name, email, service, message, ip_address) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $service, $message, $clientIp);
$stmt->execute();
```

### 2. Notificaciones en Tiempo Real

Integra con Telegram/Slack para recibir notificaciones instantáneas:

**Telegram:**
```php
$telegramToken = 'TU_BOT_TOKEN';
$chatId = 'TU_CHAT_ID';
$message = "🚀 Nuevo Lead: $name ($email) - Servicio: $service";
file_get_contents("https://api.telegram.org/bot$telegramToken/sendMessage?chat_id=$chatId&text=" . urlencode($message));
```

### 3. Auto-respuesta al Cliente

Envía un email de confirmación automático al cliente:

```php
$autoReplySubject = 'Gracias por contactar a PibeLabs';
$autoReplyBody = "Hola $name, hemos recibido tu mensaje...";
mail($email, $autoReplySubject, $autoReplyBody, $headers);
```

### 4. Google Analytics Tracking

Agrega eventos a Google Analytics cuando se envía el formulario.

### 5. CRM Integration

Integra con HubSpot, Pipedrive, o tu CRM favorito usando sus APIs.

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa esta documentación primero**
2. **Consulta** `docs/HOSTINGER_CONTACT_FORM.md` para más opciones
3. **Contacta al soporte de Hostinger** si el problema es del servidor
4. **Revisa los logs de PHP**: `public_html/error_log`

---

## ✅ Checklist de Deployment

- [ ] Carpeta `api/` creada en `public_html/`
- [ ] Archivo `contact.php` subido
- [ ] Archivo `.htaccess` subido
- [ ] Email `contact@pibelabs.com` configurado en Hostinger
- [ ] Configuración de `EMAIL_TO` actualizada en `contact.php`
- [ ] Permisos correctos (644) en los archivos
- [ ] Endpoint probado con curl o Postman
- [ ] Frontend actualizado con URL real del endpoint
- [ ] Formulario probado desde el sitio web
- [ ] Email recibido correctamente
- [ ] Logs funcionando (`leads.log` se crea)
- [ ] Carpeta de Spam revisada
- [ ] SPF/DKIM configurados (opcional, mejora entregabilidad)

---

**Creado para PibeLabs**
Fundado por Lucas Benavidez y Juan Cruz Ferri
Despeñaderos, Córdoba, Argentina 🇦🇷
