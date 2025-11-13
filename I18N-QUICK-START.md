# 🚀 i18n Quick Start Guide

**Para**: Desarrolladores que necesitan trabajar con traducciones  
**Nivel**: Básico → Avanzado

---

## 📚 Tabla de Contenidos

1. [Cambiar Texto Existente](#1-cambiar-texto-existente)
2. [Agregar Nuevo Texto](#2-agregar-nuevo-texto)
3. [Crear Nuevo Namespace](#3-crear-nuevo-namespace)
4. [Traducir Componente Nuevo](#4-traducir-componente-nuevo)
5. [Testing Manual](#5-testing-manual)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Cambiar Texto Existente

**Caso**: Quiero cambiar el texto de un botón que ya está traducido

### Paso 1: Encuentra la key
```tsx
// En el componente
<button>{t("contact:form.submit")}</button>
         //  ^namespace  ^key
```

### Paso 2: Edita el JSON
```bash
# Español
vim src/lib/i18n/locales/es/contact.json

# Inglés
vim src/lib/i18n/locales/en/contact.json
```

```json
{
  "form": {
    "submit": "Enviar mensaje"  // ← Cambia esto
  }
}
```

### Paso 3: Guarda y recarga
```bash
# El dev server detecta cambios automáticamente
# Solo recarga el browser (Cmd+R)
```

✅ **Done!** El texto cambió en ambos idiomas.

---

## 2. Agregar Nuevo Texto

**Caso**: Agregué un nuevo elemento y necesito traducirlo

### Paso 1: Identifica el namespace correcto
```
common     → Textos generales (botones, labels comunes)
navigation → Links del menú
hero       → Sección hero
stats      → Estadísticas
services   → Servicios
portfolio  → Proyectos
about      → Sobre nosotros
blog       → Blog
contact    → Formulario de contacto
footer     → Footer
validation → Mensajes de error de forms
newsletter → Newsletter popup
faq        → Preguntas frecuentes
cookies    → Cookie consent
```

### Paso 2: Agrega la key en ambos idiomas

**Español** (`src/lib/i18n/locales/es/common.json`):
```json
{
  "existing": "texto existente",
  "myNewButton": "Mi Nuevo Botón"  // ← Agrega esto
}
```

**Inglés** (`src/lib/i18n/locales/en/common.json`):
```json
{
  "existing": "existing text",
  "myNewButton": "My New Button"  // ← Agrega esto
}
```

### Paso 3: Úsalo en el componente
```tsx
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation("common");
  
  return (
    <button>{t("myNewButton")}</button>
  );
};
```

✅ **Done!** Tu nuevo texto está traducido.

---

## 3. Crear Nuevo Namespace

**Caso**: Estoy creando una nueva sección grande (ej: "Testimonials")

### Paso 1: Crea los archivos JSON

```bash
# Español
touch src/lib/i18n/locales/es/testimonials.json

# Inglés
touch src/lib/i18n/locales/en/testimonials.json
```

### Paso 2: Define la estructura

**ES** (`src/lib/i18n/locales/es/testimonials.json`):
```json
{
  "title": "Lo que dicen nuestros clientes",
  "subtitle": "Testimonios reales de proyectos exitosos",
  "readMore": "Leer más",
  "viewAll": "Ver todos los testimonios"
}
```

**EN** (`src/lib/i18n/locales/en/testimonials.json`):
```json
{
  "title": "What our clients say",
  "subtitle": "Real testimonials from successful projects",
  "readMore": "Read more",
  "viewAll": "View all testimonials"
}
```

### Paso 3: Registra en config

**`src/lib/i18n/config.ts`**:
```typescript
// 1. Importa
import esTestimonials from "./locales/es/testimonials.json";
import enTestimonials from "./locales/en/testimonials.json";

// 2. Agrega a resources
const resources = {
  es: {
    // ... existing
    testimonials: esTestimonials,  // ← Agrega
  },
  en: {
    // ... existing
    testimonials: enTestimonials,  // ← Agrega
  },
};

// 3. Agrega a ns array
ns: [
  "common",
  // ... existing
  "testimonials",  // ← Agrega
],
```

### Paso 4: Actualiza types

**`src/lib/i18n/types.ts`**:
```typescript
export type Namespace =
  | "common"
  // ... existing
  | "testimonials";  // ← Agrega
```

### Paso 5: Úsalo
```tsx
const { t } = useTranslation("testimonials");

<h2>{t("title")}</h2>
<p>{t("subtitle")}</p>
```

✅ **Done!** Nuevo namespace listo.

---

## 4. Traducir Componente Nuevo

**Caso**: Creé un componente nuevo desde cero

### Antes (❌ Hardcoded)
```tsx
const NewComponent = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Este es mi nuevo componente</p>
      <button>Contactar</button>
    </div>
  );
};
```

### Después (✅ Traducido)

#### Paso 1: Identifica namespace
```
¿Es común? → "common"
¿Es específico? → Crea namespace nuevo
```

#### Paso 2: Agrega traducciones
**ES** (`src/lib/i18n/locales/es/common.json`):
```json
{
  "welcome": "Bienvenido",
  "newComponentDesc": "Este es mi nuevo componente",
  "contactButton": "Contactar"
}
```

**EN** (`src/lib/i18n/locales/en/common.json`):
```json
{
  "welcome": "Welcome",
  "newComponentDesc": "This is my new component",
  "contactButton": "Contact"
}
```

#### Paso 3: Usa en componente
```tsx
import { useTranslation } from "react-i18next";

const NewComponent = () => {
  const { t } = useTranslation("common");
  
  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("newComponentDesc")}</p>
      <button>{t("contactButton")}</button>
    </div>
  );
};
```

✅ **Done!** Componente traducido.

---

## 5. Testing Manual

### Checklist Básico

```bash
# 1. Inicia dev server
npm run dev

# 2. Abre browser
open http://localhost:3000

# 3. Testing EN ESPAÑOL
✓ Navega por toda la página
✓ Verifica que todos los textos estén en español
✓ Prueba formularios
✓ Prueba modals (Newsletter, Cookies)
✓ Prueba CTAs flotantes

# 4. Cambia a INGLÉS
✓ Click en language switcher
✓ Verifica que TODO cambie a inglés
✓ NO debe haber textos en español
✓ Prueba formularios (validaciones en inglés)
✓ Prueba modals
✓ Prueba CTAs

# 5. Cambia de vuelta a ESPAÑOL
✓ Verifica que TODO vuelva a español
✓ Verifica persistencia (recarga página)
```

### Casos Edge

```bash
✓ Recarga página → Idioma debe persistir
✓ Abre en incógnito → Debe detectar idioma del browser
✓ Cambia idioma varias veces rápido → No debe haber bugs
✓ Formularios con errores → Errores en el idioma correcto
```

---

## 6. Troubleshooting

### Problema 1: Traducción no aparece

**Síntoma**: Veo `common:myKey` en vez del texto

**Solución**:
```bash
# 1. Verifica que la key existe
cat src/lib/i18n/locales/es/common.json | grep myKey

# 2. Verifica sintaxis JSON
npx jsonlint src/lib/i18n/locales/es/common.json

# 3. Recarga servidor
# Ctrl+C y luego:
npm run dev
```

---

### Problema 2: Key no found en types

**Síntoma**: TypeScript error `Property 'myNamespace' does not exist`

**Solución**:
```typescript
// Verifica src/lib/i18n/types.ts
export type Namespace =
  | "common"
  | "myNamespace";  // ← Debe estar aquí

// Verifica src/lib/i18n/config.ts
ns: [
  "common",
  "myNamespace",  // ← Debe estar aquí
],
```

---

### Problema 3: Texto no cambia de idioma

**Síntoma**: Al cambiar idioma, algunos textos quedan en español

**Causas comunes**:

#### 1. Texto hardcoded
```tsx
// ❌ MAL
<button>Contactar</button>

// ✅ BIEN
<button>{t("contactButton")}</button>
```

#### 2. Default prop hardcoded
```tsx
// ❌ MAL
const MyComponent = ({ 
  text = "Texto por defecto" 
}) => { ... }

// ✅ BIEN
const MyComponent = ({ text }) => {
  const { t } = useTranslation("common");
  const displayText = text || t("defaultText");
  return <div>{displayText}</div>;
}
```

#### 3. Olvidaste useTranslation
```tsx
// ❌ MAL
const MyComponent = () => {
  return <div>Texto</div>;
}

// ✅ BIEN
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation("common");
  return <div>{t("text")}</div>;
}
```

---

### Problema 4: Build falla

**Síntoma**: `npm run build` da error

**Solución**:
```bash
# 1. Type check primero
npm run type-check

# 2. Si hay errores, revisa:
# - JSON válido en todos los archivos
# - Imports correctos en config.ts
# - Types actualizados en types.ts

# 3. Limpia y reconstruye
npm run clean
npm install
npm run build
```

---

### Problema 5: JSON inválido

**Síntoma**: Error al cargar traducciones

**Solución**:
```bash
# Valida todos los JSON
find src/lib/i18n/locales -name "*.json" | while read file; do
  echo "Validating $file"
  npx jsonlint "$file" || echo "ERROR in $file"
done

# Errores comunes:
# - Coma extra al final
# - Comillas faltantes
# - Caracteres especiales sin escapar
```

**Ejemplo error**:
```json
{
  "key1": "value1",
  "key2": "value2",  ← Coma extra aquí
}
```

**Corrección**:
```json
{
  "key1": "value1",
  "key2": "value2"
}
```

---

## 📚 Referencia Rápida

### Import
```tsx
import { useTranslation } from "react-i18next";
```

### Uso básico
```tsx
const { t } = useTranslation("namespace");
<div>{t("key")}</div>
```

### Con interpolación
```tsx
// JSON: "greeting": "Hola {{name}}"
<div>{t("greeting", { name: "Juan" })}</div>
// Output: Hola Juan
```

### Con namespace múltiple
```tsx
const { t } = useTranslation(["common", "contact"]);
<div>{t("common:loading")}</div>
<div>{t("contact:form.submit")}</div>
```

### Con count (plurales)
```tsx
// JSON: 
// "project_one": "proyecto"
// "project_other": "proyectos"
<div>{t("project", { count: 1 })}</div>  // proyecto
<div>{t("project", { count: 5 })}</div>  // proyectos
```

### Cambiar idioma
```tsx
import { useTranslation } from "react-i18next";

const { i18n } = useTranslation();
i18n.changeLanguage("en");  // Cambia a inglés
i18n.changeLanguage("es");  // Cambia a español
```

### Idioma actual
```tsx
const { i18n } = useTranslation();
const currentLang = i18n.language;  // "es" o "en"
```

---

## 🎯 Best Practices

### ✅ DO

1. **Keys descriptivas**
   ```json
   { "submitContactForm": "Enviar" }  // ✅
   { "btn1": "Enviar" }                // ❌
   ```

2. **Namespaces por feature**
   ```
   contact.json  // Todo lo de contacto
   hero.json     // Todo lo del hero
   ```

3. **Mantén ES y EN sincronizados**
   ```json
   // ES y EN deben tener las mismas keys
   ```

4. **Usa interpolación**
   ```json
   { "greeting": "Hola {{name}}" }  // ✅
   { "greeting": "Hola" }           // ❌ (menos flexible)
   ```

### ❌ DON'T

1. **No hardcodees texto**
   ```tsx
   <div>Texto hardcoded</div>  // ❌
   ```

2. **No mezcles idiomas en un JSON**
   ```json
   {
     "title": "Título",
     "description": "Description"  // ❌ Mezclado
   }
   ```

3. **No uses keys muy largas**
   ```json
   {
     "thisIsAVeryLongKeyNameThatIsHardToType": "..."  // ❌
     "longKeyName": "..."  // ✅
   }
   ```

---

## 🔗 Enlaces Útiles

- [i18next Docs](https://www.i18next.com/)
- [react-i18next Docs](https://react.i18next.com/)
- [Nuestro README i18n](./LEEME-FEEDBACK-I18N.md)
- [Implementación Completa](./I18N-IMPLEMENTATION-COMPLETE.md)

---

**Happy translating! 🌍**
