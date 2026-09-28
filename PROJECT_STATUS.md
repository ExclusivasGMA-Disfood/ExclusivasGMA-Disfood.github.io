# Estado y continuidad del catálogo GMA

## Identidad y alcance

- Catálogo oficial: `/`. Presentación alternativa: `/nuevo/` (sin indexación).
- 1.001 referencias; 17 departamentos y 79 familias. No publicar precios.
- Geist para interfaz y lectura; Merriweather para títulos editoriales.
- Referencia estética anterior a Crego: `82f3ca8d013bbd444bdb13b8c89641194098f933`.
- Mantener encabezado, colores y organización; no mezclar una importación de proveedor con un rediseño.
- Fotografías como archivos en `images/products/`, relacionadas mediante `data/images-manifest.json`. Nunca imágenes de producto incrustadas en Base64.
- No mostrar enlaces de fabricantes en las fichas. Mantener fuentes internamente y no inventar ingredientes.

## Corrección de la auditoría de septiembre

Ver `docs/audits/2026-09-28/CORRECCIONES.md` y `AUDITORIA.md`.

La lógica funcional de las dos páginas está en `assets/*.js`. Los temas conservan sus estilos y comparten `assets/catalog-components.css` para geometría y accesibilidad. Los scripts se cargan en orden como scripts clásicos: no cambiar indiscriminadamente a async o módulos.

El catálogo de escritorio/horizontal muestra todo el resultado y carga lotes progresivamente. Seleccionar una familia delimita el recorrido; desplegar vuelve al resultado global respetando filtros explícitos. Anterior/siguiente en una ficha usa el conjunto desde el que se abrió.

## Antes de publicar

1. `npm ci && npm test`.
2. Comprobar las dos rutas en vertical y horizontal; imágenes completas, títulos sin invasión, referencia visible y botones de desplegar/recoger.
3. Probar foco y cierre de paneles, selección y recarga, búsqueda, galería y PDF.
4. Verificar el despliegue y los archivos servidos. Registrar la versión y las limitaciones reales; CI verde no sustituye una revisión visual.

No revertir datos o eliminar hechos documentados para lograr una validación verde. Un campo ausente debe tener un estado explícito.
