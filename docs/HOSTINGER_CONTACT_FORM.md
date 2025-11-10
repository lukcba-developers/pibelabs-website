# Configuración del Formulario de Contacto en Hostinger

Esta guía explica cómo configurar el backend del formulario de contacto de PibeLabs en Hostinger para recibir y procesar los mensajes de clientes potenciales.

## 📋 Datos que Captura el Formulario

El formulario de contacto captura los siguientes datos:

- **Nombre Completo**: Nombre del cliente potencial
- **Email**: Dirección de correo electrónico
- **Servicio de Interés**: Web, IA, Diseño UX/UI, o Cloud
- **Mensaje**: Descripción del proyecto (10-500 caracteres)

## 🎯 Opciones de Implementación

### Opción 1: PHP con Envío de Email (Recomendado para Hostinger)

Esta es la opción más simple y común en Hostinger. Usa PHP nativo con la función `mail()` o PHPMailer.

#### Paso 1: Crear el Script PHP

Crea el archivo `server/contact.php` en tu directorio `public_html` (o el directorio que sirva tu backend):

```php
<?php
// server/contact.php
header('Access-Control-Allow-Origin: *'); // En producción, reemplaza * con tu dominio: https://www.pibelabs.com
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Leer y validar datos
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validación básica
$errors = [];

if (empty($data['name']) || strlen($data['name']) < 2) {
    $errors[] = 'Nombre inválido';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

if (empty($data['service'])) {
    $errors[] = 'Servicio no especificado';
}

if (empty($data['message']) || strlen($data['message']) < 10) {
    $errors[] = 'Mensaje muy corto';
}

if (strlen($data['message']) > 500) {
    $errors[] = 'Mensaje muy largo';
}

// Si hay errores, retornar
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit();
}

// Sanitizar datos
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$service = htmlspecialchars(strip_tags($data['service']));
$message = htmlspecialchars(strip_tags($data['message']));

// Configurar email
$to = 'contact@pibelabs.com'; // Tu email de PibeLabs
$subject = '🚀 Nuevo Lead: ' . $service . ' - ' . $name;
$headers = "From: no-reply@pibelabs.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Crear cuerpo del email en HTML
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00D9FF 0%, #FF006A 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #00D9FF; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00D9FF; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0;'>🎯 Nuevo Lead desde PibeLabs</h1>
            <p style='margin: 5px 0 0 0;'>¡Un cliente potencial se ha contactado!</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Nombre Completo:</div>
                <div class='value'>" . $name . "</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'><a href='mailto:" . $email . "'>" . $email . "</a></div>
            </div>
            <div class='field'>
                <div class='label'>🎯 Servicio de Interés:</div>
                <div class='value'>" . ucfirst($service) . "</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Mensaje:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            <div class='footer'>
                <p>⏰ Fecha: " . date('d/m/Y H:i:s') . " (UTC-3)</p>
                <p>🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "</p>
                <p><strong>⚡ Responder en menos de 24 horas para máxima conversión</strong></p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Intentar enviar email
$success = mail($to, $subject, $emailBody, $headers);

if ($success) {
    // Opcional: Guardar en base de datos o archivo
    $logFile = __DIR__ . '/../leads.log';
    $logEntry = date('Y-m-d H:i:s') . " | " . $name . " | " . $email . " | " . $service . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email. Intenta nuevamente.'
    ]);
}
?>
```

#### Paso 2: Crear Archivo .htaccess para Seguridad

Crea `.htaccess` en el directorio `api/`:

```apache
# Bloquear acceso directo al log
<Files "leads.log">
    Order allow,deny
    Deny from all
</Files>

# Forzar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Configurar límite de tasa (rate limiting)
<IfModule mod_ratelimit.c>
    SetOutputFilter RATE_LIMIT
    SetEnv rate-limit 400
</IfModule>
```

#### Paso 3: Actualizar el Frontend

Para que el frontend se comunique con el backend, es crucial usar variables de entorno para no hardcodear la URL.

1.  **Asegúrate de que tu archivo `.env` contenga la variable para el endpoint:**

    ```env
    VITE_CONTACT_FORM_ENDPOINT="https://pibelabs.com/server/contact.php"
    ```

2.  **Usa esta variable en tu componente `ContactForm.tsx`:**

    ```typescript
    // src/components/organisms/ContactForm/ContactForm.tsx

    // Obtiene la URL desde las variables de entorno de Vite
    const contactFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    // Dentro de la función onSubmit
    try {
      const response = await fetch(contactFormEndpoint, {
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

      // ... resto de la lógica de éxito ...

    } catch (error) {
      // ... manejo de errores ...
    }
    ```


---

