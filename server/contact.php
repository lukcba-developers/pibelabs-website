<?php
/**
 * PibeLabs - Contact Form API Endpoint
 *
 * Este archivo maneja el envío del formulario de contacto.
 * Sube este archivo a: public_html/api/contact.php en Hostinger
 *
 * @author PibeLabs
 * @version 1.0.0
 */

// Configuración CORS
header('Access-Control-Allow-Origin: *');
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

// ============================================
// CONFIGURACIÓN - EDITA ESTOS VALORES
// ============================================

define('EMAIL_TO', 'contact@pibelabs.com');        // Tu email para recibir leads
define('EMAIL_FROM', 'no-reply@pibelabs.com');     // Email remitente
define('ENABLE_LOG', true);                         // Guardar leads en archivo log
define('LOG_FILE', __DIR__ . '/../leads.log');     // Ubicación del archivo log

// ============================================
// RATE LIMITING
// ============================================

function checkRateLimit($ip) {
    $limitFile = __DIR__ . '/../rate_limit.json';
    $limits = [];

    if (file_exists($limitFile)) {
        $content = file_get_contents($limitFile);
        $limits = json_decode($content, true) ?? [];
    }

    $now = time();
    $windowTime = 300; // 5 minutos
    $maxAttempts = 3;  // 3 intentos máximo

    // Limpiar intentos antiguos
    $limits = array_filter($limits, function($timestamp) use ($now, $windowTime) {
        return ($now - $timestamp) < $windowTime;
    });

    // Contar intentos de esta IP
    $ipAttempts = isset($limits[$ip]) ? (is_array($limits[$ip]) ? count($limits[$ip]) : 1) : 0;

    if ($ipAttempts >= $maxAttempts) {
        return false;
    }

    // Registrar intento
    if (!isset($limits[$ip])) {
        $limits[$ip] = [];
    }
    $limits[$ip][] = $now;

    file_put_contents($limitFile, json_encode($limits));
    return true;
}

// Verificar rate limit
$clientIp = $_SERVER['REMOTE_ADDR'];
if (!checkRateLimit($clientIp)) {
    http_response_code(429);
    echo json_encode([
        'error' => 'Has alcanzado el límite de envíos. Por favor intenta más tarde.'
    ]);
    exit();
}

// ============================================
// LEER Y VALIDAR DATOS
// ============================================

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit();
}

// Validación
$errors = [];

if (empty($data['name']) || strlen($data['name']) < 2) {
    $errors[] = 'Nombre inválido (mínimo 2 caracteres)';
}

if (strlen($data['name']) > 100) {
    $errors[] = 'Nombre muy largo (máximo 100 caracteres)';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

// Lista de dominios de email desechables (expandir según necesidad)
$disposableDomains = ['tempmail.com', 'guerrillamail.com', 'mailinator.com'];
$emailDomain = substr(strrchr($data['email'], "@"), 1);
if (in_array(strtolower($emailDomain), $disposableDomains)) {
    $errors[] = 'Por favor usa un email válido (no temporal)';
}

if (empty($data['service'])) {
    $errors[] = 'Servicio no especificado';
}

$validServices = ['web', 'ia', 'design', 'cloud'];
if (!in_array($data['service'], $validServices)) {
    $errors[] = 'Servicio inválido';
}

if (empty($data['message']) || strlen($data['message']) < 10) {
    $errors[] = 'Mensaje muy corto (mínimo 10 caracteres)';
}

if (strlen($data['message']) > 500) {
    $errors[] = 'Mensaje muy largo (máximo 500 caracteres)';
}

// Si hay errores, retornar
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit();
}

// ============================================
// SANITIZAR DATOS
// ============================================

$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$service = htmlspecialchars(strip_tags($data['service']));
$message = htmlspecialchars(strip_tags(trim($data['message'])));

// Mapeo de servicios a nombres legibles
$serviceNames = [
    'web' => '🌐 Desarrollo Web',
    'ia' => '🤖 Inteligencia Artificial',
    'design' => '🎨 Diseño UX/UI',
    'cloud' => '☁️ Soluciones Cloud'
];

$serviceName = $serviceNames[$service] ?? $service;

// ============================================
// PREPARAR EMAIL
// ============================================

