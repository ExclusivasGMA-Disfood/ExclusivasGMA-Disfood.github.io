# Estabilidad al abrir y cerrar familias

Petición: corregir saltos de navegación sin cambiar diseño ni controles.

Se reprodujo en la principal de escritorio un cambio de scrollY 565→364→232 al cambiar y cerrar familias. El cierre reconstruía innecesariamente productos; el menú y las tarjetas reemplazados permitían reajustes de anclaje del navegador. En móvil, el controlador también enviaba la cabecera hacia arriba si detectaba movimiento, en lugar de conservar su posición previa.

Corrección exclusiva de principal: assets/main-scroll-stability.js conserva posición de página y cabecera, desactiva temporalmente el anclaje automático durante la actualización y restaura en el siguiente fotograma. scripts/build-main.mjs integra el controlador y evita reconstruir las tarjetas al cerrar el menú de familias de escritorio. Paquetes e index regenerados. No se modifica CSS, diseño, controles ni /nuevo/.

Validación: npm test, 27 pruebas correctas. Nuevas pruebas de conservación de tarjetas y scroll de escritorio, y compensación de desplazamiento de cabecera móvil a 390 px. Son pruebas DOM con geometría simulada, no validación visual en teléfono físico. Publicación y verificación real de escritorio se realizan tras preparar este registro.

Publicación 6c76200: CI y GitHub Pages correctos. Verificación con clics directos en navegador público: scrollY 606 antes y después de cerrar Quesos, reabrir Quesos y cambiar a Aperitivos. La interacción mediante localizadores puede desplazar elementos antes del clic, por lo que se usaron clics directos para la medición final. No se afirma validación visual en móvil físico.
