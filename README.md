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
- **Resincronizado completo (24-09-2026)**: se detectó que 53 de los 60 snippets
  activos tenían el repo desactualizado frente a lo que está hoy en WPCode — en 28
  casos solo cambiaban los comentarios (limpiados a mano en WPCode para que no
  parecieran generados con ayuda de IA), pero en **15 casos había código realmente
  distinto** (reglas agregadas, quitadas o con valores distintos, editadas
  directo en WPCode sin volver a copiar al repo). Todos los archivos de
  `wpcode/css/`, `wpcode/js/` y `wpcode/php/` quedaron igualados 1:1 contra un
  export fresco de WPCode (Tools → Import/Export). Algunos cambios reales
  notables: 1923 (botón Dona Aquí) ahora usa texto blanco con contorno en vez de
  texto sólido, y agregó soporte para la clase `.btn-hover-invertido` que dispara
  el snippet nuevo 2106 al tocar en móvil; 1947 sumó una regla nueva de
  `transform: translateZ(0)` en el cover de Quiénes Somos; 2046 dejó de estar
  limitado a `@media (max-width:1024px)` y ahora aplica también en escritorio;
  1539 tenía bloques de sombra de texto duplicados que ya no existen en la
  versión activa. Recomendación: a partir de ahora, después de cada cambio en
  WPCode, exportar de nuevo (Tools → Import/Export) en vez de copiar snippet por
  snippet, para que esto no se vuelva a desincronizar.
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


## Formato de los archivos

Los archivos de `wpcode/` están pensados para leerse bien en el editor y en GitHub,
por eso difieren un poco de cómo se guardan dentro de WPCode:

- **`.css` y `.js`**: solo contienen CSS/JS válido, sin etiquetas `<style>` ni `<script>`.
  Si en WPCode el snippet está guardado dentro de `<script>…</script>`, la cabecera del
  archivo lo indica en una línea `Nota:`.
- **`.php`**: la primera línea es `<?php` solo para que el editor y GitHub coloreen el
  código. **No se pega en WPCode** (WPCode ya sabe que es PHP).
- **Snippets con CSS + JS** (ej. `2087`): se separan en dos archivos con el mismo ID y la
  cabecera indica "Parte 1/2" y "Parte 2/2".
- **`1106-menu-submenus.php`**: vive en `wpcode/php/` porque es PHP (`add_action('wp_footer', …)`)
  que imprime un `<script>`.
- La cabecera `/** … */` de cada archivo es solo documentación de este repo (ID, tipo,
  estado, condición); no hace falta copiarla a WPCode.
