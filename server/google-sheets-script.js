/**
 * PibeLabs - Google Apps Script para Google Sheets
 *
 * Este script se ejecuta en Google Apps Script y recibe los datos del formulario
 * para guardarlos automáticamente en Google Sheets
 *
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet de leads
 * 2. Ve a Extensiones > Apps Script
 * 3. Copia todo este código
 * 4. Guarda y despliega como Web App
 * 5. Copia la URL del deployment a contact.php
 *
 * @author PibeLabs
 * @version 1.0.0
 */

// ============================================
// CONFIGURACIÓN
// ============================================

// Nombre de la hoja donde se guardarán los leads
const SHEET_NAME = 'Leads';

// Columnas del sheet (cambiar según tu preferencia)
const COLUMNS = [
  'Timestamp',
  'Nombre',
  'Email',
  'Servicio',
  'Mensaje',
  'IP',
  'User Agent',
  'Referrer',
  'Estado'
];

// ============================================
// FUNCIÓN PRINCIPAL - Recibe POST requests
// ============================================

function doPost(e) {
  try {
    // Obtener el spreadsheet activo
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Si la hoja no existe, crearla
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupSheet(sheet);
    }

    // Verificar si tiene headers
    if (sheet.getLastRow() === 0) {
      setupSheet(sheet);
    }

    // Parsear datos recibidos
    const data = parsePostData(e);

    // Validar datos requeridos
    if (!data.name || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'result': 'error',
          'message': 'Faltan datos requeridos'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Preparar fila para insertar
    const newRow = [
      data.timestamp || new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      data.name,
      data.email,
      mapServiceName(data.service),
      data.message,
      data.ip || 'N/A',
      data.userAgent || 'N/A',
      data.referrer || 'Direct',
      'Nuevo' // Estado inicial
    ];

    // Insertar en la primera fila disponible (después del header)
    sheet.insertRowAfter(1);
    sheet.getRange(2, 1, 1, newRow.length).setValues([newRow]);

    // Aplicar formato a la nueva fila
    formatNewRow(sheet, 2);

    // Ordenar por timestamp descendente (más nuevos primero)
    sortByTimestamp(sheet);

    // Enviar notificación por email (opcional)
    sendEmailNotification(data);

    // Retornar respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Lead guardado correctamente',
        'row': sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log del error
    Logger.log('Error en doPost: ' + error.toString());

    // Retornar error
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// FUNCIÓN GET - Para probar el endpoint
// ============================================

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'PibeLabs Google Sheets Integration is working!',
      'timestamp': new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Configura la hoja con headers y formato inicial
 */
function setupSheet(sheet) {
  // Insertar headers
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]);

  // Formato del header
  const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setBackground('#00D9FF');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');

  // Ajustar anchos de columna
  sheet.setColumnWidth(1, 150);  // Timestamp
  sheet.setColumnWidth(2, 150);  // Nombre
  sheet.setColumnWidth(3, 200);  // Email
  sheet.setColumnWidth(4, 120);  // Servicio
  sheet.setColumnWidth(5, 300);  // Mensaje
  sheet.setColumnWidth(6, 120);  // IP
  sheet.setColumnWidth(7, 200);  // User Agent
  sheet.setColumnWidth(8, 150);  // Referrer
  sheet.setColumnWidth(9, 100);  // Estado

  // Congelar primera fila
  sheet.setFrozenRows(1);
}

/**
 * Parsea los datos del POST request
 */
function parsePostData(e) {
  if (e.postData && e.postData.type === 'application/x-www-form-urlencoded') {
    return e.parameter;
  }

  // Si viene como JSON
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return e.parameter;
    }
  }

  return e.parameter;
}

/**
 * Mapea el ID del servicio a un nombre legible
 */
function mapServiceName(serviceId) {
  const serviceMap = {
    'web': '🌐 Desarrollo Web',
    'ia': '🤖 Inteligencia Artificial',
    'design': '🎨 Diseño UX/UI',
    'cloud': '☁️ Soluciones Cloud'
  };

  return serviceMap[serviceId] || serviceId;
}

/**
 * Aplica formato a una nueva fila
 */
function formatNewRow(sheet, rowNumber) {
  const row = sheet.getRange(rowNumber, 1, 1, COLUMNS.length);

  // Fondo alternado
  if (rowNumber % 2 === 0) {
    row.setBackground('#F9F9F9');
  }

  // Borde
  row.setBorder(true, true, true, true, false, false, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);

  // Alineación
  sheet.getRange(rowNumber, 1).setHorizontalAlignment('left');   // Timestamp
  sheet.getRange(rowNumber, 2).setHorizontalAlignment('left');   // Nombre
  sheet.getRange(rowNumber, 3).setHorizontalAlignment('left');   // Email
  sheet.getRange(rowNumber, 4).setHorizontalAlignment('center'); // Servicio
  sheet.getRange(rowNumber, 5).setHorizontalAlignment('left');   // Mensaje
  sheet.getRange(rowNumber, 9).setHorizontalAlignment('center'); // Estado

  // Formato del email como link
  const emailCell = sheet.getRange(rowNumber, 3);
  const email = emailCell.getValue();
  if (email) {
    emailCell.setFormula(`=HYPERLINK("mailto:${email}","${email}")`);
  }

  // Color del estado
  const estadoCell = sheet.getRange(rowNumber, 9);
  estadoCell.setBackground('#FFF9C4'); // Amarillo claro para "Nuevo"
  estadoCell.setFontWeight('bold');
}