$to = EMAIL_TO;
$subject = '🚀 Nuevo Lead desde PibeLabs: ' . $serviceName . ' - ' . $name;
$headers = "From: " . EMAIL_FROM . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Cuerpo del email en HTML
$emailBody = "
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Nuevo Lead - PibeLabs</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #00D9FF 0%, #FF006A 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            display: block;
            font-weight: 600;
            font-size: 14px;
            color: #00D9FF;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .value {
            font-size: 16px;
            color: #333;
            padding: 12px;
            background: #f9f9f9;
            border-left: 4px solid #00D9FF;
            border-radius: 4px;
        }
        .value a {
            color: #00D9FF;
            text-decoration: none;
        }
        .value a:hover {
            text-decoration: underline;
        }
        .message-box {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            background: #f9f9f9;
            padding: 20px;
            text-align: center;
            border-top: 2px solid #e0e0e0;
        }
        .footer p {
            font-size: 13px;
            color: #666;
            margin-bottom: 8px;
        }
        .footer .highlight {
            background: linear-gradient(135deg, #00D9FF 0%, #FF006A 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }
        .action-button {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 30px;
            background: linear-gradient(135deg, #00D9FF 0%, #FF006A 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .action-button:hover {
            transform: translateY(-2px);
        }
        @media (max-width: 600px) {
            .container {
                border-radius: 0;
            }
            body {
                padding: 0;
            }
            .header h1 {
                font-size: 24px;
            }
            .content {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎯 Nuevo Lead desde PibeLabs</h1>
            <p>¡Un cliente potencial se ha contactado!</p>
        </div>

        <div class='content'>
            <div class='field'>
                <span class='label'>👤 Nombre Completo</span>
                <div class='value'>" . $name . "</div>
            </div>

            <div class='field'>
                <span class='label'>📧 Correo Electrónico</span>
                <div class='value'>
                    <a href='mailto:" . $email . "'>" . $email . "</a>
                </div>
            </div>

            <div class='field'>
                <span class='label'>🎯 Servicio de Interés</span>
                <div class='value'>" . $serviceName . "</div>
            </div>

            <div class='field'>
                <span class='label'>💬 Mensaje del Cliente</span>
                <div class='value message-box'>" . nl2br($message) . "</div>
            </div>
        </div>

        <div class='footer'>
            <p><strong>⏰ Fecha y Hora:</strong> " . date('d/m/Y H:i:s') . " (UTC-3)</p>
            <p><strong>🌐 Dirección IP:</strong> " . $clientIp . "</p>
            <p><strong>🔔 User Agent:</strong> " . substr($_SERVER['HTTP_USER_AGENT'] ?? 'No disponible', 0, 80) . "</p>
            <hr style='margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;'>
            <p style='font-size: 14px; font-weight: 600;'>
                <span class='highlight'>⚡ Responder en menos de 24 horas para máxima conversión</span>
            </p>
            <a href='mailto:" . $email . "?subject=Re: Consulta sobre " . $serviceName . "' class='action-button'>
                ✉️ Responder Ahora
            </a>
        </div>
    </div>
</body>
</html>
";

// ============================================
// ENVIAR EMAIL
// ============================================

$success = @mail($to, $subject, $emailBody, $headers);

// ============================================
// GUARDAR LOG (OPCIONAL)
// ============================================

if (ENABLE_LOG) {
    try {
        $timestamp = date('Y-m-d H:i:s');
        $logEntry = sprintf(
            "%s | %s | %s | %s | %s | %s\n",
            $timestamp,
            $name,
            $email,
            $service,
            $clientIp,
            mb_substr(str_replace(["\r", "\n"], ' ', $message), 0, 100)
        );

        file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
    } catch (Exception $e) {
        // Silently fail if logging fails
        error_log('Failed to write to log file: ' . $e->getMessage());
    }
}

// ============================================
// GUARDAR EN GOOGLE SHEETS (OPCIONAL)
// ============================================

require_once __DIR__ . '/google-sheets-integration.php';

try {
    $sheetData = [
        'name' => $name,
        'email' => $email,
        'service' => $service,
        'message' => $message
    ];

    saveToGoogleSheets($sheetData);
    // No bloquear la respuesta si falla Google Sheets
} catch (Exception $e) {
    error_log('Failed to save to Google Sheets: ' . $e->getMessage());
}

// ============================================
// RESPUESTA
// ============================================

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente. Te responderemos pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email. Por favor intenta nuevamente o contáctanos directamente.',
        'email' => EMAIL_TO
    ]);
}
?>
