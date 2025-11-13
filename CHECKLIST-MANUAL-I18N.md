# ✅ Checklist Manual - Verificación i18n

**IMPORTANTE:** Debes probar el sitio manualmente en el navegador para confirmar que todo funciona correctamente.

---

## 🌐 URL de Prueba
```
http://localhost:3002
```

**Nota:** El servidor dev está corriendo en el puerto 3002 (puertos 3000 y 3001 estaban ocupados)

---

## ✅ Checklist de Verificación

### 1. SELECTOR DE IDIOMA
- [ ] El selector de idioma aparece en el Header (arriba a la derecha)
- [ ] Muestra las banderas 🇪🇸 (Español) y 🇺🇸 (English)
- [ ] Al hacer hover, hay feedback visual
- [ ] Al hacer click, cambia el idioma inmediatamente

### 2. NAVEGACIÓN (Header)
**En Español:**
- [ ] "Inicio" visible
- [ ] "Servicios" visible
- [ ] "Portfolio" visible
- [ ] "Nosotros" visible
- [ ] "Blog" visible
- [ ] "Contacto" visible

**Cambiar a Inglés y verificar:**
- [ ] "Home" visible
- [ ] "Services" visible
- [ ] "Portfolio" visible
- [ ] "About" visible
- [ ] "Blog" visible
- [ ] "Contact" visible

### 3. SECCIÓN HERO
**En Español:**
- [ ] Titular: "Transformamos ideas en productos digitales que escalan"
- [ ] Subtítulo presente y legible
- [ ] Botón: "Comenzar proyecto"
- [ ] Botón secundario: "Ver portfolio"

**En Inglés:**
- [ ] Titular: "We transform ideas into scalable digital products"
- [ ] Subtítulo traducido
- [ ] Botón: "Start project"
- [ ] Botón secundario: "View portfolio"

### 4. SECCIÓN SERVICIOS
**En Español:**
- [ ] Título: "Servicios Soluciones Tecnológicas Integrales"
- [ ] 6 tarjetas de servicios visibles
- [ ] Cada tarjeta tiene:
  - [ ] Título en español
  - [ ] Descripción en español
  - [ ] Lista de features (4 items por servicio)
  - [ ] Link "Conocer más"

**En Inglés:**
- [ ] Título: "Services Comprehensive Technology Solutions"
- [ ] 6 tarjetas con contenido traducido
- [ ] Features traducidas (ej: "Machine Learning", "NLP & Computer Vision")
- [ ] Link "Learn more"

**CRÍTICO - Verificar que NO aparezca el error:**
```
TypeError: service.features.map is not a function
```

### 5. SECCIÓN ESTADÍSTICAS
**En Español:**
- [ ] Badge: "Nuestro Impacto"
- [ ] Título: "Resultados que Hablan por Sí Solos"
- [ ] 4 tarjetas con:
  - [ ] "Proyectos Completados"
  - [ ] "Clientes Satisfechos"
  - [ ] "Años de Experiencia"
  - [ ] "Satisfacción del Cliente"
- [ ] Descripciones debajo de cada número

**En Inglés:**
- [ ] Badge: "Our Impact"
- [ ] Título: "Results that Speak for Themselves"
- [ ] Traducciones:
  - [ ] "Projects Completed"
  - [ ] "Satisfied Clients"
  - [ ] "Years of Experience"
  - [ ] "Client Satisfaction"

### 6. SECCIÓN SOBRE NOSOTROS
**En Español:**
- [ ] Título presente
- [ ] Descripción de la empresa
- [ ] Valores/Principios traducidos

**En Inglés:**
- [ ] Título traducido
- [ ] Descripción traducida
- [ ] Valores traducidos

### 7. SECCIÓN PORTFOLIO
**UI en Español:**
- [ ] Badge: "Nuestro Trabajo"
- [ ] Título: "Portfolio de Proyectos"
- [ ] Filtros de categorías:
  - [ ] "Todos"
  - [ ] "Web"
  - [ ] "Mobile"
  - [ ] "IA"
  - [ ] "Diseño"
  - [ ] "Cloud"
