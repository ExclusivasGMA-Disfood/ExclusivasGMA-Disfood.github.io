# UX: cabecera y navegación horizontal

## Solicitud y alcance

El usuario pide desplegables elegantes sin saltos, seguimiento de la familia al bajar por el catálogo y mejor aprovechamiento del móvil horizontal. Se trabaja sobre `ddbc5a8`, sin restaurar versiones anteriores.

## Cambios

- Buscador como panel superpuesto: su apertura no modifica la altura del documento ni de la cabecera. Las sugerencias quedan ancladas debajo del campo.
- Buscador, Cuenta y Menú comparten tiempos y curva de transición. Solo uno abierto a la vez; Escape devuelve el foco al botón; tocar fuera cierra el panel. Se respeta movimiento reducido.
- Al confirmar búsqueda o abrir una sugerencia se cierra el buscador, dejando espacio a resultados/ficha.
- Seguimiento de lectura: marca y despliega la familia correspondiente en el lateral, desplazando únicamente ese lateral si hace falta; muestra departamento y familia en una franja de contexto. No modifica filtros, selección ni posición de los productos.
- Móvil horizontal entre 640 y 999 px: cabecera de 44 px, navegación inferior de 44 px, tarjetas de cuadrícula con foto lateral de 88 x 104 px. La vista Visual mantiene foto superior de 116 px. Fotos completas y con margen.
- Las dimensiones de tarjetas de móvil vertical y escritorio no cambian. Las mejoras de apertura y seguimiento sí se comparten con la alternativa.

## Archivos

`assets/topbar.js`, `assets/catalog.js`, `assets/desktop.js`, `assets/catalog-components.css`; versionado de recursos en ambas páginas; pruebas y documentación.

## Verificación

- 12 pruebas automáticas superadas: incluye paneles exclusivos, foco y Escape; seguimiento de familia en ambos sentidos sin sustituir ni filtrar productos; selección, galerías y PDF.
- 748 archivos de imagen válidos; 1.001 referencias; 77 fichas documentadas.
- Principal a 320, 390 y 430 px: abrir el buscador conserva altura de cabecera (59 px con borde), posición del contenido y scroll (0 px de variación). Cuenta y Menú exclusivos, apertura/cierre comprobados.
- Móvil horizontal 844 x 390: cabecera 45 px con borde; tarjetas de Lista y Cuadrícula 134 px; Visual 232 px en la muestra. Controles alineados y sin desbordamiento en las tres vistas.
- Desplazamiento real desde Aperitivos / Frutos Secos hasta Conservas de las Huertas / Tomate Nacional: lateral y franja actualizados; 72 productos renderizados conservados; franja fija a 45 px. El seguimiento inverso se cubre además con pruebas automáticas.
- Toque directo en la lupa a scroll 479: conserva scroll 479; sugerencias debajo del campo; confirmar “salmon” cierra el panel y muestra 43 resultados.
- Alternativa a 390 px: buscador sin variación de altura/scroll; Cuenta y Menú comprobados. Escritorio a 1280 px sin desbordamiento y con cabecera de 66 px.
- Captura de la previsualización: `ux-horizontal.jpg`. La previsualización aislada se retira al publicar.

## Límites

Pruebas responsive en Chromium, no en iPhone físico. El teclado de Safari puede desplazar su viewport visual al enfocar un campo; no se bloquea el zoom ni el teclado del usuario.
