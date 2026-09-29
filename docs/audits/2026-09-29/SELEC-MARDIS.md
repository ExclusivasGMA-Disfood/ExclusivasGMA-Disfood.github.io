# Selec Mardis: catálogo PDF

Petición: buscar productos en https://www.selecmardis.com y en sus PDF, sin modificar diseño. Base publicada: c192c5f (main tras Le 5 Stagioni).

La portada enlaza el catálogo completo catweb21.pdf (20 páginas) y catálogos por familias. Se revisan además vegetales.pdf (3), pescados.pdf (3) y alimentacion.pdf (4), buscando nombres y comprobando visualmente las páginas pertinentes. Los medios públicos del sitio no aportan fotografías individuales más recientes. El catálogo de Alvarez Catalunya corrobora la denominación alcachofa confitada en medio galón. Fuentes en JSON.

Se añaden tres fotografías extraídas directamente de las imágenes incrustadas, sin retoques ni recortes: 3676 boletus cortado (vegetales, página 3, xref 35), 6004 puntilla sin pluma (pescados, página 2, xref 24) y 5217 alcachofa con tallo en aceite de oliva, tarro (vegetales, página 2, xref 26). Conversión a WebP.

Diferencias de edición/formato: el PDF atribuye 2,5 kg al boletus y 500 g a la puntilla; GMA vende 1 kg y 450 g. Se utilizan exclusivamente las fotografías de presentación del alimento, sin envase ni peso, conservando íntegramente los nombres y formatos GMA. Ambas fichas incluyen una nota de imagen de presentación. La alcachofa se muestra en el tarro de medio galón, correspondiente a la referencia GMA abreviada como 1/2 tarro; no se modifica su título.

Se documentan 11 fichas: 2135, 2374, 2151, 2762, 2665, 5722, 6144, 6636, 3676, 6004, 5217. Solo producto, presentación o conservación expresamente identificados. Sin inventar ingredientes, dosis, alérgenos o vida útil. El PDF contradice el peso de panko entre título (5 kg) y cuerpo/foto (2 kg); no se traslada ese dato. No se publican enlaces del fabricante ni precios.

Logo: descargado el PNG oficial y comparado byte a byte con el original existente; coincide, se conserva. La asociación de marcas contiene 21 referencias de Selec Mardis (incluida 3302 Bacalao Islandia, cuyo nombre no contiene la marca). Antes había 6 sin foto; quedan 3: 5907 capellán, 6787 gilda de pulpo 36 piezas y 3302 bacalao Islandia en tarrina de 1 kg. No se sustituyen por otras variantes del PDF. Dimardis se mantiene fuera de esta importación.

Archivos: tres WebP, manifiesto, dos JSON Selec Mardis, generador y salida de fichas, ambos HTML solo para versionar el script, y este registro. Sin cambios de CSS, navegación, tipografía, logos ni disposición.

Resultado global: 1.001 referencias, 716 con foto, 285 sin foto (259 alimentos/bebidas excluyendo 26 accesorios/mesas/servicios), 850 archivos de imagen y 216 fichas documentadas.

Validación: revisión visual de páginas y de las tres imágenes extraídas, npm ci y npm test: 12 pruebas superadas, catálogo e imágenes válidos; git diff --check sin errores. No se realizó revisión visual en navegador ni dispositivo físico en esta tanda. Verificar despliegue y archivos públicos al terminar.
