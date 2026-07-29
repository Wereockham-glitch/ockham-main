# Arquitectura de la Home

Este documento describe la arquitectura vigente de la página Home de OCKHAM. Es una referencia de mantenimiento: antes de cambiar el scroll, el portfolio, el thumbnail o el reproductor fullscreen, leer este documento y revisar los componentes enlazados.

## 1. Objetivo

La Home presenta el portfolio de OCKHAM como una secuencia vertical de proyectos, con una miniatura fija del proyecto activo y la posibilidad de abrir su vídeo completo.

La experiencia debe poder continuar al final del portfolio sin que la persona usuaria llegue a un final físico. Para conseguirlo, la Home renderiza dos ciclos idénticos del portfolio y reajusta la posición de scroll al llegar al final del segundo. El reajuste conserva el desplazamiento relativo dentro del ciclo, de modo que la transición visual resulta continua.

El loop no persigue cargar más datos ni virtualizar contenido: trabaja con las mismas entradas de portfolio ya disponibles en la página.

## 2. Arquitectura

La jerarquía relevante es la siguiente:

```text
App (_app.jsx)
└── Layout
    └── Scroller                         ← dueño del scroll real
        ├── Header                        ← fijo
        └── Home (index.jsx)
            ├── Cabecera
            ├── InfinitePortfolio
            │   ├── Proyectos (ciclo A)
            │   └── Proyectos (ciclo B)
            ├── Cabecera
            ├── Thumb                     ← único y compartido
            └── Fullscreen                ← único y compartido
```

### Responsabilidades

| Componente | Responsabilidad |
| --- | --- |
| `_app.jsx` | Mantiene el estado global `fullscreen` y `fullscreenUrl`, que debe ser común para toda la Home. |
| `Layout.jsx` | Obtiene la altura del viewport y coloca las páginas dentro de `Scroller`. |
| `Scroller.jsx` | Renderiza `react-custom-scrollbars-2`, escucha su scroll interno y ejecuta el rebase del loop. |
| `Header.jsx` | Navegación fija, renderizada dentro de `Scroller`. |
| `index.jsx` | Compone la Home, centraliza `activeThumb` y `thumbs`, y monta los componentes globales `Thumb` y `Fullscreen` una sola vez. |
| `InfinitePortfolio.jsx` | Renderiza los dos ciclos equivalentes del portfolio y los marca con `data-infinite-cycle`. |
| `Proyectos.jsx` | Renderiza el contenido de un ciclo, crea los datos de thumbnail y observa qué proyecto está visible. No debe montar UI global fija. |
| `Thumb.jsx` | Muestra la miniatura fija del proyecto activo y abre el fullscreen compartido. |
| `Fullscreen.jsx` | Contiene el único `ReactPlayer` fullscreen y la capa de cierre. |

## 3. Sistema de scroll

### El scroll pertenece a `Scroller`

`Scroller` utiliza `react-custom-scrollbars-2`. El elemento que realmente se desplaza es la vista interna de esa librería, no `window` ni el documento. Además, los estilos globales bloquean el overflow del documento (`html`, `body` y `#__next`), por lo que `window.scrollY` no representa la posición de la Home.

Por esta razón, toda lógica de loop debe usar el evento recibido por `Scroller` y medir sobre `event.target`:

- `scrollTop`: posición actual del contenedor interno.
- `scrollHeight`: altura total de su contenido.
- `clientHeight`: altura visible del contenedor.

No usar `window.scrollY`, `window.scrollTo()` ni `document.documentElement.scrollHeight` para el loop de la Home.

### Rebase del scroll

`Scroller` localiza los dos nodos marcados con `data-infinite-cycle`.

1. Mide la altura del primer ciclo: `cycleHeight = firstCycle.offsetHeight`.
2. Calcula el extremo inferior del segundo ciclo.
3. Calcula `loopStart`: el punto en que el final del segundo ciclo entra en el viewport, con un margen de 20 px.
4. Al alcanzar ese punto, asigna:

