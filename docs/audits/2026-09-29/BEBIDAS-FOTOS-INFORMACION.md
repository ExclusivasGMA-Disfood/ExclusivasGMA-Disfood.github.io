# Fotos e información de bebidas — 29 de septiembre de 2026

Petición: continuar la última tanda de marcas; buscar y subir fotografías e información, sin cambios de diseño.

Base: main, 0dd01bcf6f7961b1438e3cda9d2f3ee9f65af1e5. La tanda anterior de 14 fotos ya estaba incorporada; no se duplica. El logo de Avance permanece retirado.

## Cambios

- Ocho nuevas fotos principales: 54, 5849, 5850, 6608, 6718, 6748, 6781 y 6782.
- Diecisiete fichas documentadas: 54, 3184, 3189, 3210, 3211, 4810, 5268, 5269, 5849, 5850, 5929, 6093, 6608, 6718, 6748, 6781 y 6782.
- Archivos WebP separados y manifiesto JSON. Reducción proporcional, sin recorte ni retoque del producto.
- Procedencia y pendientes en data/italian-beverages-images.json. Información en data/italian-beverages-info.json, incorporada al generador existente de product-specs.js.
- No cambian HTML, CSS, componentes, nombres de producto, clasificación, logos, selecciones, precios ni comportamiento de navegación.

## Decisiones de calidad

Las fotografías ofrecidas para Montalto Chardonnay y Vermentino son visualmente idénticas y no identifican la variedad: se excluyen ambas. Se incorpora únicamente información básica contrastada, sin añada ni graduación variable. También siguen pendientes de imagen inequívoca Lamuria 6682, Mecenas 2410, V-Enology Primitivo 6297 y Louis Perdrier Rosé estuchado 6219.

La ficha comercial de La Piuma Pinot Grigio 6781 contiene texto de Echo Falls y mezcla DOC/IGT: se descartan esos textos. La foto permite comprobar La Piuma, Pinot Grigio y Delle Venezie DOC. No se publican ingredientes inferidos ni enlaces visibles a fabricantes.

## Verificación

- npm ci y npm test: 12 pruebas superadas; 832 archivos de imagen válidos.
- 1.001 referencias: 698 con foto y 303 sin foto; 150 fichas documentadas.
- Las ocho fotografías se inspeccionaron visualmente antes de incorporarlas.
- Comparación contra la base: HTML, CSS y lógica de interfaz intactos.
- No se ha probado en iPhone físico.
- La revisión en navegador real no pudo ejecutarse: Chromium no estaba instalado y su descarga devolvió un archivo inválido. Las comprobaciones de ambas rutas se realizaron con los tests de DOM existentes; no equivalen a revisión visual en navegador.
