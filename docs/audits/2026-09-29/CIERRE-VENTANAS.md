# Cierre de ficha y visor de fotos

Petición: revisar la ausencia del aspa y el cierre al deslizar hacia abajo. Base publicada 3947df2.

Diagnóstico: la ficha sí tenía aspa en Chromium, pero con área de 28 px. El visor de imagen solo ofrecía Cerrar al pie; en horizontal podía quedar fuera de la zona visible. Ninguno tenía cierre mediante gesto vertical (la ficha solo reconocía navegación lateral sobre la foto).

Cambios: aspa SVG con área de 44 px en ficha y nueva aspa superior fija al desplazar el visor. Alturas limitadas por viewport dinámico y zonas seguras. Tirar hacia abajo 70 px o más cierra desde el inicio del contenido. Si el gesto comienza con texto ya desplazado, es lateral, corto, multitáctil o sobre un control, no cierra. Se conserva el cierre inferior, fondo, teclado y restauración de foco/posición. No se cambian tarjetas, fotografías, catálogo ni tipografía.

Archivos: ambos HTML (incluyendo versiones de recursos), assets/catalog-components.css, assets/catalog.js, scripts/catalog.test.mjs y PROJECT_STATUS.md.

Validación: npm ci y npm test, 19 pruebas superadas; 999 referencias, 855 imágenes íntegras. Chromium con entrada táctil CDP en ambas rutas, 320×780, 390×844, 430×932, 844×390 y 1366×900. Comprobados aspa visible y pulsable, cierre y reapertura, gesto vertical de ficha/visor y desplazamiento intermedio sin cierre. Capturas revisadas en vertical y horizontal. Pruebas DOM permanentes cubren gestos cortos, laterales, lectura intermedia y ambas aspas. Sin prueba en iPhone físico/Safari. Verificar despliegue y bytes públicos tras publicar.