- [ ] Botón "Ver Detalles" en tarjetas

**UI en Inglés:**
- [ ] Badge: "Our Work"
- [ ] Título: "Project Portfolio"
- [ ] Filtros traducidos:
  - [ ] "All"
  - [ ] "Web"
  - [ ] "Mobile"
  - [ ] "AI"
  - [ ] "Design"
  - [ ] "Cloud"
- [ ] Botón "View Details"

**⚠️ CONTENIDO DE PROYECTOS:**
- [ ] Los títulos internos de proyectos siguen en español (esto es esperado)
- [ ] Las descripciones de proyectos siguen en español (esto es esperado)
- [ ] **Nota:** Esto NO es un error, está documentado como pendiente

### 8. SECCIÓN BLOG
**UI en Español:**
- [ ] Badge: "Nuestro Blog"
- [ ] Título: "Últimas Publicaciones"
- [ ] Botón "Leer más" en cada artículo
- [ ] Texto "min de lectura"

**UI en Inglés:**
- [ ] Badge: "Our Blog"
- [ ] Título: "Latest Posts"
- [ ] Botón "Read more"
- [ ] Texto traducido para tiempo de lectura

**⚠️ CONTENIDO DE POSTS:**
- [ ] Los títulos de artículos siguen en español (esperado)
- [ ] Los excerpts siguen en español (esperado)

### 9. FORMULARIO DE CONTACTO
**En Español:**
- [ ] Título: "Contacto"
- [ ] Label "Nombre Completo"
- [ ] Label "Email"
- [ ] Nota: "(Nunca spam, prometido 🤝)"
- [ ] Label "Servicio de Interés"
- [ ] Opciones del select:
  - [ ] "Desarrollo Web"
  - [ ] "Inteligencia Artificial"
  - [ ] "Diseño UX/UI"
  - [ ] "Cloud & DevOps"
  - [ ] "Ciberseguridad"
  - [ ] "Consultoría Tech"
- [ ] Label "Mensaje"
- [ ] Hint: "Mínimo 10 caracteres, máximo 500 caracteres"
- [ ] Botón "Enviar Mensaje"
- [ ] Nota de privacidad al final

**En Inglés:**
- [ ] Título: "Contact"
- [ ] Label "Full Name"
- [ ] Label "Email"
- [ ] Servicios traducidos:
  - [ ] "Web Development"
  - [ ] "Artificial Intelligence"
  - [ ] "UX/UI Design"
  - [ ] "Cloud & DevOps"
  - [ ] "Cybersecurity"
  - [ ] "Tech Consulting"
- [ ] Label "Message"
- [ ] Botón "Send Message"
- [ ] Todos los textos traducidos

**Probar validaciones:**
- [ ] Enviar formulario vacío → Mensajes de error en el idioma seleccionado
- [ ] Email inválido → Error en el idioma correcto
- [ ] Mensaje muy corto → Error en el idioma correcto

### 10. FOOTER
**En Español:**
- [ ] Links de navegación en español
- [ ] Texto "Todos los derechos reservados"
- [ ] Links a redes sociales visibles

**En Inglés:**
- [ ] Links traducidos
- [ ] Texto de copyright traducido

### 11. MENÚ MÓVIL
**Abrir en vista móvil (< 768px o usar DevTools):**

**En Español:**
- [ ] Hamburger menu funciona
- [ ] Links del menú en español
- [ ] Botón "Comenzar Proyecto →"

**En Inglés:**
- [ ] Links traducidos
- [ ] Botón "Start project →"

---

## 🐛 ERRORES A VERIFICAR QUE NO APAREZCAN

### En la Consola del Navegador (F12 → Console)
- [ ] ❌ NO debe aparecer: `TypeError: service.features.map is not a function`
- [ ] ❌ NO debe aparecer: `Warning: Missing translation key`
- [ ] ❌ NO debe aparecer: Errores de i18next
- [ ] ✅ Puede aparecer: Advertencias de desarrollo de React (normal)

