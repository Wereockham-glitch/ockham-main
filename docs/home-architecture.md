# Arquitectura de la Home

Estado revisado el 6 de septiembre de 2026. Este documento describe la Home editorial vigente en la rama local de revisión.

## Flujo principal

```text
App
├── PortfolioProvider                 categoría SHORT / CAMPAIGNS
└── Layout
    └── Scroller                      propietario del scroll real
        ├── Header                    navegación y filtros fijos
        └── Home
            ├── InfinitePortfolio
            │   └── ProjectScene      composición por proyecto
            ├── Thumb                 preview global única
            └── Fullscreen            reproductor global único y +INFO
```

La selección llega normalizada desde `getStaticProps`. `lib/portfolio.mjs` solo admite IDs configurados, publicados, no restringidos y con imagen principal. La configuración editorial temporal vive en `data/portfolio-config.mjs`; el registro reservado de Outlined Against The Sky no se serializa al navegador.

## Scroll y continuidad

El scroll pertenece a la vista interna de `react-custom-scrollbars-2`, no a `window`. Toda navegación mide y modifica `.home-scroll-viewport`.

- Desktop renderiza dos ciclos completos. `Scroller` mide la altura real del primero y resta esa altura cuando comienza la segunda copia.
- Móvil renderiza una lista completa, una copia puente del primer proyecto y un espaciador de un viewport. `InfinitePortfolio` mide el ciclo real y hace el rebase al entrar en el puente.
- El cambio de filtro vuelve al inicio y recalcula el listado activo.
- `Thumb` y `Fullscreen` se montan una sola vez fuera de los ciclos. `Thumb` solo se muestra en desktop y tablet; móvil abre el reproductor desde las imágenes del proyecto.
- Al abrir el reproductor se bloquea el scroll de fondo. Al cerrar se restaura la posición y el foco de origen.

No usar `window.scrollY`, no fijar alturas de ciclo y no colocar overlays globales dentro de `ProjectScene` o `Proyectos`.

## Composición y medios

`ProjectScene` usa ajustes por proyecto para la pieza principal, tres stills desktop y una preview flotante persistente. En móvil usa una composición propia de siete stills y una pieza principal al 70 %, sin preview flotante. Los vídeos de las escenas pausadas no reproducen; las imágenes siguen disponibles como fallback.

El cambio de proyecto actualiza el contenido de la única preview sin desmontar su contenedor ni alterar su posición arrastrada. El póster permanece debajo del vídeo durante la carga para evitar parpadeos. Un velo blanco dependiente de la distancia al centro del viewport recupera el fade entre escenas y se desactiva con `prefers-reduced-motion`.

La flecha de cada escena desplaza el contenedor real al siguiente proyecto. Los botones de still, pieza principal y preview abren el mismo reproductor mediante el objeto del proyecto, conservando ID, vídeo, descripción y equipo juntos.

## Integración futura con WordPress

La configuración local debe sustituirse cuando exista la taxonomía `Tipo de proyecto`, con términos `Short` y `Campaigns`, expuesta en GraphQL. Para +INFO se necesitan dos valores administrables por proyecto: descripción y equipo/créditos estructurados. Hasta verificar esos campos, no se debe ampliar la consulta ni retirar el mapeo local.

About y Daily conservan sus rutas, contenidos y orden. About comparte la escala tipográfica reducida de Home y Daily reduce moderadamente las imágenes manteniendo su composición. Los estilos editoriales están encapsulados bajo clases `editorial-*`.
