# Diff — Grupo Header y navegación (1338 / 1339 / 1535 / 1904 / 1906 / 1909 / 1991 / 1992)

Auditoría de código fuente (selectores y especificidad CSS), hecha el 23-09-2026.
A diferencia de `diff-1338-1339.md`, esto **todavía NO está confirmado con Chrome
DevTools** — son candidatos con la hipótesis de especificidad ya calculada, pero
antes de borrar o tocar cualquier línea en WPCode hay que confirmar en el panel
Styles cuál regla aparece tachada, exactamente como se hizo con 1338/1339.

---

## A) Altura de la barra nav al hacer scroll — conflicto de valores

- **1338** (líneas ~89-93) declara, SIN media query (o sea, para todos los anchos):
  `header...scrolled nav.wp-block-navigation { min-height: 28px; max-height: 34px; }`
- **1906** (Fragmento 10, sección 2) declara, SOLO en escritorio (`min-width:1025px`):
  `html body header...scrolled nav.wp-block-navigation { min-height: 42px; max-height: 48px; }`

El selector de 1906 tiene más peso (agrega `html body`), así que en escritorio
gana 1906 (42-48px) y el valor de 1338 (28-34px) queda **sin efecto ahí**. La
regla de 1338 solo sigue viva por debajo de 1025px, donde 1906 no aplica.

**Candidato:** si 42-48px es el valor correcto en escritorio, envolver la regla
de 1338 en `@media (max-width: 1024px)` para que el código refleje lo que
realmente se ve, en vez de dejar un valor que nunca se usa en desktop.
**Confirmar en DevTools:** inspeccionar el nav con scroll activo en escritorio
y ver si 28px/34px aparece tachado.

---

## B) `padding-top` de `.wp-site-blocks` (espacio para el header fijo) — 3 fuentes

| Snippet | Selector | Valor | Rango real donde gana |
|---|---|---|---|
| 1338 | `.wp-site-blocks` / `body.home .wp-site-blocks` | 130px (100px en ≤782px) | Probablemente solo <600px |
| 1909 | `html body.home:not(.scrolled) .wp-site-blocks` | 144px (desktop y tablet 600-1024px, sin scroll) | ≥600px, sin scroll |
| 1909 | `html body.home.scrolled .wp-site-blocks` | 48px desktop / 36px tablet | ≥600px, con scroll |

Los selectores de 1909 tienen más clases (`.home`, `:not(.scrolled)` o
`.scrolled`) que los de 1338, así que ganan en todo el rango ≥600px. El valor
de 1338 (130px / 100px) probablemente solo se ve por debajo de 600px de ancho.

**Candidato:** igual que en A — acotar explícitamente las reglas de 1338 a
`@media (max-width: 599px)` para que el archivo ya no "prometa" un valor que
en la práctica no se usa en tablet/escritorio.
**Confirmar en DevTools:** con la página cargada (sin scroll) en escritorio,
inspeccionar `.wp-site-blocks` y confirmar que el `padding-top` activo es
144px y no 130px.

---

## C) Color del texto en el panel del menú hamburguesa — conflicto real de color

Tres snippets tocan el mismo estado (`.is-menu-open` → texto de los ítems
principales del panel móvil), con **dos valores distintos**:

- **1339** y **1535** (coinciden entre sí): texto `#a22121` en reposo, hover
  fondo `#a22121` / texto `#FFFFFF`.
- **1904** (la nota del propio snippet ya dice "revisar contra 1339"): texto
  `#8c2531` en reposo, hover fondo `#8c2531` / texto `#fdfbef`.

Esto es justo el "guinda original" (`#a22121`, de 1339/1535) contra el "guinda
nuevo" (`#8c2531`, de 1904) que se introdujo para la barra nav de escritorio,
pero que también alcanza al panel móvil sin que quede claro si eso era
intencional.

**No se puede determinar el ganador solo leyendo el código** — las tres reglas
usan cadenas de selectores largas y similares en especificidad. Esto SÍ
necesita confirmarse en DevTools: abre el menú hamburguesa en el celular (o
en el emulador de Chrome), inspecciona el texto de un ítem como "Inicio", y
mira en el panel Styles cuál de los dos colores aparece tachado.

Si el color real en el celular hoy es `#8c2531`, entonces las reglas de color
en 1339 y 1535 para este mismo estado son código muerto y se pueden quitar.
Si es `#a22121`, entonces es 1904 el que no está teniendo efecto ahí (lo cual
sería raro considerando que su propósito es justamente cambiar el color) y
valdría la pena avisar porque podría ser un bug no intencional.

---

## D) Duplicación exacta (mismo valor, sin conflicto) — segura de fusionar

El bloque "Reforzar que TODO lo interactivo del panel móvil reciba el clic"
de **1992** (la mayor parte de sus últimas ~60 líneas) repite, con los mismos
valores exactos, reglas que ya existen en **1339**:

- Chevron en posición absoluta, `top:0; right:0; width:44px; height:100%`
  (idéntico en ambos).
- `padding-right: 48px` en los ítems con submenú (idéntico).
- `position: relative` en el `<li>` padre con hijos (idéntico).

Como los valores son iguales, no hay "ganador ni perdedor" — es simplemente
código repetido dos veces. A diferencia de A, B y C, **esto no necesita
confirmación visual en DevTools** porque no cambia nada verlo desde un solo
snippet o desde dos. Se puede dejar solo una copia (recomendado: mantenerla
en 1339, que es el snippet "dueño" del menú, y quitarla de 1992) sin ningún
riesgo.

---

## Lo que NO se toca (sin conflicto detectado)

1535 (fondo del panel, neutralizar `has-modal-open`), la parte de 1991 sobre
la "caja negra" del submenú desktop/tablet, y las partes de 1992 sobre quitar
el `outline` del navegador y anular el puente invisible de hover en móvil —
no se solapan con nada de este grupo.

---

## Próximo paso sugerido

1. Confirmar A, B y C con el panel Styles de Chrome DevTools (igual método que
   `diff-1338-1339.md`) — idealmente con capturas, como se hizo esa vez.
2. Con eso confirmado, se puede escribir el diff final con las líneas exactas
   a borrar (como el formato de 1338/1339).
3. D se puede aplicar de una vez si quieres, sin esperar confirmación visual.
4. Pendiente aparte: el nuevo snippet **2134 ("Custom")**, agregado a este
   repo recién el 23-09-2026, también toca el header (sección "HEADER — grid
   con San Clemente" y "HEADER — móvil") y no fue cruzado contra este grupo
   todavía. Queda para la siguiente ronda.
