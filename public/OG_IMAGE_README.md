# Open Graph Image - Instrucciones de Conversión

## Imagen actual
- **Archivo**: `og-image.svg`
- **Dimensiones**: 1200x630px (tamaño estándar Open Graph)
- **Formato**: SVG (vectorial)

## ¿Por qué convertir a PNG?
Aunque el SVG funciona, el formato PNG tiene mejor compatibilidad con todas las plataformas de redes sociales (Facebook, Twitter, LinkedIn, WhatsApp, etc.).

## Métodos de conversión

### Opción 1: Servicio en línea (Más rápido)
1. Abrir https://cloudconvert.com/svg-to-png
2. Subir `public/og-image.svg`
3. Asegurar dimensiones: 1200x630px
4. Descargar como `og-image.png`
5. Colocar en `public/og-image.png`

### Opción 2: Usar Figma (Recomendado para diseñadores)
1. Abrir Figma
2. Importar `og-image.svg`
3. Exportar como PNG
   - Width: 1200px
   - Height: 630px
   - Scale: 1x o 2x (para retina)
4. Guardar como `og-image.png` en `public/`

### Opción 3: Navegador (Chrome/Edge)
1. Abrir `og-image.svg` en el navegador
2. Hacer clic derecho → Inspeccionar
3. En la consola ejecutar:
```javascript
const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 630;
const ctx = canvas.getContext('2d');
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0);
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'og-image.png';
    a.click();
  }, 'image/png');
};
img.src = '/og-image.svg';
```

### Opción 4: Línea de comandos (Si tienes ImageMagick instalado)
```bash
# Instalar ImageMagick (macOS)
brew install imagemagick

# Convertir
convert public/og-image.svg -resize 1200x630 public/og-image.png
```

### Opción 5: Node.js script (Si tienes sharp)
```bash
# Instalar sharp
npm install --save-dev sharp

# Crear script
node -e "
const sharp = require('sharp');
const fs = require('fs');
const svg = fs.readFileSync('public/og-image.svg');
sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile('public/og-image.png')
  .then(() => console.log('✅ PNG creado'))
  .catch(err => console.error(err));
"
```

## Después de convertir

1. Verificar que existe `public/og-image.png`
2. Actualizar `src/lib/constants/config.ts`:
```typescript
image: '/og-image.png', // Cambiar de .svg a .png
```
3. Verificar en herramientas de preview:
   - https://www.opengraph.xyz/
   - https://metatags.io/
   - https://cards-dev.twitter.com/validator

## Optimización adicional (opcional)

Para mejor rendimiento, comprimir el PNG:
- https://tinypng.com/
- https://squoosh.app/

Tamaño objetivo: < 300KB
