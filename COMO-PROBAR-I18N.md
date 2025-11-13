# 🧪 Cómo Probar la Implementación i18n

**Guía rápida para testing manual de internacionalización**

---

## 🚀 Iniciar el Servidor

```bash
# Opción 1: Matar todo y empezar limpio
lsof -ti:3000,3001,3002 | xargs kill -9 2>/dev/null
npm run dev

# Opción 2: Si ya está corriendo
# Solo abre http://localhost:3000 en tu navegador
```

**Resultado esperado:**
```
VITE v5.x.x  ready in X ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## ✅ Testing Básico (5 minutos)

### 1. Cambio de Idioma

1. Abre http://localhost:3000
2. Busca el selector de idioma en el Header (probablemente arriba a la derecha)
3. **Prueba:**
   - Click en "EN" → Toda la página debe cambiar a inglés
   - Click en "ES" → Toda la página debe volver a español
4. **✅ Pasa si:** No hay errores en consola y todo el texto cambia

---

### 2. Verificar Secciones Principales

Con el idioma en **INGLÉS**, verifica que estos textos aparezcan traducidos:

#### Header
- [ ] "Home" (no "Inicio")
- [ ] "Services" (no "Servicios")
- [ ] "Portfolio" (no "Portfolio" - este es igual)
- [ ] "About" (no "Nosotros")
- [ ] "Blog" (igual en ambos)
- [ ] "Contact" (no "Contacto")

#### Hero Section
- [ ] "We transform ideas into scalable digital products"
- [ ] "Start project" button

#### Services
- [ ] "Web Development" (no "Desarrollo Web")
- [ ] "Artificial Intelligence" (no "Inteligencia Artificial")
- [ ] "UX/UI Design" (no "Diseño UX/UI")
- [ ] Features deben estar en inglés:
  - "React, Next.js, Vue"
  - "TypeScript & Node.js"
  - etc.

#### Portfolio
- [ ] "Tercer Tiempo FC - Official Website" (no "Sitio Web Oficial")
- [ ] "ClubPulse - Multi-Tenant Sports Management" (no "Gestión Deportiva")
- [ ] Click en un proyecto → Modal debe mostrar features en inglés:
  - "Conversion funnel optimized..."
  - "Dynamic content management..."
  - etc.

#### Blog
- [ ] "The Future of AI in Web Development" (no "El Futuro de la IA")
- [ ] "10 Tips to Optimize React Performance" (no "10 Tips para Optimizar")
- [ ] Categorías en inglés: "Artificial Intelligence", "Web Development"

#### Contact Form
- [ ] "Full name" (no "Nombre completo")
- [ ] "Email"
- [ ] "Message" (no "Mensaje")
- [ ] "Send message" button (no "Enviar mensaje")

#### Footer
- [ ] Todos los links en inglés

---

## 🔍 Testing Detallado (15 minutos)

### 1. Persistencia de Idioma

1. Selecciona inglés
2. Recarga la página (F5)
3. **✅ Pasa si:** La página sigue en inglés

### 2. No hay "leaks" de español

Con el idioma en **INGLÉS**, busca en toda la página:

❌ **NO debe aparecer:**
- "Desarrollo"
- "Servicios"
- "Nosotros"
- "Contáctanos"
- "Ver más"
- "Leer más"
- "Proyecto"
- "Características"

✅ **DEBE aparecer:**
- "Development"
- "Services"
- "About"
- "Contact"
- "View more" / "Learn more"
- "Read more"
- "Project"
- "Features"

### 3. Testing de Features Arrays

1. Ve a la sección **Services**
2. Abre la consola de desarrollador (F12)
3. **✅ Pasa si:** No hay errores como "features.map is not a function"

4. Ve a **Portfolio** → Click en un proyecto
5. En el modal, verifica que aparezcan:
   - Features en inglés (10 items)
   - Achievements en inglés (6 items)
6. **✅ Pasa si:** Todos los arrays se renderizan correctamente

### 4. Testing de Formulario

1. Ve a la sección **Contact**
2. Cambia a inglés
3. Intenta enviar el form vacío
4. **✅ Pasa si:** Los errores aparecen en inglés:
   - "Name must be at least 2 characters"
   - "Invalid email address"
   - etc.

5. Cambia a español
6. **✅ Pasa si:** Los errores aparecen en español:
   - "El nombre debe tener al menos 2 caracteres"
   - "Email inválido"
   - etc.

---

## 🐛 Troubleshooting

### Error: "service.features.map is not a function"

**Causa:** Bug en ServicesGrid - Ya está resuelto

**Solución:** Verificar que tengas la última versión del código

---

### Error: Aparecen claves en lugar de texto (ej: "services.title")

**Causa:** Falta cargar el namespace o la clave no existe

**Solución:** 
1. Verificar que el namespace esté en `src/lib/i18n/config.ts`
2. Verificar que la clave exista en el JSON correspondiente

---

### Error: Mezcla de idiomas (inglés y español juntos)

**Causa:** Algunos componentes no usan traducciones

**Solución:** Revisar el componente y agregar `t('key')`

---

### Puerto 3000 ocupado

```bash
# Matar procesos en el puerto
lsof -ti:3000 | xargs kill -9

