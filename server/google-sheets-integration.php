<?php
/**
 * PibeLabs - Google Sheets Integration
 *
 * Este archivo permite guardar los leads automáticamente en Google Sheets
 *
 * @author PibeLabs
 * @version 1.0.0
 */

/**
 * Envía un lead a Google Sheets usando Apps Script Web App
 *
 * @param array $data Datos del lead (name, email, service, message)
 * @return bool True si se guardó correctamente, false en caso contrario
 */
function saveToGoogleSheets($data) {
    // ============================================
    // CONFIGURACIÓN - Obtén esta URL desde Google Apps Script
    // ============================================

    // URL del Google Apps Script Web App (ver documentación para obtenerla)
    $scriptUrl = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec';

    // Si no está configurado, no intentar enviar
    if (strpos($scriptUrl, 'TU_DEPLOYMENT_ID') !== false) {
        error_log('Google Sheets integration not configured. Skipping...');
        return false;
    }

    // ============================================
    // PREPARAR DATOS PARA ENVIAR
    // ============================================

    $payload = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $data['name'],
        'email' => $data['email'],
        'service' => $data['service'],
        'message' => $data['message'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
        'referrer' => $_SERVER['HTTP_REFERER'] ?? 'Direct',
    ];

    // ============================================
    // ENVIAR A GOOGLE SHEETS
    // ============================================

    try {
        $ch = curl_init($scriptUrl);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($payload),
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
            ],
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);

        curl_close($ch);

        // Verificar respuesta
        if ($httpCode === 200 || $httpCode === 302) {
            error_log('Lead saved to Google Sheets successfully');
            return true;
        } else {
            error_log('Failed to save to Google Sheets. HTTP Code: ' . $httpCode);
            error_log('Response: ' . $response);
            return false;
        }

    } catch (Exception $e) {
        error_log('Exception saving to Google Sheets: ' . $e->getMessage());
        return false;
    }
}

/**
 * Función alternativa usando file_get_contents (si curl no está disponible)
 */
function saveToGoogleSheetsSimple($data) {
    $scriptUrl = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec';

    if (strpos($scriptUrl, 'TU_DEPLOYMENT_ID') !== false) {
        return false;
    }

    $payload = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $data['name'],
        'email' => $data['email'],
        'service' => $data['service'],
        'message' => $data['message'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
        'referrer' => $_SERVER['HTTP_REFERER'] ?? 'Direct',
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($payload),
            'timeout' => 10,
        ],
    ];

    $context = stream_context_create($options);
    $result = @file_get_contents($scriptUrl, false, $context);

    return $result !== false;
}

?>
