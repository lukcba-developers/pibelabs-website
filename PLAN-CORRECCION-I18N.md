# Plan de Corrección i18n - Errores Detectados

## Problemas Encontrados

### 1. Tests Failing (vitest)
- Error: `Cannot read properties of undefined (reading 'get')`
- Causa: Configuración de entorno de pruebas sin DOM adecuado
- Solución: Configurar vitest con happy-dom

### 2. Transiciones Bruscas al Cambiar Idioma
- Causa: No hay loading state durante el cambio de idioma
- Solución: Ya implementado LanguageLoadingOverlay, pero necesita mejoras visuales

### 3. Tags Visibles en Lugar de Traducciones
Los siguientes keys están mostrando tags en lugar del contenido:

#### Stats (Hero Component)
- `stats.projects` → debería ser "Proyectos exitosos"
- `stats.retention` → debería ser "Retención clientes" 
- `stats.mvp` → debería ser "MVP a producción"

#### Services (ServicesGrid Component)  
- `services.web.title` → "Desarrollo Web"
- `services.web.description` → "Aplicaciones web modernas..."
- `services.ia.title` → "Inteligencia Artificial"
- `services.design.title` → "Diseño UX/UI"
- `services.cloud.title` → "Cloud & DevOps"
- `services.security.title` → "Ciberseguridad"
- `services.consulting.title` → "Consultoría Tech"

#### Common
- `common.changeLanguage` → "Cambiar idioma"
- `common.learnMore` → "Conocer más"

#### Company
- `company.description` → descripción de la empresa

#### Contact
- `contact.title` → "Contacto"

### 4. Blog Posts Keys Faltantes
- `cloud-security.title`
- `cloud-security.excerpt`
- `cloud-security.category`

### 5. Portfolio Projects Keys Faltantes  
- Todos los features y achievements de los proyectos muestran tags

## Análisis de Causa Raíz

El problema es que los componentes están usando los namespaces correctamente:
- Hero usa: `t("stats:projects")` con `useTranslation(["hero", "stats"])`
- ServicesGrid usa: `t(\`services.\${service.id}.title\`)`

Pero los archivos JSON tienen estructura anidada que podría no estar cargándose correctamente.

## Solución

1. **Verificar que los JSON tienen el formato correcto**
2. **Asegurar que los componentes usan el namespace correcto**
3. **Configurar vitest para tests**
4. **Mejorar transición visual**

## Estado de Archivos JSON

### ✅ Archivos Existentes y Completos:
- `/src/lib/i18n/locales/es/stats.json` - ✅ Completo
- `/src/lib/i18n/locales/es/services.json` - ✅ Completo  
- `/src/lib/i18n/locales/es/common.json` - ✅ Completo
- `/src/lib/i18n/locales/es/company.json` - ✅ Completo
- `/src/lib/i18n/locales/es/contact.json` - ✅ Completo
- `/src/lib/i18n/locales/es/projects.json` - ✅ Completo
- `/src/lib/i18n/locales/es/posts.json` - ✅ Completo

### ⚠️ Archivos que Necesitan Revisión:
- Verificar que los componentes están importando los namespaces correctos
- Verificar que t() está usando la sintaxis correcta para cada namespace

## Próximos Pasos

1. [ ] Revisar cómo Hero.tsx usa stats
2. [ ] Revisar cómo ServicesGrid.tsx usa services  
3. [ ] Verificar que config.ts carga todos los namespaces
4. [ ] Agregar tests mockups
5. [ ] Mejorar transición visual
