# 📚 Documentación de PibeLabs Frontend

Bienvenido a la documentación completa del proyecto PibeLabs Frontend.

## 🚀 Inicio Rápido

Si quieres configurar todo en 25 minutos, empieza aquí:

### [⚡ Quick Start: Google Sheets + Analytics (25 min)](./QUICK_START_SHEETS_ANALYTICS.md)

**Perfecto para:** Configurar rápidamente el formulario de contacto con Google Sheets y Analytics.

**Incluye:**
- ✅ Configuración paso a paso de Google Sheets (15 min)
- ✅ Configuración paso a paso de Google Analytics 4 (10 min)
- ✅ Verificación y testing
- ✅ Troubleshooting básico

---

## 📖 Documentación Completa

### 1. [🌐 Configuración del Formulario de Contacto en Hostinger](./HOSTINGER_CONTACT_FORM.md)

**Perfecto para:** Entender todas las opciones disponibles para el backend del formulario.

**Incluye:**
- 4 opciones de implementación (PHP, PHPMailer, Servicios de terceros, Node.js)
- Configuración de seguridad completa
- Rate limiting y protección anti-spam
- Integración con base de datos MySQL
- Guías de troubleshooting detalladas

**Tamaño:** ~350 líneas

---

### 2. [📊 Google Sheets y Analytics - Guía Completa](./GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md)

**Perfecto para:** Información detallada sobre la integración de Google Sheets y Analytics.

**Incluye:**
- Explicación completa de Google Sheets
  - Configuración avanzada
  - Menú personalizado
  - Resumen diario por email
  - Triggers automáticos
- Google Analytics 4 completo
  - Todos los eventos disponibles
  - Configuración de conversiones
  - Dashboards recomendados
  - Eventos personalizados
- Troubleshooting exhaustivo
- Ejemplos de código

**Tamaño:** ~1,000 líneas

---

### 3. [✅ Auditoría WCAG de Contraste de Colores](./WCAG_CONTRAST_AUDIT.md)

**Perfecto para:** Verificar y mejorar la accesibilidad del sitio.

**Incluye:**
- Auditoría completa de ratios de contraste
- Cumplimiento WCAG 2.1 AA y AAA
- Recomendaciones de mejora
- Herramientas de testing
- Checklist de accesibilidad

**Tamaño:** ~350 líneas

---

### 4. [🚀 Configuración de Deployment en Hostinger](./DEPLOY_SETUP.md)

**Perfecto para:** Configurar el deployment automático via GitHub Actions.

**Incluye:**
- Configuración de FTP en Hostinger
- Setup de GitHub Actions
- Variables secretas
- Troubleshooting de deployment
- Workflow personalizado

**Tamaño:** ~200 líneas

---

## 📂 Estructura de la Documentación

```
docs/
├── README.md                                    ← Estás aquí
├── QUICK_START_SHEETS_ANALYTICS.md             ← Guía rápida (25 min)
├── GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md         ← Guía completa
├── HOSTINGER_CONTACT_FORM.md                    ← Backend del formulario
├── WCAG_CONTRAST_AUDIT.md                       ← Accesibilidad
└── DEPLOY_SETUP.md                              ← Deployment
```

---

## 🎯 Guías por Caso de Uso

### Quiero configurar el formulario de contacto

1. **Opción Rápida (Recomendada):**
   - Lee: [Quick Start](./QUICK_START_SHEETS_ANALYTICS.md)
   - Tiempo: 25 minutos
   - Resultado: Formulario + Google Sheets + Analytics funcionando

2. **Opción Completa:**
   - Lee: [Hostinger Contact Form](./HOSTINGER_CONTACT_FORM.md)
   - Tiempo: 1-2 horas
   - Resultado: Múltiples opciones, seguridad avanzada, base de datos

### Quiero trackear conversiones y leads

