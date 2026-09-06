# Rediseño editorial — estado para revisión

## Selección local verificada

| Nombre editorial | ID de WordPress | Estado |
| --- | --- | --- |
| Conde Duque | `cG9zdDo0MjE=` | visible en Campaigns |
| Timberland | `cG9zdDozOQ==` | visible en Campaigns |
| Razer x Retro Super Futurę | `cG9zdDo0NjQ=` | visible en Campaigns |
| Hotel Melia | `cG9zdDo0NTI=` | visible en Campaigns |
| Outlined Against The Sky | sin ID confirmado | reservado, no serializado ni visible |

WIZ y Hold On continúan en WordPress, pero no forman parte de esta selección. No se ha eliminado ni modificado contenido remoto.

## Contenidos de +INFO

- Conde Duque: descripción y equipo transcritos de la página 5 del mockup. Conviene confirmar la grafía final de nombres propios antes de publicar.
- Timberland: sin descripción confirmada; se muestran únicamente los créditos breves existentes en WordPress. No se reutiliza el texto erróneo de Outlined incluido en el mockup.
- Razer y Hotel Melia: sin descripción o equipo completo confirmado; se muestran únicamente sus créditos breves existentes.
- Outlined Against The Sky: pendiente de proyecto, medios y datos reales.

## Conexión pendiente del CMS

Crear en WordPress la taxonomía `Tipo de proyecto` con `Short` y `Campaigns`, y exponerla en WPGraphQL. Añadir solo los campos necesarios para descripción y equipo/créditos estructurados. Después se podrá reemplazar `data/portfolio-config.mjs` sin cambiar los componentes de presentación.

Esta rama es exclusivamente local. No se ha hecho deploy, push ni modificación de WordPress de producción.

## Segunda revisión visual

- Preview única y persistente en desktop/tablet, con póster durante el cambio de vídeo y posición estable.
- Preview eliminada del layout móvil; las imágenes continúan abriendo el reproductor global.
- Fade blanco sutil recuperado entre proyectos, con alternativa sin movimiento.
- Composición de Home elevada ligeramente sin cambiar relaciones ni selección de imágenes.
- Flecha de continuidad sustituida por un trazo SVG más fino con área interactiva accesible.
- About ajustado a 13 px y Daily reducido conservando sus 20 imágenes y su orden.
