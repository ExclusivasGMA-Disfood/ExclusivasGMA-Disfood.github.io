# Galván — productos y logo

Petición: buscar productos y logo desde https://www.jamonesgalvan.es e incorporarlos al catálogo, conservando el diseño.

Base de trabajo: main a708331da1fde45a714cc1b93608cdd49f57be5c.

Se añaden cuatro fotografías oficiales a referencias que carecían de imagen: 6735 (jamón cebo de campo 50 %), 6736 (jamón cebo 50 %), 6737 (chorizo cular) y 6738 (salchichón cular). WebP con proporciones originales, sin recortes ni retoque generativo. Se selecciona el salchichón envasado individual; no se usan fotos duplicadas ni la imagen conjunta de dos embutidos. Los jamones conservan el fondo original del fabricante.

Las cuatro referencias reciben hechos documentados e ingredientes procedentes de sus fichas técnicas oficiales. No se publican precios ni enlaces de fabricantes en la interfaz. No se incorporan cifras nutricionales: las fichas de jamón contienen inconsistencias entre hidratos y azúcares. Se normaliza la escritura de los ingredientes; en salchichón se conservan los códigos de aditivos sin reproducir las denominaciones erróneas del PDF.

6805 queda pendiente: el catálogo GMA indica lomo de cebo de campo 50 %, media pieza, mientras la web y el PDF identifican lomo de cebo 50 %. No se equiparan ambas categorías.

Se incorpora el logo oficial completo, con transparencia conservada, original y derivado; usa las clases y filtro monocromo existentes. Los dos HTML reciben solamente ese elemento dentro del panel de marcas y la versión de product-specs.js. CSS, navegación, categorías, nombres, carruseles y demás contenido intactos.

Archivos afectados: cuatro WebP en images/products, original y PNG de logo en images/brands, data/galvan-images.json (procedencia y pendiente), data/galvan-info.json, manifiestos de imágenes y marcas, generador y salida product-specs, ambos HTML y este registro.

Verificación: inspección visual de fotografías originales y logo; rutas y dimensiones contrastadas. npm ci y npm test: 12 pruebas; 836 imágenes; 1.001 referencias, 702 con foto y 299 sin foto; 154 fichas documentadas. No se realizó revisión visual en navegador ni dispositivo físico. Verificar despliegue y contenido servido al publicar.
