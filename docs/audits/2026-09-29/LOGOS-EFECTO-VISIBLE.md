# Entrada de logos más visible

Petición: el usuario no aprecia el efecto anterior. Base be5013a.

Solo se ajusta assets/brands.js y su versión en ambas rutas. Entrada de 750 ms, desplazamiento de 18 px y escalonado horizontal de 110 ms por columna. Se activa con un 35 % del elemento visible y margen inferior de 90 px para evitar que empiece bajo la navegación móvil. Espera a decodificar la imagen antes de animar. Una sola entrada por logo/carga, cancelable al activar movimiento reducido; sin JavaScript los logos permanecen visibles. Orden, tamaños, imágenes y resto del catálogo intactos.

Verificación: npm ci y npm test (21 pruebas). Chromium en ambas rutas y 320, 390, 430, 844×390 y 1366×900: opacidad intermedia real, duración de 750 ms, una animación por logo al volver, 39 logos y sin desbordamiento horizontal. Movimiento reducido sin animación y con visibilidad conservada. No probado en iPhone físico. Publicación sujeta a verificar los recursos públicos.
