# Controles fijos y conservación del contexto

Petición: vistas y Desplegar/Recoger todo siempre accesibles en móvil horizontal, sin volver al principio al cambiar de vista, desplegar o girar el teléfono. Base publicada: 803c69d.

Diagnóstico: la cabecera del catálogo de escritorio/horizontal no era fija; cambiar vista reiniciaba el bloque de productos a 72 y Recoger elegía la primera familia. El cambio de orientación reconstruía la vista sin trasladar el producto leído. La alternativa tenía los controles en distinto orden DOM, por lo que necesitaba fila explícita.

Cambios: cabecera del catálogo pegada bajo la superior, controles en la misma fila y franja de familia debajo. Se conserva una referencia al producto/familia visible, se cargan los bloques necesarios y se restaura su posición al cambiar vista o desplegar. Recoger en horizontal mantiene la familia leída; en vertical, su departamento cerrado. La orientación traslada el contexto entre ambas presentaciones. La restauración desactiva transiciones geométricas y estabiliza los grupos cercanos antes de reactivar la carga diferida, con una única corrección en el siguiente frame. No modifica fotos, datos, tamaños de tarjetas ni fuentes.

Archivos: nuevo assets/navigation-position.js; assets/desktop.js, views.js, catalog.js, catalog-components.css; versiones en ambos HTML; tests y estado.

Validación: npm ci y npm test (21 pruebas). Regresión permanente para cambios de vista y desplegado después de los primeros 72 productos. Chromium, ambas rutas, 320, 390, 430, 844×390 y 1366×900. Tres vistas, controles visibles, ausencia de desbordamiento, lectura profunda, recoger/desplegar y giro vertical/horizontal de ida y vuelta. En horizontal, producto conservado aproximadamente a 1–2 px de la línea de lectura en las pruebas. En vertical al recoger se conserva el departamento porque las tarjetas dejan de mostrarse. Capturas revisadas. Sin prueba en iPhone físico/Safari. Comprobar bytes públicos y despliegue antes de confirmar publicación.