# Reiniciar servidor
npm run dev
```

---

## 📊 Checklist Final

Antes de dar por aprobado:

### Funcionalidad Básica
- [ ] Selector de idioma funciona
- [ ] Cambia entre ES/EN sin errores
- [ ] No hay errores en consola
- [ ] Idioma persiste al recargar

### Contenido Traducido
- [ ] Header/Footer traducidos
- [ ] Hero traducido
- [ ] Services traducidos (incluyendo features)
- [ ] Portfolio traducido (títulos, descripciones, features, achievements)
- [ ] Blog traducido (títulos, excerpts, categorías)
- [ ] Contact form traducido (labels, placeholders, errores)

### Sin "Leaks" de Español
- [ ] En inglés, no aparece ningún texto en español
- [ ] No aparecen claves de traducción visibles
- [ ] Arrays (features, achievements) funcionan correctamente

### Performance
- [ ] La página carga rápido
- [ ] El cambio de idioma es instantáneo
- [ ] No hay lag o parpadeos

---

## ✅ Criterio de Aceptación

**La implementación está lista para producción si:**

1. ✅ Todos los ítems del checklist están marcados
2. ✅ No hay errores en la consola del navegador
3. ✅ El cambio de idioma funciona en todas las secciones
4. ✅ No hay mezcla de idiomas
5. ✅ TypeScript compila sin errores: `npm run type-check`

---

## 🚀 Deploy a Producción

Una vez que todo esté verificado:

```bash
# 1. Verificar tipos
npm run type-check

# 2. Build de producción
npm run build

# 3. Preview del build
npm run preview

# 4. Si todo OK, commit y push
git add .
git commit -m "Fix: Complete i18n implementation with portfolio and blog translations"
git push origin main

# 5. El deploy a Hostinger es automático vía GitHub Actions
```

---

## 📞 Si algo no funciona

1. **Revisar documentos:**
   - `IMPLEMENTACION-I18N-COMPLETADA.md` - Resumen de cambios
   - `ANALISIS-I18N-COMPLETO.md` - Análisis técnico completo

2. **Verificar archivos clave:**
   - `src/lib/i18n/config.ts` - Configuración i18n
   - `src/lib/i18n/locales/en/*.json` - Traducciones inglés
   - `src/lib/i18n/locales/es/*.json` - Traducciones español

3. **Comandos útiles:**
```bash
# Ver errores TypeScript
npm run type-check

# Ver errores ESLint
npm run lint

# Limpiar y reinstalar
npm run clean:all
npm install
npm run dev
```

---

**Tiempo estimado de testing:** 20-30 minutos  
**Última actualización:** 13 de Noviembre de 2025
