# Configuración de Internacionalización (i18n)

## Resumen

La aplicación ahora soporta múltiples idiomas (español e inglés) usando **react-i18next**. Los usuarios pueden cambiar el idioma mediante un selector en el header que persiste la preferencia en localStorage.

## Tecnologías Utilizadas

- **i18next**: Framework de internacionalización
- **react-i18next**: Integración de i18next con React
- **i18next-browser-languagedetector**: Detección automática del idioma del navegador

## Estructura de Archivos

```
src/
├── lib/
│   └── i18n/
│       ├── config.ts          # Configuración de i18next
│       ├── index.ts            # Barrel export
│       └── locales/
│           ├── es.json         # Traducciones en español
│           └── en.json         # Traducciones en inglés
└── components/
    └── atoms/
        └── LanguageSelector/   # Componente selector de idioma
            ├── LanguageSelector.tsx
            └── index.ts
```

## Configuración

### Idiomas Soportados

- **Español (es)**: Idioma por defecto
- **English (en)**: Idioma alternativo

### Detección de Idioma

El sistema detecta el idioma en el siguiente orden de prioridad:

1. **localStorage**: Preferencia guardada del usuario (key: `pibelabs-language`)
2. **navigator**: Idioma del navegador
3. **htmlTag**: Atributo lang del HTML
4. **fallback**: Español (es) como fallback

## Uso en Componentes

### Hook useTranslation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
    </div>
  );
};
```

### Cambio de Idioma

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <button onClick={() => changeLanguage('en')}>
      English
    </button>
  );
};
```

## Estructura de Traducciones

Los archivos JSON de traducciones están organizados por secciones:

```json
{
  "nav": { ... },           // Navegación
  "hero": { ... },          // Sección Hero
  "company": { ... },       // Información de la empresa
  "stats": { ... },         // Estadísticas
  "services": { ... },      // Servicios
  "portfolio": { ... },     // Portfolio
  "about": { ... },         // Acerca de
  "blog": { ... },          // Blog
  "contact": { ... },       // Contacto
  "footer": { ... },        // Footer
  "common": { ... }         // Textos comunes
}
```

## Componente LanguageSelector

El selector de idioma está ubicado en el header (desktop y mobile) y muestra:

- Bandera del idioma
- Nombre del idioma
- Estado activo con borde cyan neon

### Ubicaciones

- **Desktop**: Entre los links de navegación y el botón CTA
- **Mobile**: En el menú móvil desplegable

## Agregar Nuevas Traducciones

### 1. Agregar claves en los archivos de traducción

**src/lib/i18n/locales/es.json**
```json
{
  "newSection": {
    "title": "Nuevo Título",
    "description": "Nueva descripción"
  }
}
```

**src/lib/i18n/locales/en.json**
```json
{
  "newSection": {
    "title": "New Title",
    "description": "New description"
  }
}
```

### 2. Usar en componentes

```tsx
const { t } = useTranslation();
<h2>{t('newSection.title')}</h2>
<p>{t('newSection.description')}</p>
```

## Agregar Nuevo Idioma

### 1. Crear archivo de traducción

`src/lib/i18n/locales/fr.json`

### 2. Actualizar configuración

**src/lib/i18n/config.ts**
```typescript
import fr from './locales/fr.json';

export const supportedLanguages = ['es', 'en', 'fr'] as const;

const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
};
```

### 3. Actualizar LanguageSelector

**src/components/atoms/LanguageSelector/LanguageSelector.tsx**
```typescript
const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];
```

## Componentes Actualizados con i18n

Los siguientes componentes fueron actualizados para soportar traducciones:

- ✅ **Header**: Navegación, CTA, selector de idioma
- ✅ **Hero**: Título, subtítulo, CTAs, estadísticas
- 🔄 **ServicesGrid**: (pendiente)
- 🔄 **PortfolioSection**: (pendiente)
- 🔄 **AboutSection**: (pendiente)
- 🔄 **BlogSection**: (pendiente)
- 🔄 **ContactForm**: (pendiente)
- 🔄 **Footer**: (pendiente)

## Próximos Pasos

1. Actualizar componentes restantes para usar traducciones
2. Agregar traducciones para mensajes de error y validación
3. Considerar agregar más idiomas (portugués, francés, etc.)
4. Implementar lazy loading de traducciones para mejor performance
5. Agregar tests para componentes con i18n

## Testing

Para probar el sistema de traducciones:

1. Abrir la aplicación en http://localhost:3001
2. Verificar que el idioma por defecto sea español
3. Hacer clic en el selector de idioma en el header
4. Cambiar a inglés
5. Verificar que:
   - El contenido cambie al idioma seleccionado
   - La preferencia se guarde en localStorage
   - Al recargar la página, se mantenga el idioma seleccionado

## Performance

- Las traducciones se cargan en el bundle principal
- El idioma se detecta y aplica antes del primer render
- Los cambios de idioma son instantáneos (sin recarga de página)
- La preferencia se persiste en localStorage

## Consideraciones de SEO

Para mejorar el SEO multiidioma en el futuro:

1. Agregar meta tags hreflang
2. Implementar URLs específicas por idioma
3. Generar sitemaps por idioma
4. Configurar idiomas en el HTML tag dinámicamente

## Recursos

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Best Practices for Internationalization](https://react.i18next.com/latest/using-with-hooks)