### Opción 2: PHPMailer con SMTP (Más Confiable)

Si la función `mail()` no funciona bien en Hostinger, usa PHPMailer con SMTP.

#### Paso 1: Descargar PHPMailer

1. Descarga PHPMailer desde: https://github.com/PHPMailer/PHPMailer
2. Sube la carpeta `PHPMailer` a `public_html/vendor/`

#### Paso 2: Crear Script con SMTP

Crea `api/contact-smtp.php`:

```php
<?php
require '../vendor/PHPMailer/PHPMailer.php';
require '../vendor/PHPMailer/SMTP.php';
require '../vendor/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validación (igual que antes)
// ... código de validación ...

$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$service = htmlspecialchars(strip_tags($data['service']));
$message = htmlspecialchars(strip_tags($data['message']));

$mail = new PHPMailer(true);

try {
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com'; // SMTP de Hostinger
    $mail->SMTPAuth = true;
    $mail->Username = 'contact@pibelabs.com'; // Tu email
    $mail->Password = 'TU_PASSWORD_AQUI'; // Tu password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Configurar remitente y destinatario
    $mail->setFrom('contact@pibelabs.com', 'PibeLabs Contact Form');
    $mail->addAddress('contact@pibelabs.com', 'PibeLabs Team');
    $mail->addReplyTo($email, $name);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = '🚀 Nuevo Lead: ' . $service . ' - ' . $name;

    // Mismo cuerpo HTML que antes
    $mail->Body = "<!-- HTML del email -->";

    $mail->send();

    // Guardar log
    $logFile = __DIR__ . '/../leads.log';
    $logEntry = date('Y-m-d H:i:s') . " | " . $name . " | " . $email . " | " . $service . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar: ' . $mail->ErrorInfo
    ]);
}
?>
```

#### Configuración SMTP en Hostinger

1. Ve a **hPanel → Correos Electrónicos**
2. Crea la cuenta `contact@pibelabs.com`
3. Usa estos datos:
   - **Host**: `smtp.hostinger.com`
   - **Puerto**: `587` (STARTTLS) o `465` (SSL)
   - **Usuario**: `contact@pibelabs.com`
   - **Password**: Tu contraseña de email

---

### Opción 3: Servicios de Terceros (Sin Backend)

Si prefieres no usar PHP, puedes usar servicios de terceros:

#### 3A. FormSubmit (Gratis, Sin Registro)

1. Cambia el endpoint en el frontend:

```typescript
const response = await fetch('https://formsubmit.co/contact@pibelabs.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: data.name,
    email: data.email,
    service: data.service,
    message: data.message,
    _subject: `Nuevo Lead: ${data.service}`,
    _captcha: 'false', // Desactivar captcha
    _template: 'table', // Formato tabla
  }),
});
```

2. **Confirmación inicial**: El primer envío requiere confirmar tu email

**Pros**: Sin configuración, gratis
**Contras**: Menos control, marca "Sent via FormSubmit"

#### 3B. EmailJS (Gratis hasta 200 emails/mes)

1. Registrate en https://www.emailjs.com/
2. Crea un servicio de email
3. Crea una plantilla de email
4. Instala EmailJS:

```bash
npm install @emailjs/browser
```

5. Actualiza el formulario:

```typescript
import emailjs from '@emailjs/browser';

const onSubmit = async (data: ContactFormData) => {
  try {
    await emailjs.send(
      'service_id', // Tu Service ID
      'template_id', // Tu Template ID
      {
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
      },
      'public_key' // Tu Public Key
    );

    setFormState({ isSubmitting: false, isSuccess: true, isError: false });
  } catch (error) {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      isError: true,
      errorMessage: 'Error al enviar',
    });
  }
};
```

**Pros**: Fácil integración, analytics
**Contras**: Límite de emails, depende de terceros

#### 3C. Formspree (Gratis hasta 50 envíos/mes)

1. Registrate en https://formspree.io/
2. Crea un nuevo formulario
3. Usa el endpoint:

```typescript
const response = await fetch('https://formspree.io/f/TU_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Pros**: Dashboard, notificaciones, integraciones
**Contras**: Límite de envíos en plan gratuito

---

### Opción 4: Backend Node.js en Hostinger

Si prefieres Node.js, Hostinger soporta Node.js en algunos planes.

#### Paso 1: Crear Servidor Express

Crea `server/index.js`:

```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 requests por IP
  message: 'Demasiados intentos, intenta más tarde',
});

app.use('/api/contact', limiter);

