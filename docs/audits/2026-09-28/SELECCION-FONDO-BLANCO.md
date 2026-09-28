# Selección editorial sobre fondo blanco

Base: 8661e34. Petición: elegir productos con fondo blanco, apetecibles, para una selección más cuidada.

Top, en orden: jamón Montesano 1902; gildas 6140; lasaña 3842; anchoas 4599; tarta de chocolate 6767; parmesano 049; jamón Díaz 802; harina Caputo 6256. Se alternan familias y se separan los jamones. Las gildas se conservan a tamaño de tarjeta porque su imagen tiene solo 212 × 240 px.

Novedades: almendras 6744; ravioli de butifarra 3816; salmón 6777; aceite 6786; canelón 6765; cocktail 6742. Las seis están marcadas como novedades en el catálogo. No se añaden fechas de alta inventadas.

Se priorizan producto visible y fondos blancos o transparentes sobre blanco. Se descartan escenas decorativas, placeholders y referencias sin foto. Los 1001 productos continúan disponibles en el catálogo. No se altera el manifiesto ni las fuentes fotográficas. Se reemplazan los encuadres cover del piloto por contain con margen 8 % y límites revisados en JSON. El estilo solo afecta a las fotos de los dos carruseles; dimensiones, cabecera, controles y otras vistas permanecen iguales.

Archivos: data/catalog-data.js, data/image-framing.json, assets/discovery.js, assets/image-framing.js; versiones de recursos en index.html y nuevo/index.html. scripts/check-catalog.mjs actualiza los tamaños esperados de selección y exige foto y marca isNew para las novedades.

Verificación: inspección visual de las 14 fuentes; suite funcional y validación de imágenes antes de publicar. Revisión de la página publicada al terminar. No se afirma prueba física en iPhone.

Resultado: publicación 78a86b1 desplegada correctamente. 12/12 pruebas funcionales; 748 imágenes válidas. Comprobación en producción de 6 novedades, 8 Top y carga correcta de las 14 fotos. Captura de escritorio: seleccion-blanco-publicada.jpg. No se repitió la prueba responsive en esta sesión; no se cambiaron dimensiones ni puntos de ruptura.

## Sustitución solicitada de frutos secos

Se sustituyen exclusivamente en Novedades la almendra 6744 por gilda triple de boquerón 6154 y el cocktail 6742 por tarta Carrot Cake tres pisos 6766. Ambas sustitutas tienen isNew y foto revisada sobre blanco. Se actualizan los dos encuadres contain en JSON y las versiones de recursos. Top, resto del carrusel, geometría y catálogo completos permanecen iguales. La elección es editorial, sin afirmar un ranking de ventas. Validación del catálogo y de las 748 imágenes antes de publicar; verificación de referencias e imágenes servidas al finalizar.
