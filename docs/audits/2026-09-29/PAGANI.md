# Pagani Chef — fotos e información

Petición: continuar desde https://paganichef.it con fotos e información, sin cambiar el diseño. Base main: b9d8a147f0491e5a4a2b46c022ee3b392b7a4f9c.

Revisadas las seis gamas públicas y 44 páginas de productos/familias. El catálogo contiene 57 referencias Pagani: 18 ya tenían imagen y 39 no. Se añaden cinco fotos oficiales individuales: 5865 Etniké Teriyaki Classica, 6121 Gustosì L’Arabesque, 6122 La Scozzese, 6595 La Balkanpro y 6609 L’Arrostita. Son fotografías de las botellas identificadas, con cuenco cuando forma parte del original. No se asignan cuencos genéricos ni fotos de varias variantes a referencias individuales. Se conservan completas con conversión proporcional a WebP.

Se incorporan 40 fichas documentadas: 22 Gustosì y 18 de otras gamas. Perfil de sabor, aplicaciones, códigos y dosis cuando constan para la variante exacta. No se presentan descripciones de sabor como lista completa de ingredientes. No se trasladan declaraciones genéricas de ausencia de alérgenos a mezclas concretas, ni afirmaciones saludables de Presal. Teriyaki conserva la indicación de cocinar después de marinar, también para platos que se sirven fríos. Se omiten afirmaciones sobre extensión de vida útil y las dosis dudosas de productos Novit no incorporados. Las descripciones se redactan en español.

Las 34 fotos pendientes y las 17 referencias sin información específica confirmada se registran en data/pagani-images.json. Se consultan además búsquedas de nombres/códigos y medios públicos de WordPress sin localizar nuevas imágenes individuales fiables. No se equipara Pane SG Fine con Panatura SG Fine de 0,5 kg sin confirmar referencia; tampoco se sustituyen Mix Burger, Premix Crocchette, BMeat, aromas, Fast FH, Roxan, Mix Red ni Mix Enco por otras mezclas similares.

El logo oficial ya estaba publicado y se conserva. Fuentes internas por referencia en data/pagani-info.json y data/pagani-images.json. No se publican precios ni enlaces de fabricante visibles.

Archivos: cinco WebP en images/products, dos JSON Pagani, manifiesto de imágenes, generador y salida de product-specs, ambos HTML solo para versionar ese script, y este registro. CSS, navegación, selección, familias, nombres, carruseles y panel de logos intactos.

Validación: inspección de las imágenes originales y comparación con los nombres oficiales; npm ci y npm test: 12 pruebas superadas, 845 imágenes válidas, 1.001 referencias, 711 con foto y 290 sin foto; 199 fichas documentadas. Excluyendo 26 accesorios/mesas/servicios pendientes, quedan 264 alimentos y bebidas sin imagen. No se ha realizado prueba visual en navegador ni dispositivo físico. Verificar despliegue y archivos públicos tras publicar.
