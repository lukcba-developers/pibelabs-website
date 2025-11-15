# Pre-commit Workflow

## Antes de cada commit

**SIEMPRE** ejecutar antes de hacer commit:

```bash
npm run precommit
```

Este comando ejecuta en orden:
1. **ESLint** - Validación de código (0 warnings permitidos)
2. **Prettier** - Verificación de formato de código
3. **TypeScript** - Type-check sin emisión de archivos

## Automatización con Husky

El proyecto está configurado con `husky` y `lint-staged` para ejecutar automáticamente:

- **Pre-commit**: Formatea y lintea archivos en staging
- **Pre-push**: Se puede configurar para ejecutar tests

## Scripts disponibles

```bash
npm run lint          # Ejecutar ESLint
npm run lint:fix      # Auto-fix de ESLint
npm run format        # Formatear código con Prettier
npm run format:check  # Verificar formato sin modificar
npm run type-check    # Verificar tipos de TypeScript
npm run precommit     # Ejecutar todos los checks
```

## CI/CD

Los workflows de GitHub Actions ejecutan automáticamente:

- ✅ `npm run precommit` en cada push/PR
- ✅ Build del proyecto
- ✅ Security audit
- ⚠️ Tests deshabilitados temporalmente (requieren configuración)

## Errores comunes

### ESLint warnings
```bash
npm run lint:fix
```

### Formato incorrecto
```bash
npm run format
```

### Errores de TypeScript
Revisar manualmente los errores reportados por `tsc --noEmit`
