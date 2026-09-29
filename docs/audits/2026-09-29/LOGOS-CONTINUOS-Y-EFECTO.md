# Logos continuos con entrada suave

Petición posterior: quitar las familias visibles; basta con mantener juntas las marcas relacionadas. Activar el efecto propuesto. Base: 3affb87.

Los 39 logos pasan a una única lista/cuadrícula, con el mismo orden editorial y sin subtítulos, separadores ni contenedores por familia. El JSON de grupos permanece como criterio interno de orden; el generador aplana la secuencia. Se conservan tamaños, BEHER recortado a la identidad derecha, corrección de B&G y última fila centrada.

assets/brands.js añade una aparición de 380 ms con opacidad y desplazamiento de 6 px, una sola vez por logo y carga de página al entrar en pantalla. IntersectionObserver deja de observar cada logo tras su entrada. Sin JavaScript o con movimiento reducido, todos los logos siguen visibles; activar movimiento reducido cancela animaciones en curso. No hay ocultación CSS ni alteración de la altura del documento.

Archivos: generador, CSS de marcas, nuevo JS, ambos HTML y documentación. Versiones de recursos actualizadas.

Verificación: npm ci y npm test, 21 pruebas correctas. Chromium en ambas rutas, 320, 390, 430, 844×390 y 1366×900: una cuadrícula, 39 logos, sin títulos familiares ni desbordamiento, efecto una vez aunque se vuelva a subir/bajar. Movimiento reducido sin animación y con logos visibles. Capturas revisadas. Sin prueba en móvil físico. Verificar despliegue/bytes públicos antes de confirmar.
