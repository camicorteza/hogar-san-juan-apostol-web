# Hogar San Juan Apóstol — Código WordPress (WPCode + bloques personalizados)

Repositorio de respaldo y control de versiones del código personalizado del sitio
[hogarsanjuanapostol.cl](https://hogarsanjuanapostol.cl), gestionado con el plugin
**WPCode** (snippets PHP/CSS/JS) más bloques de **HTML personalizado** insertados
directamente en el editor de páginas (Gutenberg).

Este repo NO reemplaza al sitio en producción — es el respaldo versionado del
código que vive dentro de WPCode y del editor, para poder rastrear cambios,
revertir errores y limpiar código no utilizado con seguridad.

## Estructura de carpetas

```
├── wpcode/
│   ├── php/          → Snippets PHP activos
│   ├── css/           → Snippets CSS activos        
│   ├──  js/   → Snippets JS activos
│   └── html/         → Snippets de tipo HTML de WPCode (no confundir con custom-html-blocks/)
├── custom-html-blocks/  → Bloques de HTML personalizado del editor (por página)
└── docs/
    ├── inventario-maestro.csv       → Tabla completa de los 62 snippets con estado
    ├── diff-1338-1339.md            → Registro de la limpieza de código muerto (jul 2026)
    ├── diff-header-navegacion.md    → Candidatos a limpieza del grupo header/nav (set 2026, pendiente confirmar con DevTools)
    └── convenciones-nombres.md      → Cómo se nombra cada archivo
```

## Convención de nombres

Cada snippet de WPCode se guarda como:
```
{ID}-{nombre-en-minusculas-con-guiones}.{extension}
```
Ejemplo: `1904-override-color-nav-barra-principal.css`

El **ID** es el mismo que aparece en la URL del snippet dentro de WPCode
(`...snippet_id=1904`), así siempre puedes ir del archivo al snippet real y viceversa.

Los snippets con partes CSS y JS mezcladas se dividen en dos archivos con el
mismo ID (ej. `2087-boton-corazon-en-el-nav.css` y `.js`).

## Estado de la limpieza (última actualización: 23-09-2026)

- **62 snippets** inventariados en total (60 activos exportados desde WPCode + 2
  inactivos archivados como referencia). 6 snippets nuevos agregados el 23-09-2026
  (2106, 2121, 2133, 2134, 2140, 2141) — no estaban en el repo hasta ahora.
- **1338 y 1339 editados**: se eliminó código muerto confirmado con Chrome DevTools
  (reglas CSS pisadas por otros snippets más recientes). Detalle completo en
  `docs/diff-1338-1339.md`.
- Grupos verificados como **NO duplicados** (mantener sin cambios): accesibilidad
  (1630/1749/1906), botón "Visitar" Quiénes Somos (2082), botones header (1510/1915/1916).
- Pendiente de verificación puntual: 2 líneas de posición del contenedor de
  accesibilidad en 1630 vs 1749 (ver notas en el CSV).
- **Grupo Header y navegación auditado (23-09-2026)**: 1338/1339/1535/1904/1906/1909/1991/1992.
  4 hallazgos con hipótesis de especificidad ya calculada, pendientes de confirmar
  con DevTools antes de tocar código. Detalle completo en
  `docs/diff-header-navegacion.md`.

## Cómo se verificó qué estaba en uso

No mediante inspección del código fuente (WPCode + LiteSpeed Cache minifican y
combinan los `<style>`/`<script>`, por lo que los IDs individuales no sobreviven
en el HTML final). En su lugar, se usó el panel **Styles** de Chrome DevTools
sobre los elementos reales del sitio en vivo, identificando qué reglas CSS
"ganan" la cascada (activas) y cuáles aparecen tachadas (pisadas por otro
snippet, código muerto).

## Flujo de trabajo recomendado para futuros cambios

1. Editar primero en WPCode / el editor de WordPress (ambiente real).
2. Una vez confirmado que funciona en el sitio, copiar el código actualizado
   al archivo correspondiente en este repo.
3. Commit con mensaje descriptivo: `git commit -m "1904: ajusta color hover del nav"`.
4. Actualizar `docs/inventario-maestro.csv` si cambia el estado (activo/inactivo)
   de algún snippet.