```js
view.scrollTop = view.scrollTop - cycleHeight;
```

El nuevo valor conserva el mismo offset relativo, pero sitúa la vista en la copia equivalente del primer ciclo. Un `isJumping` temporal evita que el propio cambio programático reentre inmediatamente en el handler.

El loop es deliberadamente de una sola dirección: el rebase actual se ejecuta al bajar hacia el final del segundo ciclo. No añadir un rebase ascendente sin definir primero la semántica de inicio y final del ciclo.

## 4. `InfinitePortfolio`

`InfinitePortfolio` renderiza dos instancias de `Proyectos` con los mismos datos:

```text
Proyectos A → contenido usado para la primera vuelta
Proyectos B → contenido de reserva para cruzar el borde del loop
```

Las dos copias son necesarias porque el navegador necesita contenido real después de la posición visible antes de que pueda producirse el salto. Con un solo ciclo, el scroll alcanzaría físicamente el final antes de poder preservar continuidad.

Los ciclos comparten los setters de `activeThumb`, `thumbs` y `fullscreenUrl`, pero no montan componentes globales. En particular, **no añadir `Thumb`, `Fullscreen`, overlays fijos, cursores globales o reproductores globales dentro de `Proyectos`**. Al duplicar `Proyectos`, esos elementos se duplicarían necesariamente.

## 5. Componentes compartidos

### `Fullscreen` es único

`fullscreen` y `fullscreenUrl` se mantienen en `_app.jsx` y se entregan a Home. `Fullscreen` se monta una única vez en `index.jsx`.

El click de un mosaico, slider o thumbnail comunica la URL mediante `setFullscreenUrl` y activa `setFullscreen`. Así el único `ReactPlayer` recibe la URL elegida y se muestra por encima de la Home.

### `Thumb` es único

Home mantiene `activeThumb` y `thumbs`; cada ciclo de `Proyectos` informa de sus intersecciones mediante los setters compartidos. `Thumb` se monta una sola vez en `index.jsx` y recibe ese estado compartido.

`Thumb` conserva internamente los vídeos de preview ya cargados para evitar recargas al cambiar de proyecto. Solo el vídeo cuyo grupo de IDs contiene `activeThumb` se muestra.

## 6. Problemas encontrados durante el desarrollo

| Incidencia | Síntoma | Causa | Solución aplicada |
| --- | --- | --- | --- |
| Scroll leído desde `window` | El segundo ciclo llegaba al final sin rebobinar de forma fiable. | `Scrollbars` posee un contenedor interno; `window.scrollY` permanece en cero con el overflow global bloqueado. | El loop se movió a `Scroller` y opera con el `scrollTop` del elemento interno. |
| Salto a `0` | El loop volvía al principio en lugar de mantener continuidad. | El reset no preservaba el offset dentro del portfolio. | Se calcula `cycleHeight` y se resta esa altura a `scrollTop`. |
| Fullscreen duplicado | Aparecía “JUST A SEC.”, pero el vídeo no era visible. | Cada copia de `Proyectos` montaba una capa fija `Fullscreen`; la segunda, sin URL, cubría al reproductor válido de la primera. | `Fullscreen` y `fullscreenUrl` se centralizaron fuera de `Proyectos`. |
| Thumb duplicado | Tras el primer rebase se solapaban textos y previews de “WATCH FULL PROJECT”. | Cada copia de `Proyectos` montaba un `Thumb` fijo con estado independiente. | `Thumb`, `activeThumb` y `thumbs` se centralizaron en Home. |
| IDs de proyecto duplicados | Dos ciclos contienen elementos con IDs como `st-0`, `st-1`, etc. | Los ciclos renderizan el mismo listado dos veces. | Limitación vigente: el estado de thumbnail usa esos IDs de forma equivalente en ambos ciclos. Si se añade lógica que consulte el DOM por ID, usar identificadores únicos por ciclo o atributos `data-*`. |
| Selección de intersección no determinista | En cambios rápidos de scroll puede elegirse una entrada no ideal. | `handleIntersect` utiliza el primer elemento del lote de entradas del observer. | Limitación vigente; no se modificó para mantener el comportamiento. Ver mejoras futuras. |

