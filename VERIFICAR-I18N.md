# ✅ Checklist de Verificación i18n

## 🧪 Cómo Verificar que Todo Funciona

### 1. Verificación en Desarrollo (Local)

**Servidor corriendo en:** http://localhost:3001

#### A. Cambio de Idioma Básico
- [ ] Abrir http://localhost:3001
- [ ] Buscar el selector de idioma (esquina superior derecha)
- [ ] Hacer clic en "EN" para cambiar a inglés
- [ ] Verificar que el contenido cambia a inglés
- [ ] Hacer clic en "ES" para volver a español
- [ ] Verificar que el contenido vuelve a español

#### B. Verificar Secciones Principales

**En Español:**
- [ ] Hero: "Transformamos ideas en productos digitales que escalan"
- [ ] Services: "Nuestros Servicios"
- [ ] Portfolio: "Portfolio de Proyectos"
- [ ] About: "Sobre Nosotros"
- [ ] Blog: "Últimas Publicaciones"
- [ ] Contact: "¿Listo para Innovar?"
- [ ] Footer: "Innovación tecnológica que escala"

**En Inglés:**
- [ ] Hero: "We transform ideas into scalable digital products"
- [ ] Services: "Our Services"
- [ ] Portfolio: "Project Portfolio"
- [ ] About: "About Us"
- [ ] Blog: "Latest Posts"
- [ ] Contact: "Ready to Innovate?"
- [ ] Footer: "Technology innovation that scales"

#### C. Verificar Componentes Específicos

**ServicesGrid (Tarjetas de Servicios):**
- [ ] Cambiar a inglés
- [ ] Verificar títulos de servicios en inglés:
  - "Web Development"
  - "Artificial Intelligence"
  - "UX/UI Design"
  - "Cloud & DevOps"
  - "Cybersecurity"
  - "Tech Consulting"
- [ ] Verificar que cada servicio muestra características (features)
- [ ] Verificar que el botón dice "Learn more" en inglés
- [ ] Cambiar a español y verificar "Conocer más"

**PortfolioModal:**
- [ ] Hacer clic en un proyecto del portfolio
- [ ] En español: verificar botón "Ver Proyecto en Vivo"
- [ ] Cambiar a inglés
- [ ] Verificar botón "View Live Project"

**ContactForm:**
- [ ] Abrir formulario de contacto
- [ ] En español: verificar etiquetas "Nombre Completo", "Email", "Mensaje"
- [ ] Intentar enviar sin llenar (para ver error)
- [ ] En español: verificar mensaje "Error al Enviar"
- [ ] Cambiar a inglés
- [ ] Verificar etiquetas "Full Name", "Email", "Message"
- [ ] Verificar mensaje de error "Error Sending"

#### D. Verificar Persistencia
- [ ] Cambiar idioma a inglés
- [ ] Recargar la página (F5)
- [ ] Verificar que sigue en inglés
- [ ] Abrir en nueva pestaña
- [ ] Verificar que abre en inglés

#### E. Verificar Console (sin errores)
- [ ] Abrir DevTools (F12)
- [ ] Tab "Console"
- [ ] Cambiar entre idiomas
- [ ] Verificar que NO aparecen errores rojos
- [ ] Solo warnings esperados (si los hay)

### 2. Verificación Técnica

#### A. TypeScript
```bash
npm run type-check
```
**Resultado esperado:** Sin errores

#### B. Build de Producción
```bash
npm run build
```
**Resultado esperado:** Build exitoso, archivos en `dist/`

#### C. Preview de Producción
```bash
npm run preview
```
**Verificar:** http://localhost:4173 funciona igual que dev

### 3. Verificación de Accesibilidad

#### A. Navegación por Teclado
- [ ] Con Tab, navegar por el selector de idioma
- [ ] Presionar Enter para cambiar idioma
- [ ] Verificar que funciona sin mouse

