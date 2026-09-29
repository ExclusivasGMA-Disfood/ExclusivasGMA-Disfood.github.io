# Refinado sutil de Novedades y Selección GMA

Petición: reducir la sensación de tarjetas alargadas, con un cambio discreto; revisar gramática, mayúsculas, acentos, unidades G/KG y títulos cortados en los dos carruseles. Base publicada 8778782. Esta petición autoriza ajustar la geometría de esos carruseles.

Las tarjetas pasan a 132 px de ancho (120 px hasta 350 px de pantalla). El marco fotográfico vertical pasa de cuadrado a proporción 1,16; en escritorio/horizontal 1,6. Se reducen ligeramente el espacio interior y la fila de referencia. Fotografías completas, centradas con el margen previo; no se recortan ni modifican. Botón + arriba a la derecha en todas las anchuras para no invadir nombres al compactar la fila inferior. No cambian colores, tipografía, cabecera, familias ni tarjetas del listado general.

Se revisan manualmente los nombres de los 14 destacados: escritura de frase, acentos, conectores y unidades según el criterio editorial pedido (G, KG, ML). Se conserva toda la información de formato y fabricante en el nombre completo de ficha. Campo discoveryName específico para títulos breves del carrusel; por ejemplo «Gilda de anchoa del Cantábrico». Los nombres completos siguen en etiquetas accesibles y fichas. Los términos de búsqueda previos se conservan y se añaden los nuevos. No se afirma que se haya realizado una revisión lingüística de los 999 productos: esta tanda comprende el contenido de los dos carruseles solicitados.

Validación: npm ci y npm test, 17 pruebas. Chromium en ambas rutas a 320, 390, 430 px, horizontal 844×390 y escritorio 1366×900; las 14 etiquetas caben en dos líneas sin truncamiento en las diez combinaciones. Sin desbordamiento horizontal de la página; conmutación de las tres vistas móviles. Revisión visual de capturas y corrección del solapamiento del botón en escritorio. Sin pruebas físicas de Safari/iPhone. Datos: 999 referencias, 991 tarjetas globales; fotos y fichas técnicas no se alteran.

Archivos: data/catalog-data.js, assets/discovery.js, assets/catalog-components.css, versiones de esos recursos en ambas páginas, estado y este registro. Verificar despliegue y archivos públicos al finalizar.
