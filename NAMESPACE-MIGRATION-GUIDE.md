# 🔄 Namespace Migration Guide

## Estado Actual

✅ **Preparación Completa** - Los namespaces están separados y listos  
⏸️ **Pendiente** - Actualizar 22 componentes para usar los nuevos namespaces

---

## 📦 Namespaces Creados (12 total)

| Namespace | Archivo | Contenido |
|-----------|---------|-----------|
| `common` | `locales/{lang}/common.json` | Traducciones comunes (loading, error, success, etc.) |
| `navigation` | `locales/{lang}/navigation.json` | Links de navegación |
| `hero` | `locales/{lang}/hero.json` | Sección Hero |
| `company` | `locales/{lang}/company.json` | Info de la empresa |
| `stats` | `locales/{lang}/stats.json` | Estadísticas |
| `services` | `locales/{lang}/services.json` | Servicios |
| `portfolio` | `locales/{lang}/portfolio.json` | Portfolio |
| `about` | `locales/{lang}/about.json` | Sobre Nosotros |
| `blog` | `locales/{lang}/blog.json` | Blog |
| `contact` | `locales/{lang}/contact.json` | Contacto |
| `footer` | `locales/{lang}/footer.json` | Footer |
| `validation` | `locales/{lang}/validation.json` | Validaciones |

---

## 🛠️ Cómo Migrar un Componente

### **Antes** (formato actual):

```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("hero.headline")}</p>
      <button>{t("common.contactUs")}</button>
    </div>
  );
};
```

### **Después** (con namespaces):

```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  // Cargar múltiples namespaces
  const { t } = useTranslation(["navigation", "hero", "common"]);
  
  return (
    <div>
      <h1>{t("home", { ns: "navigation" })}</h1>
      <p>{t("headline", { ns: "hero" })}</p>
      <button>{t("contactUs", { ns: "common" })}</button>
    </div>
  );
};
```

### **Alternativa - Hook dedicado**:

```typescript
import { useNamespace } from "@/lib/i18n";

const MyComponent = () => {
  const tNav = useNamespace("navigation");
  const tHero = useNamespace("hero");
  const tCommon = useNamespace("common");
  
  return (
    <div>
      <h1>{tNav("home")}</h1>
      <p>{tHero("headline")}</p>
      <button>{tCommon("contactUs")}</button>
    </div>
  );
};
```

---

## 📋 Componentes a Migrar (22 total)

### Alto Prioridad (rendering crítico)

- [ ] `Header/Header.tsx` - **MIGRADO** ✅
- [ ] `Hero/Hero.tsx`
- [ ] `Footer/Footer.tsx`
- [ ] `LanguageSelector/LanguageSelector.tsx`

### Media Prioridad

- [ ] `ServicesGrid/ServicesGrid.tsx`
- [ ] `PortfolioSection/PortfolioSection.tsx`
- [ ] `AboutSection/AboutSection.tsx`
- [ ] `BlogSection/BlogSection.tsx`
- [ ] `ContactForm/ContactForm.tsx`
- [ ] `StatsSection/StatsSection.tsx`

### Baja Prioridad (componentes menores)

- [ ] `ErrorBoundary/ErrorBoundary.tsx`
- [ ] `LanguageTransition/LanguageTransition.tsx`
- [ ] Resto de componentes que usen traducciones

---

## 🎯 Pasos para Completar la Migración

### 1. Actualizar Config (HECHO ✅)

El archivo `src/lib/i18n/config.ts` ya está configurado para cargar namespaces:

```typescript
const resources = {
  es: {
    common: esCommon,
    navigation: esNavigation,
    // ... etc
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    // ... etc
  },
};

i18n.init({
  resources,
  defaultNS: "common",
  ns: ["common", "navigation", "hero", ...],
  fallbackNS: "common",
  // ...
});
```

### 2. Actualizar Componentes (PENDIENTE)

Usar el patrón de migración descrito arriba para cada componente.

**Script helper** (opcional):

```bash
# Buscar componentes que usen t("sectionName.key")
grep -r 't("[a-z]*\.' src/components/ --include="*.tsx"

# Reemplazar automáticamente (experimental)
# Este script necesita crearse manualmente
node scripts/migrate-to-namespaces.js
```

### 3. Testing

Después de migrar cada componente:

- [ ] Verificar que las traducciones se muestran correctamente
- [ ] Cambiar idioma y verificar que funciona
- [ ] No hay errores en consola
- [ ] Type-check pasa (`npm run type-check`)