/**
 * Ordena la hoja por timestamp (más recientes primero)
 */
function sortByTimestamp(sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow > 2) { // Solo si hay más de una fila de datos
    const range = sheet.getRange(2, 1, lastRow - 1, COLUMNS.length);
    range.sort({column: 1, ascending: false}); // Columna 1 (Timestamp) descendente
  }
}

/**
 * Envía notificación por email (opcional)
 */
function sendEmailNotification(data) {
  // Descomenta y configura si quieres recibir emails por cada lead

  /*
  const recipient = 'contact@pibelabs.com';
  const subject = '🚀 Nuevo Lead: ' + data.service + ' - ' + data.name;

  const body = `
Nuevo lead recibido en PibeLabs:

👤 Nombre: ${data.name}
📧 Email: ${data.email}
🎯 Servicio: ${mapServiceName(data.service)}
💬 Mensaje: ${data.message}

⏰ Fecha: ${data.timestamp}
🌐 IP: ${data.ip}

---
Responder directamente: ${data.email}
Ver en Google Sheets: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;

  MailApp.sendEmail(recipient, subject, body);
  */
}

// ============================================
// FUNCIONES ADMINISTRATIVAS
// ============================================

/**
 * Actualiza el estado de un lead (llamar manualmente)
 */
function updateLeadStatus(rowNumber, newStatus) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  sheet.getRange(rowNumber, 9).setValue(newStatus);

  // Cambiar color según estado
  const statusCell = sheet.getRange(rowNumber, 9);
  switch(newStatus) {
    case 'Contactado':
      statusCell.setBackground('#C8E6C9'); // Verde claro
      break;
    case 'Cerrado':
      statusCell.setBackground('#B2DFDB'); // Cyan claro
      break;
    case 'Descartado':
      statusCell.setBackground('#FFCDD2'); // Rojo claro
      break;
    default:
      statusCell.setBackground('#FFF9C4'); // Amarillo claro (Nuevo)
  }
}

/**
 * Agrega un menú personalizado a la hoja
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('PibeLabs Leads')
    .addItem('Marcar como Contactado', 'markAsContacted')
    .addItem('Marcar como Cerrado', 'markAsClosed')
    .addItem('Marcar como Descartado', 'markAsDiscarded')
    .addSeparator()
    .addItem('Configurar Hoja', 'setupCurrentSheet')
    .addItem('Exportar a CSV', 'exportToCSV')
    .addToUi();
}

/**
 * Marca el lead seleccionado como contactado
 */
function markAsContacted() {
  updateSelectedLeadStatus('Contactado');
}

/**
 * Marca el lead seleccionado como cerrado
 */
function markAsClosed() {
  updateSelectedLeadStatus('Cerrado');
}

/**
 * Marca el lead seleccionado como descartado
 */
function markAsDiscarded() {
  updateSelectedLeadStatus('Descartado');
}

/**
 * Actualiza el estado del lead seleccionado
 */
function updateSelectedLeadStatus(newStatus) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRange = sheet.getActiveRange();
  const row = activeRange.getRow();

  if (row > 1) { // No modificar el header
    updateLeadStatus(row, newStatus);
    SpreadsheetApp.getUi().alert('Estado actualizado a: ' + newStatus);
  } else {
    SpreadsheetApp.getUi().alert('Por favor selecciona un lead (no el header)');
  }
}

/**
 * Configura la hoja actual
 */
function setupCurrentSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  setupSheet(sheet);
  SpreadsheetApp.getUi().alert('Hoja configurada correctamente');
}

/**
 * Exporta leads a CSV
 */
function exportToCSV() {
  SpreadsheetApp.getUi().alert('Usa: Archivo > Descargar > Valores separados por comas (.csv)');
}

// ============================================
// TRIGGERS (Configurar manualmente)
// ============================================

/**
 * Envía un resumen diario de leads nuevos
 * Configurar trigger: doSendDailySummary a las 9:00 AM
 */
function doSendDailySummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) return; // No hay datos

  // Contar leads de hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let newLeadsToday = 0;
  let leadsThisWeek = 0;

  for (let i = 2; i <= lastRow; i++) {
    const timestamp = new Date(sheet.getRange(i, 1).getValue());

    if (timestamp >= today) {
      newLeadsToday++;
    }

    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (timestamp >= weekAgo) {
      leadsThisWeek++;
    }
  }

  // Enviar resumen
  const recipient = 'contact@pibelabs.com';
  const subject = '📊 Resumen Diario de Leads - PibeLabs';
  const body = `
Resumen de Leads - ${today.toLocaleDateString('es-AR')}

📈 Estadísticas:
- Leads hoy: ${newLeadsToday}
- Leads esta semana: ${leadsThisWeek}
- Total de leads: ${lastRow - 1}

Ver todos los leads: ${ss.getUrl()}

---
PibeLabs - Fundado por Lucas Benavidez y Juan Cruz Ferri
  `;

  MailApp.sendEmail(recipient, subject, body);
}
