# Pagani Chef: búsqueda en catálogos PDF

Petición: buscar las fotografías pendientes en el catálogo PDF, manteniendo el diseño. Base publicada: e300ba4 (main, importación anterior de Pagani).

Localizados y descargados desde los enlaces públicos de United Chef: Brochure 2022 (45 páginas PDF), Brochure 2019 (115), Product Catalogue (79), Fish Sector (32), presentación, catálogo USA, gama vegetal y piezas enteras. Búsqueda de los nombres/códigos pendientes en el texto y revisión visual de las páginas relevantes de productos. Los recetarios contienen principalmente preparaciones terminadas y fotografías compartidas por gamas; el Product Catalogue presenta tablas técnicas. No se afirma revisión visual exhaustiva de cada página de todos los documentos.

El enlace genérico de descargas de Fratelli Pagani entrega solo COPERTINA.pdf (una portada). Carns Milà ofrece envío del catálogo mediante formulario; no se ha enviado ningún mensaje ni solicitud.

Se localiza además el folleto oficial Nuove-panature-SG-Pagani-Chef_2023.pdf: una página con cinco fotografías individualmente rotuladas. Se incorpora la fotografía de Panatura SG Giappo 71075 a la referencia GMA 6596. Extracción del área 80,518–173,610 puntos a resolución del original, con el círculo completo y su fondo impreso; conversión WebP, sin inventar envase ni retocar el alimento. Fuentes y coordenadas en data/pagani-images.json.

Se añaden tres fichas: 5874 Mix Burger 66018 y 5875 Premix Crocchette 65005 (Product Catalogue, página PDF 62, páginas impresas 122–123); 6418 Fast FH 67002 (Fish Sector, página PDF 9, impresa 6). Se incorporan descripción, aspecto, función o aplicación documentados. No se trasladan dosis, formatos, certificaciones ni declaraciones de conservación de ediciones antiguas al producto actual. Roxan sin sufijo sigue pendiente, al no poder distinguir B, C o Bomb. Fuentes internas, sin enlaces visibles ni precios.

Resultado: Pagani 24 referencias con imagen y 33 sin foto. 43 fichas Pagani documentadas y 14 pendientes de información específica. Catálogo general: 1.001 referencias, 712 con foto, 289 sin foto (263 alimentos/bebidas al excluir los 26 accesorios/mesas/servicios), 846 archivos de imagen y 202 fichas documentadas.

Archivos: una WebP, manifiesto, JSON de imágenes e información Pagani, salida product-specs.js, ambos HTML únicamente para actualizar versión del script y este registro. No se modifica CSS, logo, disposición, navegación ni selección de productos.

Validación: imagen extraída inspeccionada junto al folleto; tablas de identificación revisadas visualmente. npm ci y npm test: 12 pruebas superadas, catálogo y 846 imágenes válidos. No se han realizado pruebas visuales en navegador ni dispositivos físicos en esta tanda; las pruebas de DOM no las sustituyen. Tras publicar se comprobarán despliegue y archivos públicos.
