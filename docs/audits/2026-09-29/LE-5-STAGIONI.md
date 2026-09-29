# Le 5 Stagioni — foto, fichas y logo

Petición: continuar la importación desde https://le5stagioni.com/es/, manteniendo el diseño. Base publicada: 3ed90fdb99b2de5c2e12aeb229dda8b5e24f0c79.

El catálogo GMA contiene tres referencias de la marca: 602 Spolverina 10 kg, 6327 Superior Azul 00 10 kg y 6364 Oro Rojo 00 10 kg. La primera no tenía imagen. Se incorpora su fotografía oficial del saco de 10 kg, completo y con transparencia, convertida a WebP sin recorte ni retoque. Se mantienen las fotografías existentes de Superior y Oro, ambas identificadas y con el formato correcto.

Se añaden tres fichas documentadas con tipo de harina, aplicaciones, maduración o características de uso, y formato de venta. Fuentes oficiales individuales en data/le-5-stagioni-info.json. No se infieren valores W/P-L, listas completas de ingredientes ni certificaciones; no se muestran enlaces al fabricante ni precios.

Se incorpora el logo SVG oficial conservado en originals y una exportación PNG transparente de 343 × 200, mediante el mismo criterio proporcional usado por el panel. Alta en brands-manifest y un elemento más en los paneles existentes de ambas rutas. No se modifica CSS, disposición, tipografía ni navegación. Los HTML además actualizan la versión de product-specs.

Resultado: 3 de 3 referencias de la marca con foto e información; cero fotos pendientes. Catálogo global: 713 referencias con foto, 288 sin foto; 262 alimentos/bebidas sin foto al excluir 26 accesorios/mesas/servicios. 847 imágenes y 205 fichas documentadas.

Validación: inspección visual del original, las dos fotografías existentes y el logo exportado; npm ci y npm test, 12 pruebas superadas. git diff --check sin errores. No se realizaron pruebas visuales en navegador ni en dispositivo físico en esta tanda; las pruebas DOM no las sustituyen. Comprobar despliegue y archivos servidos tras publicar.
