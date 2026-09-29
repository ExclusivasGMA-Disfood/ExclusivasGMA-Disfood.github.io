# BEHER y formatos/fotos de Tomate Nacional

Petición: conservar solo el logo BEHER derecho y equiparar su tamaño; agrupar tomates Dimardis 4830/2631 y uniformar las fotos de Tomate Nacional. Base: main 7c867f50598a0453c9ad77dbc655332bf03354c0.

BEHER: ventana CSS de la región derecha (x=210–600, y=0–129) del original oficial transparente. Se conserva el símbolo BEHER y su palabra de marca; se oculta el bloque de certificación izquierdo. Ancho máximo 180 px adaptable a la celda existente, sin deformación. Ambas páginas comparten la regla.

Dimardis: una tarjeta «Tomate frito casero · Dimardis», selector ½ kg (4830) / 3 kg (2631). Se prefiere la fotografía 2631, más nítida. La búsqueda se aplica antes de escoger representante, por lo que buscar 4830 sigue abriendo esa referencia. Referencias, selección y PDF permanecen independientes. La agrupación reduce el catálogo a 993 tarjetas con las mismas 1.001 referencias.

Fotos: 12 encuadres manuales del envase completo, proporción original, centrado y margen del 8 %. Se amplía el motor existente para leer reglas catalog además de las reglas limitadas a carruseles. La observación de cambios src actualiza el encuadre al cambiar de formato o imagen. Se prefieren las fotos sobre blanco 1988 y 1997 como representantes Marzo; se conservan las fuentes oficiales alternativas al seleccionar sus formatos. No se inventan las tres fotos ausentes (6037, 6808, 5265). Originales y manifiesto de imágenes intactos.

Archivos: assets/brands.css, assets/catalog.js, assets/image-framing.js, data/product-formats.js, data/image-framing.json, ambos HTML con recursos versionados, pruebas y registro. No se cambia la geometría de tarjetas, fuentes, cabecera, colores ni distribución general.

Validación: npm ci y npm test: 16 pruebas superadas, 1.001 referencias, 716 con foto, 850 archivos de imagen válidos, 216 fichas documentadas. Pruebas nuevas de Dimardis en ambas rutas: agrupación, foto preferida, selector y búsqueda exacta. Se mantienen los controles de selección, persistencia y PDF. git diff --check.

Chromium 153 local: ambas rutas, 320/390/430 px vertical, 844×390 horizontal y 1366×900 escritorio, tres vistas en cada tamaño. Revisión de capturas del logo, tarjetas y ficha; selector Dimardis operativo, seis imágenes encuadradas entre las siete tarjetas de Tomate Nacional, sin errores JavaScript ni desbordamiento horizontal en el recorrido. Pruebas en navegador emulado, no en dispositivos físicos.

Publicación: actualizar main sin force tras verificar su estado, comprobar despliegue y comparar los archivos públicos con los validados localmente.
