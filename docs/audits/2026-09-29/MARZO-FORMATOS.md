# Piloto: formatos de tomate Marzo en una tarjeta

Petición: reducir el scroll agrupando exclusivamente los tomates Marzo que son el mismo producto en distintos formatos y permitir elegirlos dentro de la ficha. Base publicada: a49aeba (main tras Selec Mardis).

Mapa explícito en data/product-formats.js: frito (1989, 1988, 1900); triturado (1996, 1997, 5265); entero (2455, 2454, 2033, 6037). Diez tarjetas pasan a tres en la navegación normal. La mermelada 5827 y todas las demás marcas/productos siguen independientes. Se conservan las 1.001 referencias originales, imágenes, fichas, formatos y unidades. El catálogo completo pasa a mostrar 994 tarjetas, con 1.001 referencias elegibles.

Las tarjetas se agrupan después de aplicar la búsqueda y los filtros. Una búsqueda por referencia conserva como representante el formato encontrado. Cuando hay varios formatos coincidentes se prefiere uno con foto, sin utilizar un formato que no coincida con el filtro. Cada tarjeta muestra el nombre común y el número de formatos. El botón + y la fotografía abren la ficha para elegir el formato.

La ficha incorpora un selector etiquetado, con formato y referencia. Al cambiar, se actualizan foto, título, referencia, datos y botones de selección/compartir. Los formatos se seleccionan y guardan por separado; se pueden añadir varios. La revisión de seleccionados y los PDF conservan cada referencia y su cantidad. La navegación anterior/siguiente mantiene la posición del producto agrupado después de cambiar de formato. Ningún dato comercial se fusiona ni se borra.

Archivos: mapa del piloto, catalog.js, desktop.js, estilos acotados al selector, ambos HTML con versiones nuevas de recursos y pruebas. Sin cambios a imágenes, fuentes, colores generales, cabecera, dimensiones de tarjetas ni selección editorial.

Validación: npm ci y npm test, 14 pruebas superadas. Las nuevas pruebas comprueban agrupación, apertura del selector desde +, selección de dos formatos, búsqueda exacta 1988, revisión individual, persistencia por referencia y PDF real con 1988/1989 sin incluir 1900. Se actualizan los conteos de tarjetas esperados a 994; el control de datos mantiene 1.001 referencias. git diff --check sin errores.

Revisión en Chromium headless local en ambas rutas: 320, 390 y 430 px vertical; 844 × 390 horizontal; 1366 × 900 escritorio. Selector visible y dentro del viewport, cambio a 1988 correcto, sin errores JavaScript en el recorrido ni desbordamiento horizontal. Revisadas las tres vistas en cada tamaño (Lista/Carrusel/Visual en móvil, Cuadrícula/Lista/Visual en escritorio y horizontal), y capturas de ficha. La fotografía móvil abre el selector. No se han realizado pruebas en dispositivos físicos. La descarga de Playwright falló; se utilizó Chromium 153 obtenido mediante el paquete npm @sparticuz/chromium, solo en /tmp, sin añadir dependencias al proyecto.

Publicación: verificar main antes de actualizar sin force, despliegue y archivos públicos después.