#### B. Screen Reader (macOS VoiceOver)
- [ ] Activar VoiceOver (Cmd + F5)
- [ ] Navegar al selector de idioma
- [ ] Verificar que lee correctamente

### 4. Verificación Cross-Browser

#### Chrome/Edge
- [ ] Funciona selector de idioma
- [ ] Persistencia en localStorage
- [ ] No hay errores en console

#### Firefox
- [ ] Funciona selector de idioma
- [ ] Persistencia en localStorage
- [ ] No hay errores en console

#### Safari
- [ ] Funciona selector de idioma
- [ ] Persistencia en localStorage
- [ ] No hay errores en console

### 5. Verificación Mobile

#### Responsive
- [ ] Abrir DevTools > Toggle Device Toolbar
- [ ] iPhone SE: selector visible y funcional
- [ ] iPad: selector visible y funcional
- [ ] Android: selector visible y funcional

#### Touch
- [ ] En mobile view, hacer clic en selector
- [ ] Cambiar idioma
- [ ] Verificar que funciona con touch

### 6. Verificación SEO

#### Meta Tags
```bash
# Ver source del HTML
curl http://localhost:3001 | grep "lang="
curl http://localhost:3001 | grep "hreflang"
```

**Esperado:**
```html
<html lang="es">
<link rel="alternate" hreflang="es" href="https://pibelabs.com/es" />
<link rel="alternate" hreflang="en" href="https://pibelabs.com/en" />
```

### 7. Tests Automáticos (Opcional)

Si implementaste tests:
```bash
npm run test
```

---

## 🐛 Problemas Comunes y Soluciones

### Problema: No cambia el idioma
**Solución:**
1. Verificar que localStorage está habilitado
2. Limpiar caché del navegador
3. Verificar console para errores

### Problema: Algunos textos siguen en español
**Solución:**
1. Verificar que el texto está usando `t('key')`
2. Verificar que la clave existe en `en.json`
3. Recargar página

### Problema: Error "features.map is not a function"
**Solución:**
- ✅ Ya corregido en esta versión
- Si persiste, verificar versión de archivos

### Problema: TypeScript da errores
**Solución:**
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run type-check
```

---

## ✅ Checklist Final Antes de Deploy

### Desarrollo
- [ ] Todos los checklist anteriores pasados
- [ ] No hay errores en console
- [ ] TypeScript compila sin errores
- [ ] Build de producción exitoso

### Testing
- [ ] Probado en Chrome
- [ ] Probado en Firefox
- [ ] Probado en Safari
- [ ] Probado en mobile

### SEO
- [ ] Meta tags hreflang presentes
- [ ] Lang attribute correcto
- [ ] URLs amigables (si aplica)

### Documentación
- [ ] ANALISIS-MEJORAS-I18N.md revisado
- [ ] SIGUIENTE-PASO-I18N.md leído
- [ ] Decisión tomada sobre próximos pasos

### Git
```bash
git status
git add .
git commit -m "Fix: i18n error service.features.map + hardcoded texts"
git push origin main
```

---

## 📊 Resultados Esperados

### Performance
- Tiempo de cambio de idioma: < 100ms
- Tamaño bundle: ~2MB (dev) / ~500KB (prod gzipped)
- No memory leaks al cambiar idioma múltiples veces

### Funcionalidad
- 17 componentes traducidos
- 2 idiomas completos (ES/EN)
- Persistencia en localStorage
- Fallback a español si idioma no soportado

### Calidad
- ✅ Sin errores TypeScript
- ✅ Sin errores en runtime
- ✅ Todos los textos traducidos
- ✅ Type safety en traducciones

---

## 🎉 Listo para Deploy

Si todos los checklist están ✅, estás listo para:

```bash
# 1. Build final
npm run build

# 2. Verificar preview
npm run preview

# 3. Deploy (según tu método)
# - Git push (si tienes CI/CD)
# - Manual upload a servidor
# - Docker build & deploy
```

---

**Última actualización:** 12 Nov 2025  
**Contacto para soporte:** Revisar documentación o abrir issue