// Configurar transporter de email
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@pibelabs.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Endpoint de contacto
app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  // Validación
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    // Enviar email
    await transporter.sendMail({
      from: '"PibeLabs Contact" <contact@pibelabs.com>',
      to: 'contact@pibelabs.com',
      replyTo: email,
      subject: `🚀 Nuevo Lead: ${service} - ${name}`,
      html: `
        <h2>Nuevo Lead desde PibeLabs</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Paso 2: Configurar en Hostinger

1. Ve a **hPanel → Node.js**
2. Crea una nueva aplicación Node.js
3. Sube tu código y configura:
   - **Entry Point**: `server/index.js`
   - **Variables de Entorno**: `EMAIL_PASSWORD=tu_password`
4. Instala dependencias: `npm install express cors nodemailer express-rate-limit`

---

## 🔐 Seguridad y Mejores Prácticas

### 1. Validación y Sanitización

Siempre valida y sanitiza los datos:

```php
// PHP
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
```

### 2. Rate Limiting

Limita los envíos por IP para prevenir spam:

```php
// PHP simple rate limiting
$ip = $_SERVER['REMOTE_ADDR'];
$limitFile = __DIR__ . '/../rate_limit.json';
$limits = json_decode(file_get_contents($limitFile), true) ?? [];

if (isset($limits[$ip]) && $limits[$ip] > time() - 300) { // 5 minutos
    http_response_code(429);
    echo json_encode(['error' => 'Demasiados intentos']);
    exit();
}

$limits[$ip] = time();
file_put_contents($limitFile, json_encode($limits));
```

### 3. CAPTCHA (Opcional)

Agrega Google reCAPTCHA v3 para mayor protección:

1. Registra tu sitio en https://www.google.com/recaptcha/admin
2. Agrega el script en `index.html`:

```html
<script src="https://www.google.com/recaptcha/api.js?render=TU_SITE_KEY"></script>
```

3. En el formulario:

```typescript
const executeRecaptcha = () => {
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute('TU_SITE_KEY', { action: 'submit' }).then(resolve);
    });
  });
};

// En onSubmit:
const token = await executeRecaptcha();
// Enviar token al backend para verificación
```

### 4. HTTPS Obligatorio

Asegúrate de que todo se envíe por HTTPS:

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 5. Variables de Entorno

Nunca hardcodees credenciales. Usa variables de entorno:

```php
// config.php
define('SMTP_USER', getenv('SMTP_USER'));
define('SMTP_PASS', getenv('SMTP_PASS'));
```

---

## 📊 Gestión de Leads

### Guardar en Base de Datos (Opcional)

Si quieres guardar los leads en MySQL:

```php
// Conexión
$conn = new mysqli('localhost', 'tu_usuario', 'tu_password', 'pibelabs_db');

// Crear tabla (ejecutar una vez)
$sql = "CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100),
    message TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Insertar lead
$stmt = $conn->prepare("INSERT INTO leads (name, email, service, message, ip_address) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $service, $message, $_SERVER['REMOTE_ADDR']);
$stmt->execute();
```

### Integración con Google Sheets

Para enviar leads a Google Sheets automáticamente:

1. Crea un Google Apps Script
2. Usa `fetch()` para enviar datos al script

---

## 🎯 Recomendación Final

Para **PibeLabs en Hostinger**, recomiendo:

### Configuración Inicial (Rápida)
- **Opción 3A (FormSubmit)** - Sin configuración, funciona inmediatamente

### Configuración Profesional (Recomendada)
- **Opción 2 (PHPMailer con SMTP)** - Máxima confiabilidad y control
- Guardar leads en MySQL para seguimiento
- Agregar notificaciones por Telegram/Slack

### Configuración Avanzada (Futuro)
- **Opción 4 (Node.js)** - Escalable, integración con CRM

---

## 📞 Soporte

Si tienes problemas:

1. Verifica que PHP 7.4+ esté habilitado en Hostinger
2. Revisa los logs de error: `tail -f error_log`
3. Prueba el endpoint con Postman antes de conectar el frontend
4. Contacta al soporte de Hostinger para configuración SMTP

---

## ✅ Checklist de Implementación

- [ ] Crear archivo `api/contact.php`
- [ ] Configurar email en Hostinger (`contact@pibelabs.com`)
- [ ] Agregar `.htaccess` para seguridad
- [ ] Actualizar URL del endpoint en `ContactForm.tsx`
- [ ] Probar envío de formulario
- [ ] Verificar recepción de email
- [ ] Configurar respuestas automáticas (opcional)
- [ ] Agregar Google Analytics/Tag Manager para tracking
- [ ] Configurar alertas (Telegram, Slack, etc.)
- [ ] Documentar proceso para el equipo

---

**Creado para PibeLabs** | Fundado por Lucas Benavidez y Juan Cruz Ferri en Despeñaderos, Córdoba, Argentina
