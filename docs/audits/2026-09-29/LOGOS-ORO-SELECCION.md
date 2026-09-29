# Oro al seleccionar un logo

Petición: eliminar la entrada animada y sustituirla por oro reluciente al seleccionar. Base 98e3572.

Se elimina por completo IntersectionObserver y toda animación de aparición/desplazamiento de assets/brands.js. Los 39 logos permanecen estáticos. Cada logo tiene un botón nativo: clic, toque, Enter o Espacio alterna selección. Solo uno seleccionado; tocarlo de nuevo lo desactiva. Un filtro SVG de color conserva blancos y transparencia, transformando el dibujo en oro, con un breve brillo de 850 ms. Movimiento reducido conserva el dorado sin brillo animado. El filtro es código vectorial, no una imagen incrustada; fuentes de imagen intactas. BEHER conserva recorte y B&G su tratamiento particular. Orden y tamaños intactos. No filtra productos ni cambia la selección del catálogo.

Archivos: assets/brands.js, assets/brands.css, versiones en index.html y nuevo/index.html, bitácora.

Validación: npm ci y npm test, 21 correctos; Chromium en ambas rutas y 320/390/430 px, 844×390 y 1366×900. Sin animaciones al llegar, 39 botones, dorado al pulsar, cambio y desactivación por teclado, mismas dimensiones, sin desbordamientos. Movimiento reducido comprobado. Capturas revisadas. No probado en iPhone físico. Comprobar recursos públicos tras despliegue.
