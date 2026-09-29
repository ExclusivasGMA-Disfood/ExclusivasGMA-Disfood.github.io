# Retirada de dos referencias de queso

Petición explícita mediante capturas: retirar mozzarella rallada 70/30 Disfood, ref. 6703, y queso cheddar rojo rallado, ref. 6754, porque ya no forman parte del catálogo. Base publicada 821495f.

Se eliminan ambos registros de data/catalog-data.js y data/references.json. No tenían fotos ni fichas contrastadas. Se mantiene el mapa histórico de IDs para que antiguas selecciones no se reasignen a otro artículo; la recuperación por referencia ignora los productos retirados. No se modifica diseño, clasificación ni datos de otros productos. Se versiona catalog-data.js en las dos rutas y se ajustan las expectativas de recuento de las pruebas existentes.

Resultado: 999 referencias y 991 tarjetas, 722 referencias con foto y 238 fichas documentadas. Comparación estructural confirma que el resto de los datos no cambia.

Validación: npm ci y npm test, 17 pruebas superadas; git diff --check limpio. Chromium en / y /nuevo/, 390×844 y 844×390: búsquedas 6703 y 6754 sin resultados, referencias vecinas 6739 y 5250 presentes. Capturas revisadas en vertical principal y horizontal alternativa. Sin pruebas en dispositivos físicos. Verificar CI, despliegue y archivos públicos al finalizar.
