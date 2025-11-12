# Tareas Pendientes para Completar i18n

## Estado Actual ✅

Se ha implementado la infraestructura base de internacionalización con:

1. ✅ Instalación de dependencias (i18next, react-i18next, i18next-browser-languagedetector)
2. ✅ Configuración de i18next con detección automática de idioma
3. ✅ Archivos de traducción completos para ES/EN (`src/lib/i18n/locales/`)
4. ✅ Componente `LanguageSelector` para cambiar idiomas
5. ✅ Integración en `main.tsx` para inicializar i18n
6. ✅ Actualización del componente `Header` con traducciones
7. ✅ Actualización del componente `Hero` con traducciones

## Componentes Pendientes de Actualizar 🔄

Para completar la implementación, los siguientes componentes necesitan ser actualizados para usar el hook `useTranslation()`:

### 1. ServicesGrid (`src/components/organisms/ServicesGrid/ServicesGrid.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const ServicesGrid = () => {
  const { t } = useTranslation();
  
  // Reemplazar textos estáticos con:
  <h2>{t('services.title')}</h2>
  <p>{t('services.subtitle')}</p>
  
  // Para cada servicio, usar:
  <h3>{t('services.webDev.title')}</h3>
  <p>{t('services.webDev.description')}</p>
  {t('services.webDev.features', { returnObjects: true }).map(...)}
  
  // Repetir para: ai, uiux, cloud
};
```

### 2. PortfolioSection (`src/components/organisms/PortfolioSection/PortfolioSection.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const PortfolioSection = () => {
  const { t } = useTranslation();
  
  <h2>{t('portfolio.title')}</h2>
  <p>{t('portfolio.subtitle')}</p>
  <button>{t('portfolio.viewProject')}</button>
  
  // Para categorías:
  {t('portfolio.categories.all')}
  {t('portfolio.categories.web')}
  // etc...
};
```

**Nota:** Los proyectos individuales en `PORTFOLIO_PROJECTS` del config.ts necesitarán ser movidos a los archivos de traducción o manejarse dinámicamente.

### 3. AboutSection (`src/components/organisms/AboutSection/AboutSection.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  
  <h2>{t('about.title')}</h2>
  <p>{t('about.subtitle')}</p>
  <p>{t('about.description')}</p>
  
  // Para valores:
  {t('about.values.quality.title')}
  {t('about.values.quality.description')}
  // etc...
};
```

### 4. BlogSection (`src/components/organisms/BlogSection/BlogSection.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const BlogSection = () => {
  const { t } = useTranslation();
  
  <h2>{t('blog.title')}</h2>
  <p>{t('blog.subtitle')}</p>
  <button>{t('blog.readMore')}</button>
  <span>{readTime} {t('blog.readTime')}</span>
};
```

**Nota:** Los posts del blog en `BLOG_POSTS` necesitarán ser traducidos también.

### 5. ContactForm (`src/components/organisms/ContactForm/ContactForm.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  
  <h2>{t('contact.title')}</h2>
  <p>{t('contact.subtitle')}</p>
  
  // Campos del formulario:
  placeholder={t('contact.form.name')}
  placeholder={t('contact.form.email')}
  placeholder={t('contact.form.message')}
  
  // Botón submit:
  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
  
  // Mensajes:
  {t('contact.form.success')}
  {t('contact.form.error')}
};
```

**Importante:** También actualizar el schema de validación Zod en `src/lib/validation/schemas.ts` para usar mensajes traducidos.

### 6. Footer (`src/components/organisms/Footer/Footer.tsx`)

**Cambios necesarios:**

```tsx
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  <p>{t('footer.tagline')}</p>
  <p>{t('footer.rights')}</p>
  
  // Links:
  const NAV_LINKS = [
    { label: t('footer.links.services'), href: '#services' },
    { label: t('footer.links.portfolio'), href: '#portfolio' },
    // etc...
  ];
};
```

### 7. StatsSection (`src/components/organisms/StatsSection/StatsSection.tsx`)

Si existe, actualizar para usar `t('stats.projects')`, etc.

## Datos Dinámicos a Traducir 📊

Algunos datos del archivo `config.ts` contienen contenido que debe ser traducido:

### Servicios (SERVICES)

Actualmente están hardcoded en español en `config.ts`. Opciones:

**Opción A:** Moverlos completamente a los archivos de traducción (recomendado)
**Opción B:** Mantener estructura en config.ts pero con keys de traducción

```typescript
// config.ts
export const SERVICES = [
  {
    id: 'web-dev',
    titleKey: 'services.webDev.title',
    descriptionKey: 'services.webDev.description',
    featuresKey: 'services.webDev.features',
    icon: Code,
  },
  // ...
];
```

### Portfolio Projects (PORTFOLIO_PROJECTS)

Los proyectos tienen títulos, descripciones y tags en español. Necesitan:

```json
// es.json
{
  "portfolio": {
    "projects": {
      "ecommerce": {
        "title": "E-commerce Next.js",
        "description": "Plataforma completa...",
        "tags": ["Next.js", "TypeScript", ...]
      }
    }
  }
}
```

### Blog Posts (BLOG_POSTS)

Similar a los proyectos, necesitan traducción completa.

### Team Members (TEAM_MEMBERS)

Títulos y descripciones necesitan ser traducidos.

## Validaciones de Formularios 🔍

Actualizar `src/lib/validation/schemas.ts` para usar traducciones:

```typescript
import i18next from 'i18next';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, i18next.t('contact.validation.nameMin'))
    .nonempty(i18next.t('contact.validation.nameRequired')),
  email: z
    .string()
    .email(i18next.t('contact.validation.emailInvalid'))
    .nonempty(i18next.t('contact.validation.emailRequired')),
  // ...
});
```

**Nota:** Puede ser necesario hacer el schema una función para acceder a `t()` dentro del contexto de React.

## Testing 🧪

Después de completar los cambios:

1. **Prueba visual:**
   - Iniciar `npm run dev`
   - Cambiar entre español e inglés
   - Navegar por todas las secciones
   - Verificar que todo el contenido se traduce

2. **Prueba de persistencia:**
   - Cambiar idioma
   - Recargar página
   - Verificar que se mantiene el idioma seleccionado

3. **Prueba de formularios:**
   - Enviar formulario con errores
   - Verificar que mensajes de error estén traducidos
   - Enviar formulario exitosamente
   - Verificar mensaje de éxito traducido

4. **Prueba de fallback:**
   - Cambiar idioma del navegador
   - Limpiar localStorage
   - Recargar página
   - Verificar que detecta idioma correctamente

## Mejoras Futuras 🚀

Una vez completada la implementación básica:

1. **Lazy loading de traducciones:**
   ```typescript
   // Solo cargar el idioma necesario
   i18n.use(Backend).init({...});
   ```

2. **Más idiomas:**
   - Portugués (pt)
   - Francés (fr)
   - Alemán (de)

3. **Pluralización:**
   ```json
   {
     "items": {
       "one": "{{count}} artículo",
       "other": "{{count}} artículos"
     }
   }
   ```

4. **Interpolación:**
   ```json
   {
     "welcome": "Bienvenido, {{name}}!"
   }
   ```
   ```tsx
   {t('welcome', { name: userName })}
   ```

5. **Namespace separados:**
   ```typescript
   // Organizar por feature
   i18n.init({
     ns: ['common', 'services', 'blog'],
     defaultNS: 'common'
   });
   ```

6. **SEO multiidioma:**
   - Meta tags hreflang
   - URLs por idioma
   - Sitemap multiidioma

## Checklist Final ✓

- [ ] Actualizar ServicesGrid
- [ ] Actualizar PortfolioSection
- [ ] Actualizar AboutSection
- [ ] Actualizar BlogSection
- [ ] Actualizar ContactForm
- [ ] Actualizar Footer
- [ ] Actualizar StatsSection (si existe)
- [ ] Mover datos dinámicos a archivos de traducción
- [ ] Actualizar schemas de validación
- [ ] Testing completo
- [ ] Documentar cambios en README.md
- [ ] Actualizar CLAUDE.md con info de i18n

## Comandos Útiles

```bash
# Verificar que no hay hardcoded strings
grep -r "Servicios\|Portfolio\|Contacto" src/components --exclude-dir=node_modules

# Iniciar dev server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build production
npm run build
```

## Recursos Adicionales

- [react-i18next Best Practices](https://react.i18next.com/latest/using-with-hooks)
- [i18next Interpolation](https://www.i18next.com/translation-function/interpolation)
- [i18next Plurals](https://www.i18next.com/translation-function/plurals)
- [TypeScript with i18next](https://react.i18next.com/latest/typescript)