### En la Interfaz
- [ ] ❌ NO debe haber texto mezclado (español + inglés al mismo tiempo)
- [ ] ❌ NO debe haber "undefined" o "null" visible
- [ ] ❌ NO debe haber keys de traducción visibles (ej: "contact.form.name")
- [ ] ❌ NO debe haber saltos de layout al cambiar idioma

---

## 🎨 EXPERIENCIA DE USUARIO

### Transiciones
- [ ] El cambio de idioma es suave (sin parpadeo brusco)
- [ ] No hay delay perceptible (< 200ms)
- [ ] El scroll se mantiene en la misma posición

### Persistencia
- [ ] Cambiar a inglés, recargar página → Sigue en inglés
- [ ] Cambiar a español, cerrar y abrir tab → Vuelve a español
- [ ] Verificar localStorage: `pibelabs-language` debe existir

### Responsive
- [ ] Desktop (> 1024px): Selector de idioma visible en header
- [ ] Tablet (768-1024px): Todo funciona correctamente
- [ ] Mobile (< 768px): Selector en header o menú móvil

---

## 📊 MÉTRICAS A REVISAR

### Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] No hay layout shifts significativos

### Accesibilidad
- [ ] Selector de idioma tiene labels correctos
- [ ] Navegación por teclado funciona
- [ ] Screen readers pueden identificar el idioma actual

---

## ✅ CRITERIOS DE APROBACIÓN

### BLOQUEANTES (MUST FIX)
- [ ] ❌ Si hay error `service.features.map` → **NO DEPLOY**
- [ ] ❌ Si hay texto mezclado (ES+EN) en misma vista → **NO DEPLOY**
- [ ] ❌ Si el selector de idioma no funciona → **NO DEPLOY**
- [ ] ❌ Si el formulario no traduce → **NO DEPLOY**

### MENORES (NICE TO FIX)
- [ ] ⚠️ Proyectos de Portfolio en español → OK, documentado como pendiente
- [ ] ⚠️ Posts de Blog en español → OK, documentado como pendiente
- [ ] ⚠️ Alguna animación ligeramente diferente → OK, no crítico

---

## 🚀 SIGUIENTE PASO

### Si TODOS los checks críticos pasan:
```bash
# 1. Detener servidor dev
Ctrl + C

# 2. Hacer build de producción
npm run build

# 3. Verificar que build salió OK
ls -lh dist/

# 4. Deploy
# (tu proceso habitual de deploy a Hostinger u otro)
```

### Si algún check FALLA:
1. Tomar screenshot del problema
2. Revisar la consola del navegador
3. Reportar el error específico
4. Revisar documentación en:
   - `ERRORES-I18N-CORREGIDOS.md`
   - `RESUMEN-FINAL-I18N.md`

---

## 📸 Screenshots Recomendados

Tomar screenshots de:
1. Header con selector de idioma en ambos idiomas
2. Sección Servicios mostrando features traducidas
3. Formulario de contacto con select de servicios traducido
4. Consola del navegador sin errores
5. DevTools → Application → Local Storage mostrando `pibelabs-language`

---

## 🎯 ESTADO ESPERADO

**✅ TODO DEBE FUNCIONAR EXCEPTO:**
- Portfolio data (títulos de proyectos en español)
- Blog data (títulos de posts en español)

**Estos NO son errores**, están documentados como mejoras futuras.

---

## 📞 NOTAS FINALES

- **Servidor dev:** http://localhost:3002
- **Build status:** ✅ Compilado sin errores
- **Lint status:** ✅ 0 warnings
- **TypeScript:** ✅ 0 errores
- **Runtime errors:** ✅ 0 conocidos

**El código está listo. Solo falta tu verificación manual.**

---

**Última actualización:** 2025-11-12 20:22 ART  
**Tests automatizados:** Pendiente (no requerido para MVP)  
**Probar ahora:** `npm run dev` y abrir http://localhost:3002

---

_Documento generado por Claude Code_
