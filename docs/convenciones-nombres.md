# Convenciones de nombres y organización

## Snippets de WPCode (`wpcode/`)

Formato de archivo: `{ID}-{nombre-slug}.{ext}`

- **ID**: el número de `snippet_id` en la URL de WPCode. Nunca cambia, es la
  referencia definitiva entre este repo y el plugin.
- **nombre-slug**: el nombre del snippet en WPCode, en minúsculas, sin tildes,
  espacios reemplazados por guiones.
- **extensión**: según el tipo de código —
  - `.php` → snippets PHP (incluso si generan HTML de salida)
  - `.css` → snippets CSS
  - `.js` → snippets JS
  - Si un snippet mezcla CSS y JS en el mismo bloque, se separa en dos archivos
    con el mismo ID (uno `.css`, otro `.js`), indicando en el comentario superior
    que son "parte 1/2" y "parte 2/2" del mismo snippet original.

Carpeta `wpcode/inactivos/`: snippets que están desactivados (toggle OFF) en el
panel de WPCode. No se borran del repo — se archivan aquí como referencia
histórica, por si se necesita reactivar algo en el futuro.

## Bloques de HTML personalizado (`custom-html-blocks/`)

Estos NO viven en WPCode — son bloques "HTML personalizado" insertados
directamente en páginas/entradas vía el editor de Gutenberg.

Formato de archivo: `{slug-de-la-pagina}-{descripcion-breve}.html`

Ejemplo: `dona-ahora-widget-donacion.html`, `home-banner-whatsapp.html`

Cada archivo debe empezar con un comentario HTML indicando:
```html
<!--
  Página: [nombre de la página donde vive este bloque]
  URL: [URL completa de la página]
  Bloque: [posición aproximada en la página, ej. "después del hero, antes de Nuestra Historia"]
-->
```

Esto es importante porque, a diferencia de WPCode (que tiene ID único y panel
central), los bloques HTML personalizados viven dispersos en distintas páginas
y no hay un lugar central donde verlos todos listados — por eso la referencia
a la página y ubicación es la única forma de encontrarlos de vuelta.

## Reglas generales

- Nunca borrar un archivo de este repo sin antes moverlo a una carpeta
  `_archivo/` o confirmarlo con un commit separado indicando por qué se elimina.
- El CSV `docs/inventario-maestro.csv` es la fuente de verdad del estado
  (activo/inactivo) — mantenerlo actualizado cada vez que cambie algo en WPCode.