### 4. Eliminar Archivos Legacy

Una vez todo migrado:

```bash
# Eliminar backups
rm src/lib/i18n/locales/es.json.backup
rm src/lib/i18n/locales/en.json.backup
```

---

## ⚡ Script de Migración Automática

Crear `scripts/migrate-to-namespaces.js`:

```javascript
#!/usr/bin/env node
/**
 * Auto-migrate components to use namespaces
 * WARNING: Review changes before committing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Namespace mapping - old prefix to new namespace
const namespaceMap = {
  'nav': 'navigation',
  'hero': 'hero',
  'company': 'company',
  'stats': 'stats',
  'services': 'services',
  'portfolio': 'portfolio',
  'about': 'about',
  'blog': 'blog',
  'contact': 'contact',
  'footer': 'footer',
  'common': 'common',
  'validation': 'validation'
};

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const usedNamespaces = new Set();

  // Find all t("section.key") patterns
  const matches = content.matchAll(/t\("([a-z]+)\.([^"]+)"\)/g);
  
  for (const match of matches) {
    const [fullMatch, section, key] = match;
    const namespace = namespaceMap[section];
    
    if (namespace) {
      usedNamespaces.add(namespace);
      const replacement = `t("${key}", { ns: "${namespace}" })`;
      content = content.replace(fullMatch, replacement);
      modified = true;
    }
  }

  // Update useTranslation hook if namespaces were used
  if (usedNamespaces.size > 0) {
    const namespaceArray = `["${Array.from(usedNamespaces).join('", "')}"]`;
    content = content.replace(
      /const \{ t \} = useTranslation\(\);/,
      `const { t } = useTranslation(${namespaceArray});`
    );
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Migrated: ${filePath}`);
    console.log(`   Namespaces: ${Array.from(usedNamespaces).join(', ')}`);
  }
}

// Process all .tsx files in components/
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      migrateFile(fullPath);
    }
  }
}

const componentsDir = path.join(__dirname, '..', 'src', 'components');
console.log('🔄 Starting namespace migration...\n');
processDirectory(componentsDir);
console.log('\n✨ Migration complete!');
console.log('\n⚠️  Review changes with: git diff');
console.log('⚠️  Test thoroughly before committing');
```

Ejecutar:

```bash
chmod +x scripts/migrate-to-namespaces.js
node scripts/migrate-to-namespaces.js
```

---

## 📊 Beneficios de los Namespaces

### ✅ Ventajas

1. **Organización**: Traducciones agrupadas por sección lógica
2. **Mantenibilidad**: Más fácil encontrar y actualizar traducciones
3. **Git-friendly**: Menos conflictos en archivos separados
4. **Lazy loading**: Posibilidad de cargar solo namespaces necesarios
5. **Escalabilidad**: Fácil agregar nuevas secciones sin archivos gigantes

### ⚠️ Desventajas (Actuales)

1. **Refactor manual**: 22 componentes necesitan actualizarse
2. **Tiempo estimado**: ~2 horas de trabajo manual
3. **Testing**: Requiere testing exhaustivo post-migración
4. **Temporalmente roto**: App no funciona hasta completar migración

---

## 🎓 Recomendación

**Opción A - Completar ahora** (2h)
- Migrar 22 componentes usando script automático
- Testing exhaustivo
- Beneficio inmediato de organización

**Opción B - Migración gradual** (recomendado)
- Crear sistema hybrid (soporta ambos formatos)
- Migrar componentes de a poco
- Menos riesgo, más tiempo

**Opción C - Posponer**
- Mantener estructura actual (funciona perfectamente)
- Migrar solo si agregamos muchos más idiomas
- Namespace ya preparados para futuro

---

## 📝 Estado del Código

- ✅ Namespaces creados y populados
- ✅ Script split-translations.js funcionando
- ✅ Hook useNamespace() implementado
- ✅ Config.ts actualizado para namespaces
- ✅ useTypedTranslation() actualizado
- ✅ Header.tsx migrado como ejemplo
- ⏸️ 21 componentes pendientes de migrar
- ⏸️ Testing pendiente

---

**Tiempo estimado para completar**: 2-3 horas  
**ROI**: Medio (organización, no funcionalidad)  
**Prioridad**: Baja (funcional actual es suficiente)  
**Bloqueante**: No (código funciona con archivos legacy)

---

**Última actualización**: 12 de Noviembre, 2025  
**Estado**: ⏸️ Preparado pero pendiente de completar  
**Decisión**: Evaluar con equipo si vale la pena el refactor ahora
