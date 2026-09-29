# Organización nacional e italiana de la Huerta

Petición: singularizar el título, concentrar productos nacionales e italianos y reunir lentejas, garbanzos y alubias como Legumbres. Base main: 062a577 (corrección de la prueba PDF tras la foto 62).

Departamento: Conservas de la Huerta. Sustituye sus ocho familias por dos:
- Huerta Nacional: Tomate Nacional (15 referencias / 7 tarjetas), Verduras Selectas (12), Verduras y Frutas en Conserva (11), Legumbres (9: 2 lentejas, 4 garbanzos y 3 alubias). Total 47 referencias / 39 tarjetas.
- Huerta Italia: Conserva Italiana (8) y Tomate Italia (9). Total 17 referencias / tarjetas.

Se usan los subgrupos existentes de la interfaz, sin añadir niveles de diseño. Los nombres de las antiguas familias y subgrupos se conservan como términos de búsqueda por producto para poder encontrar tomates nacionales y legumbres después de agrupar. Se mantienen 1.001 referencias y 993 tarjetas globales; familias 79 → 73. Fotografías, formatos, unidades y demás datos de producto intactos. No se modifica el mapa histórico de IDs: la selección guardada por referencia se resuelve en las nuevas posiciones.

Archivos: catalog-data.js, clave de icono del departamento en catalog.js, versiones de ambos scripts en ambos HTML, pruebas y documentación. Sin cambios de CSS, tamaños, colores ni disposición general.

Validación: comparación de las 1.001 referencias preserva todos los campos salvo subgrupo y texto de búsqueda de los 64 productos afectados. npm ci y npm test: 17 pruebas, incluidos búsqueda Legumbres (9), Tomate Nacional (7 tarjetas), Huerta Italia (17), conservación de formatos y exportación PDF. Helper de pruebas localiza Huerta Nacional por título en lugar de una posición fija. 718 productos con foto y 851 imágenes verificadas. git diff --check.

Chromium local, ambas rutas: 320, 390, 430 vertical; 844×390 horizontal y 1366×900; tres vistas en cada tamaño, capturas y ausencia de desbordamiento horizontal. No pruebas en dispositivos físicos. Publicar sin force tras verificar main; comprobar despliegue y archivos públicos.
