# Villani — fotos e información

Petición: continuar la incorporación de fotos e información desde villanisalumi.it, conservando el diseño. Base: main 8f1c8d151ad307bd6081bf455f4ba8866b687bef.

Cuatro nuevas fotos: 478 Mortadella Tartufó (oficial); 709 Crudo Emiliano (distribuidor Hermes, etiqueta identificada); 4343 Salame Milano Export (Hermes, etiqueta Export, sin confundir con Riserva); 019 Salsiccia Napoli Forte 400 g (Alivini, variante individual identificada). Se descarta la imagen oficial conjunta Dolce/Forte para no mostrar una variante distinta. Se conserva 357, que ya tenía foto.

Cinco fichas documentadas: las cuatro anteriores y 720 Parma. Para Parma solo hechos comunes de la denominación y elaboración, sin asignar formato, peso ni meses de curación. Para Emiliano se usan ingredientes y descripción básica de la ficha Villani distribuida por Valco (revisión 2020); no se trasladan dimensiones, meses ni formato de su variante Special. Para Napoli Forte se usa la ficha del fabricante distribuida por Alivini (revisión 2022), incluyendo aromas de humo que no figuran en el resumen comercial del distribuidor. No se inventan ingredientes de las otras referencias ni se publican precios.

Pendientes: foto 720 (Parma: GMA no distingue con hueso, addobbo o special) y 026 (Peperoni 300 g; la web muestra Peperoncino 240 g, equivalencia sin confirmar). No se añaden datos genéricos a 357 al no estar confirmada la variante de mortadela Bologna con pistacho de 5 kg.

El logo SVG oficial descargado coincide byte a byte con el original conservado y ya está en el panel de ambas rutas. No se duplica ni cambia.

Archivos: cuatro WebP en images/products, data/villani-images.json y data/villani-info.json, manifiesto de imágenes, generador y salida product-specs.js, ambos HTML únicamente para actualizar la versión de ese script, y este registro. CSS, nombres, categorías, navegación, carruseles y logos intactos. Imágenes completas, compresión proporcional sin recortes ni generación; procedencia interna en JSON.

Validación: inspección visual de los cuatro originales y comprobación de Napoli sobre blanco; npm ci y npm test: 12 pruebas superadas, 840 imágenes válidas, 1.001 referencias, 706 con foto, 295 sin foto y 159 fichas documentadas. Excluyendo las 26 referencias de menaje/mesas/servicios sin foto, quedan 269 alimentos y bebidas pendientes. No se realizó prueba visual en navegador ni dispositivo físico; comprobar archivos servidos y despliegue al publicar.