## 7. Decisiones de arquitectura

### Mantener `react-custom-scrollbars-2`

La Home ya está construida sobre `Scrollbars` y su viewport interno es el contrato de scroll actual. El loop está integrado con ese contrato. Sustituirlo implicaría revalidar scroll, observer, altura móvil, interacción y capas fijas.

### No migrar a Lenis

Lenis está disponible como dependencia, pero no se usa para la Home. Añadir otra abstracción de scroll no resuelve el loop y crearía dos fuentes potenciales de verdad para la posición de desplazamiento. Mientras `Scroller` sea el propietario, Lenis no debe introducirse para este caso.

### Mantener dos ciclos

Dos ciclos son la solución mínima para demostrar continuidad al bajar: hay un ciclo visible y otro disponible después de él. No se introdujeron tres ciclos ni virtualización porque cambiarían el alcance, el coste de render y la semántica actual del loop.

### Centralizar estado y UI compartida

`fullscreen`, `fullscreenUrl`, `activeThumb` y `thumbs` describen la interfaz global de la Home, no un ciclo individual. Centralizarlos evita capas fijas superpuestas y asegura que los dos ciclos comuniquen la misma selección visual.

## 8. Reglas para futuras modificaciones

- No introducir una segunda instancia de `Thumb` en `Proyectos`, `InfinitePortfolio` o cualquier ciclo.
- No introducir una segunda instancia de `Fullscreen` dentro de `Proyectos`.
- No usar `window.scrollY`, `window.scrollTo()` ni altura de documento para el loop.
- Mantener el scroll del loop controlado exclusivamente desde `Scroller`.
- No cambiar `cycleHeight` por una constante: debe medirse desde el primer ciclo real.
- Mantener `data-infinite-cycle` en exactamente los dos wrappers de ciclo mientras `Scroller` los use para medir.
- Cualquier componente visual fijo o global debe montarse una vez en Home o en una capa superior apropiada.
- Si se crean nuevos estados que representan selección global, centralizarlos en Home o `_app.jsx`; no duplicarlos dentro de cada `Proyectos`.
- Antes de cambiar `Proyectos`, comprobar qué ocurrirá al renderizarlo dos veces.
- Si se cambian los IDs de proyecto, actualizar también la asociación entre `activeThumb` y `thumbs`.

## 9. Posibles mejoras futuras

Estas mejoras no forman parte de la arquitectura actual y deben evaluarse por separado.

- **Virtualización de proyectos:** reducir el número de nodos, imágenes y vídeos montados si el portfolio crece significativamente. Debe ser compatible con la medición estable de `cycleHeight`.
- **Optimización de imágenes:** revisar prioridades de `next/image`, tamaños servidos y calidad para evitar que ambos ciclos dupliquen trabajo de red y decodificación.
- **Optimización de vídeos:** cargar previews bajo demanda, pausar los que quedan fuera de vista y limitar el número de vídeos precargados por `Thumb`.
- **IntersectionObserver más preciso:** seleccionar la entrada con mayor ratio de intersección o más cercana al centro del viewport, en lugar de usar la primera entrada del lote; añadir limpieza con `disconnect()` al desmontar.
- **IDs de ciclo explícitos:** usar `data-project-id` y `data-cycle` para eliminar la ambigüedad de IDs duplicados sin romper la asociación de thumbnails.
- **Accesibilidad:** añadir foco gestionado al abrir fullscreen, cierre con Escape, etiquetas accesibles y controles de teclado para el reproductor y el thumbnail arrastrable.
- **Rendimiento y observabilidad:** medir el coste del doble render, el número de callbacks del observer y la estabilidad del rebase en dispositivos móviles; añadir pruebas de regresión para el loop, el thumbnail y fullscreen.
- **Loop bidireccional:** solo si se define un comportamiento claro al subir más allá del inicio, añadir un rebase simétrico con pruebas visuales.
