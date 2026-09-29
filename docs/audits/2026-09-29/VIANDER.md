# Viander: fotografías e información oficial

Petición: buscar en https://www.viander.it/en/ y en PDF si hace falta. Base publicada: 472b121db2f394f087771387daa0dc2f1b829388. Importación de contenido, sin cambios de diseño, clasificación, nombres ni formatos GMA.

Se revisan las fichas oficiales italianas y el catálogo general 2026, PDF de 126 páginas. Las páginas PDF 20, 42 y 50 se contrastan visualmente para las cuatro fotos pendientes: 5669 tomates cherry rojos semisecos (18453), 5670 amarillos semisecos (18452), 5677 crema de cuatro quesos (15019, formato 1/1) y 1617 aceitunas negras al horno (08020, 1,5 kg). Fotografías descargadas directamente del fabricante y convertidas a WebP, completas y con transparencia, sin recortes ni generación de producto. Fuentes en data/viander-images.json.

Se documentan 22 referencias mediante hechos en español: 1148, 513, 980, 623, 516, 461, 608, 3719, 1617, 700, 736, 5670, 5669, 708, 747, 5677, 1430, 853, 313, 059, 689 y 448. Fuentes individuales en data/viander-info.json. No se presentan descripciones comerciales como listas completas de ingredientes ni se deducen alérgenos. No se importan precios ni enlaces públicos al fabricante.

Límites: para 853 el fabricante ofrece actualmente 8 × 140 g y GMA indica 1 kg; solo se incorpora la identidad del preparado, sin dosis, rendimientos ni cambios de foto/formato. Para 689 la página distingue formato de tarro 580 y peso neto 500 g; se conserva el título GMA y no se incorpora ese peso contradictorio. Para 1148 no se atribuye una calidad concreta porque hay dos versiones oficiales de 450 g. Los demás tamaños que no están expresamente confirmados no se completan por inferencia.

Logo oficial descargado y comparado byte a byte con images/brands/originals/viander.png: idéntico. Se conserva el logo vigente. Las 22 referencias Viander tienen fotografía; no quedan fotos pendientes de esta marca.

Archivos: cuatro WebP, manifiesto de imágenes, dos JSON Viander, generador y salida de fichas, ambos HTML únicamente para versionar product-specs.js, y este registro. Resultado: 1.001 referencias, 722 con fotografía, 279 sin fotografía, 855 archivos de imagen y 238 fichas documentadas. Se mantienen las 993 tarjetas y las agrupaciones existentes.

Validación: npm ci y npm test (17 pruebas superadas); validadores de catálogo e imágenes correctos y git diff --check limpio. Chromium en / y /nuevo/, 390 × 844 y 844 × 390: búsqueda exacta de las cuatro referencias, imágenes decodificadas, apertura/cierre de ficha, datos Viander presentes y fuentes ocultas; sin errores JavaScript ni desbordamiento horizontal. Capturas revisadas en ambas rutas y orientaciones. No se ha probado en dispositivos físicos. Antes de dar por finalizado: verificar CI, despliegue y correspondencia de archivos públicos.
