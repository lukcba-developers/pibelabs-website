# Configuración de Deploy a Hostinger

Este documento explica cómo configurar los secrets de GitHub para habilitar el despliegue automático a Hostinger.

## Secrets Requeridos

Debes configurar los siguientes secrets en tu repositorio de GitHub:

### 1. FTP_SERVER
- **Descripción**: Dirección del servidor FTP de Hostinger
- **Ejemplo**: `ftp.tudominio.com` o `123.45.67.89`
- **Cómo obtenerlo**:
  - Inicia sesión en tu panel de Hostinger
  - Ve a **Hosting** → Selecciona tu plan
  - En la sección **FTP** encontrarás el **Hostname**

### 2. FTP_USERNAME
- **Descripción**: Usuario FTP de tu cuenta de Hostinger
- **Ejemplo**: `u123456789` o `usuario@tudominio.com`
- **Cómo obtenerlo**:
  - En el panel de Hostinger, sección **FTP**
  - Copia el **Username** que aparece

### 3. FTP_PASSWORD
- **Descripción**: Contraseña de tu cuenta FTP
- **Cómo obtenerlo**:
  - Si olvidaste tu contraseña, puedes cambiarla en el panel de Hostinger
  - Ve a **Hosting** → **FTP** → **Change Password**

### 4. FTP_SERVER_DIR
- **Descripción**: Directorio donde se subirán los archivos en el servidor
- **Ejemplo**: `/domains/pibelabs.com/public_html/` o `/public_html/`
- **Cómo determinarla**:
  - Para dominio principal: `/public_html/`
  - Para subdominios: `/domains/subdominio.tudominio.com/public_html/`
  - Para dominios addon: `/domains/tuotrodominio.com/public_html/`

## Cómo Configurar los Secrets en GitHub

### Opción 1: Interfaz Web de GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (⚙️)
3. En el menú lateral, busca **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**
5. Agrega cada secret:
   - **Name**: `FTP_SERVER`
   - **Value**: Tu servidor FTP
   - Haz clic en **Add secret**
6. Repite para `FTP_USERNAME`, `FTP_PASSWORD`, y `FTP_SERVER_DIR`

### Opción 2: GitHub CLI (gh)

```bash
# Configurar FTP_SERVER
gh secret set FTP_SERVER --body "ftp.tudominio.com"

# Configurar FTP_USERNAME
gh secret set FTP_USERNAME --body "tu_usuario_ftp"

# Configurar FTP_PASSWORD
gh secret set FTP_PASSWORD --body "tu_password_ftp"

# Configurar FTP_SERVER_DIR
gh secret set FTP_SERVER_DIR --body "/public_html/"
```

**Nota**: Reemplaza los valores de ejemplo con tus credenciales reales de Hostinger.

## Verificar la Configuración

Después de configurar los secrets:

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Deberías ver los 4 secrets listados (no podrás ver sus valores, solo los nombres)

## Cómo Funciona el Deploy Automático

Una vez configurados los secrets, el deploy se ejecutará automáticamente:

### Deploy Automático
- **Trigger**: Cada vez que hagas push a la rama `main`
- **Proceso**:
  1. Instala dependencias (`npm ci`)
  2. Ejecuta linting (`npm run lint`)
  3. Verifica tipos TypeScript (`npm run type-check`)
  4. Construye el proyecto (`npm run build`)
  5. Sube los archivos del directorio `dist/` a tu servidor Hostinger vía FTP

### Deploy Manual
También puedes ejecutar el deploy manualmente:
1. Ve a tu repositorio en GitHub
2. Haz clic en **Actions**
3. Selecciona el workflow **Deploy to Hostinger**
4. Haz clic en **Run workflow**
5. Selecciona la rama `main` y confirma

## Estructura de Archivos en Hostinger

Después del deploy, la estructura en tu servidor será:

```
/public_html/  (o tu FTP_SERVER_DIR)
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── favicon.svg
└── ...
```

## Troubleshooting

### Error: "FTP connection failed"
- Verifica que `FTP_SERVER` sea correcto
- Asegúrate de que el puerto 21 esté abierto
- Confirma que las credenciales FTP sean válidas

### Error: "Permission denied"
- Verifica que `FTP_USERNAME` y `FTP_PASSWORD` sean correctos
- Asegúrate de que el usuario tenga permisos de escritura en `FTP_SERVER_DIR`

### Error: "Directory not found"
- Verifica que `FTP_SERVER_DIR` exista en tu servidor
- Asegúrate de incluir las barras `/` al inicio y al final

### Los archivos no se actualizan
- El workflow usa `dangerous-clean-slate: true` que limpia el directorio antes de subir
- Revisa los logs del workflow en GitHub Actions para ver detalles

## Ver Logs del Deploy

1. Ve a tu repositorio en GitHub
2. Haz clic en **Actions**
3. Selecciona el último run de **Deploy to Hostinger**
4. Haz clic en el job **build-and-deploy**
5. Expande cada step para ver los detalles

## Seguridad

⚠️ **IMPORTANTE**:
- Nunca subas tus credenciales FTP al repositorio
- Nunca compartas tus secrets de GitHub
- Los secrets están encriptados y solo son accesibles durante la ejecución del workflow
- Si sospechas que tus credenciales fueron comprometidas, cámbialas inmediatamente en Hostinger y actualiza los secrets en GitHub

## Variables de Entorno para el Build

Si necesitas variables de entorno para el build (por ejemplo, `VITE_API_URL`), agrégalas al workflow:

```yaml
- name: Build project
  run: npm run build
  env:
    CI: false
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
    VITE_ANALYTICS_ID: ${{ secrets.VITE_ANALYTICS_ID }}
```

Y configura esos secrets adicionales siguiendo el mismo proceso.
