# Gran Bologna: actualización oficial de fotos e información

Petición: actualizar la marca desde https://granbologna.it/#catalog-4535/18/. Base publicada b21781d. Trabajo de contenido, sin cambios de diseño, paleta ni tamaños.

## Fuentes y correspondencias

El visor 4535 apunta al PDF inglés GranBologna_EN.pdf. Se descargan los PDF inglés e italiano enlazados en la web oficial. Catálogo 2026, 104 páginas físicas (numeración impresa desplazada dos páginas). Para edición y contraste se usa GranBologna_IT.pdf; su SHA-256 y las páginas/objetos de imagen se guardan en data/gran-bologna-images.json. La web devolvió inicialmente HTTP 503 con HTML completo; los PDF respondieron 200.

| Ref. GMA | Producto | Página PDF / impresa |
|---|---|---|
| 962 | Allegri Pensieri del Diavolo | 40 / 38 |
| 967 | Dolcevita al tartufungo | 40 / 38 |
| 1347 | Il Cardinale | 20 / 18 |
| 25 | Il Rossini | 15 / 13 |
| 986 | Passioni pere e pecorino di grotta | 45 / 43 |
| 995 | Piaceri ai cinque formaggi | 44 / 42 |
| 2152 | Piaceri al salmone | 44 / 42 |
| 610 | Rosette bolognesi | 72 / 70 |
| 199 | Soffi di Vento | 59 / 57 |
| 604 | I tre amori del mare | 23 / 21 |
| 957 | Garganelli romagnoli | 59 / 57 |
| 2204 | Pappardelle gialle | 55 / 53 |
| 2205 | Spaghetti alla chitarra gialli | 55 / 53 |
| 959 | Tagliatelle verdi | 50 / 48 |
| 2203 | Taglioline al nero di seppia | 53 / 51 |
| 2218 | Taglioline gialle | 52 / 50 |

## Fotografías

16 PNG originales extraídos del PDF con sus máscaras alfa, sin recortes, reconstrucción, ampliación ni base64 en la web. Se conserva la orientación nativa del objeto de imagen, no los giros editoriales de maquetación. Se muestran sobre el blanco existente. Resoluciones de producto de aproximadamente 170–292 px: el PDF limita el detalle; no se simula alta resolución.

Las dos referencias 962 y 604 tenían solo tarjetas SVG de información, ahora tienen foto real. El manifiesto sustituye las galerías antiguas de las 16 referencias por la imagen oficial correspondiente; no se exhiben las tarjetas con información de otra edición. Los antiguos archivos se conservan fuera de la galería activa. En 995 se utiliza la pieza verde completa, evitando la pieza trasera parcialmente oculta de la composición.

## Información

16 fichas documentadas en data/gran-bologna-info.json, integradas con el generador existente. Las 10 entradas anteriores de Gran Bologna se retiran de pasta-rellena-info.json para evitar duplicación y datos contradictorios. Las 7 que antes estaban documentadas se sustituyen; se añaden 9 verificadas: total global 247.

Se traduce descripción, composición destacada de masa/relleno, pesos, formatos, raciones y cocción orientativa. No se presenta la descripción parcial como lista exhaustiva de ingredientes o alérgenos. Se conservan referencias, nombres comerciales GMA, unidades comerciales y clasificación.

Correcciones destacadas frente a la documentación anterior: Rossini indica pato, no oca; Piaceri cinco quesos y Rosette incluyen Edam, no fontina; Passioni pera/pecorino indica 4 minutos en su ficha; Soffi es pasta corta sin relleno. Garganelli se corrige de origen Francés a Italiano y las demás referencias se identifican como italianas, conforme al fabricante y al criterio de catálogo. Soffi permanece en su grupo GMA actual: una reorganización de familias no forma parte de esta petición; su ficha oficial especifica claramente «sin relleno». Los tiempos se toman de las fichas de producto, no de la tabla resumen cuando difieren (Taglioline gialle: 4 minutos).

## Verificación

npm ci y npm test: 21 pruebas; catálogo 999 referencias, 722 referencias con algún recurso visual según el validador (incluye SVG), 846 recursos visuales activos y 247 fichas documentadas. Las 16 fotos originales se decodifican; las páginas asociadas se revisan visualmente. Chromium en ambas rutas, 390×844 y 844×390: búsqueda de los 16 productos (25 mediante «Il Rossini», por tratarse de una referencia de dos cifras), foto exacta, ficha técnica, apertura/cierre, ausencia de enlaces externos visibles y ausencia de desbordamiento/errores JavaScript. Revisión visual de capturas. No probado en iPhone físico. Verificar publicación y recursos públicos antes de confirmar al usuario.
