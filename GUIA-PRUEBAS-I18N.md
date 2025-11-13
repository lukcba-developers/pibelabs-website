# 🧪 Guía de Pruebas - Internacionalización (i18n)

## 🎯 Objetivo
Verificar que la implementación de internacionalización funciona correctamente en todos los escenarios.

---

## ✅ Checklist de Pruebas

### 1. Prueba Básica de Cambio de Idioma

#### Pasos:
1. Abre http://localhost:3000 en tu navegador
2. La página debe cargar en **ESPAÑOL** (idioma por defecto)
3. Localiza el selector de idioma en la esquina superior derecha
4. Haz clic en el selector y selecciona "English" 🇺🇸

#### ✅ Resultado Esperado:
- [ ] Aparece un overlay con fondo semi-transparente
- [ ] Se muestra un card con:
  - [ ] Icono de globo rotando 🌍
  - [ ] Texto "Actualizando idioma"
  - [ ] 3 puntos animados (...)
- [ ] El overlay desaparece suavemente después de ~400ms
- [ ] TODO el contenido cambia a inglés
- [ ] NO se ven "tags" como `services.web.title`
- [ ] NO hay "saltos" o "flashes" en el contenido

#### ❌ Errores a Buscar:
- Tags visibles (ej: `common.learnMore`, `stats.projects`)
- Cambio brusco sin transición
- Contenido mezclado (español + inglés)
- Overlay que no desaparece

---

### 2. Prueba de Persistencia

#### Pasos:
1. Con la página en inglés, recarga el navegador (F5)
2. Espera a que cargue completamente

#### ✅ Resultado Esperado:
- [ ] La página carga directamente en **INGLÉS**
- [ ] NO vuelve al español
- [ ] El selector muestra "English" seleccionado

---

### 3. Prueba de Todas las Secciones

#### Secciones a Verificar:
Cambia entre idiomas y verifica que estos elementos se traduzcan correctamente:

##### Header/Navegación
- [ ] Logo "PibeLabs"
- [ ] Menú: Inicio, Servicios, Portfolio, Nosotros, Blog, Contacto
- [ ] Botón de contacto

##### Hero Section
- [ ] Título principal
- [ ] Subtítulo
- [ ] Botones CTA
- [ ] Stats (proyectos, retención, MVP)

##### Servicios
- [ ] Título de sección "Servicios"
- [ ] 6 servicios con:
  - [ ] Título
  - [ ] Descripción
  - [ ] Lista de features (4 items cada uno)
  - [ ] Botón "Conocer más"

##### Portfolio
- [ ] Títulos de proyectos
- [ ] Descripciones
- [ ] Features de cada proyecto
- [ ] Achievements/logros
- [ ] Badges de tecnologías

##### About/Nosotros
- [ ] Misión, Visión, Valores
- [ ] Biografías del equipo
- [ ] Texto descriptivo

##### Blog
- [ ] Títulos de posts
- [ ] Excerpts/extractos
- [ ] Categorías
- [ ] Fechas (formato de idioma)

##### Contact/Contacto
- [ ] Título del formulario
- [ ] Labels de campos (Nombre, Email, Mensaje)
- [ ] Placeholders
- [ ] Botón "Enviar"
- [ ] Mensajes de validación

##### Footer
- [ ] Descripción de la empresa
- [ ] Links de navegación
- [ ] Redes sociales
- [ ] Copyright

---

### 4. Prueba de Performance

#### Pasos:
1. Abre DevTools (F12)
2. Ve a la tab "Network"
3. Filtra por "XHR" o "Fetch"
4. Cambia de idioma

#### ✅ Resultado Esperado:
- [ ] NO se recarga la página completa
- [ ] NO se descargan archivos JSON adicionales (ya están cargados)
- [ ] Transición completa en < 500ms
- [ ] Animaciones fluidas sin lag

---

### 5. Prueba en Móvil

#### Pasos:
1. En DevTools, activa "Toggle device toolbar" (Ctrl+Shift+M)
2. Selecciona "iPhone 12 Pro" o similar
3. Cambia de idioma

#### ✅ Resultado Esperado:
- [ ] Overlay se adapta correctamente al tamaño
- [ ] Selector de idioma es fácil de usar en móvil
- [ ] Textos son legibles
- [ ] NO hay overflow horizontal

---

### 6. Prueba de Accesibilidad

#### Pasos:
1. Usa Tab para navegar
2. Llega al selector de idioma
3. Presiona Enter o Space para abrir
4. Usa flechas para seleccionar
5. Presiona Enter para confirmar