1. **Opción Rápida:**
   - Lee: [Quick Start - Parte 2](./QUICK_START_SHEETS_ANALYTICS.md#-parte-2-google-analytics-4-10-minutos)
   - Tiempo: 10 minutos
   - Resultado: Google Analytics 4 trackeando conversiones

2. **Opción Completa:**
   - Lee: [Google Sheets and Analytics Setup](./GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md)
   - Tiempo: 30-60 minutos
   - Resultado: Sistema completo con dashboards y eventos personalizados

### Quiero guardar leads en Google Sheets

1. **Opción Rápida:**
   - Lee: [Quick Start - Parte 1](./QUICK_START_SHEETS_ANALYTICS.md#-parte-1-google-sheets-15-minutos)
   - Tiempo: 15 minutos
   - Resultado: Leads guardándose automáticamente

2. **Opción Completa:**
   - Lee: [Google Sheets Setup](./GOOGLE_SHEETS_AND_ANALYTICS_SETUP.md#-parte-1-google-sheets---exportar-leads-automáticamente)
   - Tiempo: 30 minutos
   - Resultado: Sistema avanzado con menú personalizado y emails

### Quiero mejorar la accesibilidad

- Lee: [WCAG Contrast Audit](./WCAG_CONTRAST_AUDIT.md)
- Tiempo: 30 minutos de lectura
- Resultado: Sitio 100% WCAG AA compliant

### Quiero configurar deployment automático

- Lee: [Deploy Setup](./DEPLOY_SETUP.md)
- Tiempo: 20 minutos
- Resultado: GitHub Actions desplegando automáticamente a Hostinger

---

## 🔗 Enlaces Útiles

### Servicios Externos

- [Google Sheets](https://sheets.google.com)
- [Google Analytics](https://analytics.google.com)
- [Google Apps Script](https://script.google.com)
- [Hostinger hPanel](https://hpanel.hostinger.com)
- [GitHub Actions](https://github.com/features/actions)

### Herramientas de Testing

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Google Analytics DebugView](https://support.google.com/analytics/answer/7201382)
- [Postman](https://www.postman.com/) - Testing de APIs
- [curl](https://curl.se/) - Testing de APIs desde terminal

---

## 📞 Soporte

### Si tienes problemas:

1. **Busca en la documentación:** La mayoría de problemas están resueltos aquí
2. **Revisa Troubleshooting:** Cada guía tiene una sección de problemas comunes
3. **Verifica los logs:**
   - DevTools Console (F12)
   - Apps Script Executions
   - Google Analytics DebugView
4. **Contacta al equipo:** contact@pibelabs.com

---

## 🤝 Contribuir

Si encuentras errores en la documentación o quieres agregar información:

1. Crea una issue en GitHub
2. O envía un pull request con los cambios
3. O contacta al equipo directamente

---

## 📊 Estadísticas de Documentación

| Documento | Líneas | Tiempo Lectura | Nivel |
|-----------|--------|----------------|-------|
| Quick Start | ~400 | 15 min | Principiante |
| Google Sheets & Analytics | ~1000 | 45 min | Intermedio |
| Hostinger Contact Form | ~350 | 30 min | Intermedio |
| WCAG Audit | ~350 | 25 min | Intermedio |
| Deploy Setup | ~200 | 15 min | Intermedio |
| **Total** | **~2,300** | **~2h 10min** | - |

---

## ✅ Checklist de Configuración Completa

Usa este checklist para asegurarte de que todo esté configurado:

### Backend
- [ ] PHP instalado y funcionando en Hostinger
- [ ] Email `contact@pibelabs.com` creado
- [ ] Archivo `contact.php` subido a `public_html/api/`
- [ ] Archivo `.htaccess` configurado
- [ ] Permisos correctos (644 para archivos PHP)

### Google Sheets
- [ ] Google Sheet creado
- [ ] Apps Script configurado
- [ ] Web App desplegada y autorizada
- [ ] URL de implementación configurada en PHP
- [ ] Test realizado - datos aparecen en Sheet

### Google Analytics
- [ ] Cuenta GA4 creada
- [ ] Propiedad configurada
- [ ] Measurement ID obtenido
- [ ] Variable de entorno `.env` configurada
- [ ] Servidor reiniciado
- [ ] Eventos aparecen en tiempo real

### Frontend
- [ ] Formulario funciona localmente
- [ ] Validaciones funcionan correctamente
- [ ] Rate limiting funciona
- [ ] Email typo suggestions funcionan
- [ ] Animaciones funcionan

### Producción
- [ ] Sitio desplegado en Hostinger
- [ ] Variables de entorno configuradas en Hostinger
- [ ] HTTPS funcionando
- [ ] Formulario funciona en producción
- [ ] Leads llegan por email
- [ ] Leads se guardan en Google Sheets
- [ ] Eventos se registran en Google Analytics

### Opcional
- [ ] GitHub Actions configurado para auto-deploy
- [ ] Resumen diario de leads por email
- [ ] Conversión configurada en GA4
- [ ] Dashboard personalizado en Google Sheets
- [ ] Métricas de Web Vitals funcionando

---

## 🎓 Recursos de Aprendizaje

Si quieres aprender más sobre las tecnologías usadas:

### React y TypeScript
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hook Form](https://react-hook-form.com/)

### Google Services
- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Google Apps Script Guides](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)

### Accesibilidad
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project](https://www.a11yproject.com/)

### Hosting y Deployment
- [Hostinger Tutorials](https://www.hostinger.com/tutorials)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🏆 Best Practices

### Seguridad
- ✅ Siempre validar datos en el backend
- ✅ Usar HTTPS en producción
- ✅ Implementar rate limiting
- ✅ Sanitizar inputs para prevenir XSS
- ✅ No exponer credenciales en el código

### Performance
- ✅ Lazy loading de componentes
- ✅ Code splitting automático con Vite
- ✅ Optimización de imágenes
- ✅ Throttling en scroll events
- ✅ Caché de assets

### Accesibilidad
- ✅ Ratio de contraste WCAG AA (mínimo 4.5:1)
- ✅ Labels en todos los inputs
- ✅ ARIA attributes donde sea necesario
- ✅ Navegación por teclado
- ✅ Soporte para screen readers

### Analytics
- ✅ Trackear eventos importantes
- ✅ Configurar conversiones
- ✅ Respetar privacidad del usuario
- ✅ Usar eventos estándar de Google
- ✅ Documentar eventos custom

---

## 📈 Próximos Pasos

Después de configurar todo:

1. **Monitorear métricas:**
   - Revisa Google Analytics diariamente
   - Analiza tasa de conversión
   - Identifica fuentes de tráfico

2. **Optimizar conversión:**
   - A/B testing del formulario
   - Mejorar copy
   - Reducir campos si es posible

3. **Escalar:**
   - Integrar con CRM
   - Automatizar respuestas
   - Configurar nurturing campaigns

4. **Mantener:**
   - Actualizar dependencias
   - Revisar logs regularmente
   - Backup de Google Sheets

---

## 🎉 ¡Éxito!

Con esta documentación tienes todo lo necesario para:

- ✅ Configurar el formulario de contacto
- ✅ Capturar y gestionar leads
- ✅ Trackear conversiones
- ✅ Analizar métricas
- ✅ Desplegar automáticamente
- ✅ Mantener accesibilidad

**¡Tu sitio está listo para generar leads!** 🚀

---

**PibeLabs - Next-Gen Innovation Studio**
📍 Despeñaderos, Córdoba, Argentina
👥 Fundado por Lucas Benavidez y Juan Cruz Ferri
📞 +54 9 351 3088400
📧 contact@pibelabs.com
🌐 pibelabs.com