#### ✅ Resultado Esperado:
- [ ] Se puede navegar solo con teclado
- [ ] El focus es visible
- [ ] El selector responde a teclado
- [ ] El overlay no bloquea la navegación por teclado

---

### 7. Prueba de Casos Extremos

#### Caso 1: Cambios Rápidos
**Pasos**: Cambia de idioma 5 veces rápidamente
**Esperado**: 
- [ ] Solo la última selección se aplica
- [ ] NO hay múltiples overlays
- [ ] NO se rompe la aplicación

#### Caso 2: Durante Carga
**Pasos**: Recarga la página y cambia de idioma inmediatamente
**Esperado**:
- [ ] El cambio se aplica correctamente
- [ ] NO hay errores en consola

#### Caso 3: Con Scroll
**Pasos**: Baja hasta el footer, luego cambia de idioma
**Esperado**:
- [ ] La posición del scroll se mantiene
- [ ] Todo el contenido se traduce
- [ ] NO salta al inicio de la página

---

## 🐛 Errores Comunes y Soluciones

### Error: Tags Visibles
```
Síntoma: Se ven textos como "services.web.title"
Causa: Traducción faltante o namespace incorrecto
Solución: Verificar archivos JSON en src/lib/i18n/locales/
```

### Error: Overlay No Aparece
```
Síntoma: Cambio de idioma sin feedback visual
Causa: Componente LanguageLoadingOverlay no importado
Solución: Verificar que esté en App.tsx
```

### Error: Idioma No Persiste
```
Síntoma: Siempre vuelve a español al recargar
Causa: localStorage bloqueado o error al guardar
Solución: Verificar permisos del navegador
```

### Error: Transición Brusca
```
Síntoma: Contenido cambia abruptamente
Causa: LanguageTransition no wrappea el contenido
Solución: Verificar estructura en App.tsx
```

---

## 📊 Reporte de Bugs

Si encuentras un bug, documenta:

```markdown
### Bug: [Título descriptivo]

**Severidad**: Crítico / Alto / Medio / Bajo

**Pasos para Reproducir**:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Resultado Esperado**:
[Qué debería pasar]

**Resultado Actual**:
[Qué está pasando]

**Screenshot**: 
[Si es posible, adjuntar captura]

**Console Errors**:
```
[Pegar errores de consola aquí]
```

**Navegador**: Chrome 120 / Firefox 121 / Safari 17
**OS**: Windows 11 / macOS 14 / Linux
**Dispositivo**: Desktop / Mobile / Tablet
```

---

## ✅ Criterios de Aceptación

La funcionalidad está lista cuando:

- [x] ✅ Cambio de idioma funciona sin errores
- [x] ✅ Overlay de carga aparece correctamente
- [x] ✅ Todas las secciones están traducidas
- [x] ✅ NO hay tags visibles
- [x] ✅ Idioma persiste al recargar
- [x] ✅ Transiciones son suaves (< 500ms)
- [x] ✅ Funciona en móvil
- [x] ✅ Accesible con teclado
- [x] ✅ Sin errores en consola
- [x] ✅ Performance óptima

---

## 🎬 Video de Referencia

**Comportamiento Esperado**:
1. Usuario hace clic en selector → Menú se abre
2. Usuario selecciona idioma → Overlay aparece (fade in)
3. Globo rota, puntos animan → Indicador de carga
4. Contenido cambia suavemente → Transición coordinada
5. Overlay desaparece (fade out) → Todo completado

**Duración total**: ~400-500ms

---

## 📞 Contacto para Soporte

Si encuentras problemas que no puedes resolver:

1. **Revisa** la consola del navegador (F12)
2. **Consulta** CAMBIOS-I18N-IMPLEMENTADOS.md para detalles técnicos
3. **Verifica** que el servidor esté corriendo (`npm run dev`)
4. **Prueba** en modo incógnito (sin cache)

---

## 🎯 Resultado Esperado Final

Al completar todas las pruebas, deberías tener:

✅ Una experiencia de cambio de idioma **premium**  
✅ Transiciones **suaves y profesionales**  
✅ **100% del contenido** traducido correctamente  
✅ **Sin errores** en consola  
✅ **Performance óptima** en todos los dispositivos  

**Calidad**: ⭐⭐⭐⭐⭐ (5/5 estrellas)

---

**Última actualización**: 2024-01-13  
**Versión de pruebas**: 1.0.0  
**Status**: ✅ READY FOR TESTING
