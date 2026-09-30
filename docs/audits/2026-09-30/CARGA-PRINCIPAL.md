# Optimización de carga de la principal

Petición: corregir el punto 8 de la auditoría. JavaScript es una decisión técnica de implementación, no un requisito pedido por el usuario. Mantener diseño, funciones y secundaria.

- index.html carga dos paquetes de comportamiento y los tres archivos de datos, en el orden previo: 18 a 5 peticiones JavaScript. 509.211 a 489.040 bytes sin compresión HTTP; no equivale a una medición de tiempo de carga.
- Cuatro CSS concatenados literalmente, en el mismo orden y directorio: una petición. Ningún selector ni valor modificado.
- Novedades y Selección GMA ofrecen WebP de 320/640 px cuando pesan menos que el original, sin recorte, ampliación, cambio de margen o proporción. src conserva la foto original; srcset elige por resolución. sizes=164px cubre el máximo actual de las tarjetas. Las fichas ampliadas y el catálogo mantienen originales.
- Las 14 fotos seleccionadas suman 1.192.268 bytes originales; las alternativas de 320 px, incluyendo originales pequeños no sustituidos, suman 108.546 bytes. El ahorro real depende de DPR, caché y fotos visibles. No se afirma que todas las fotos se descargasen al abrir ni que toda la web pese 55 MB al inicio.
- scripts/build-main.mjs genera paquetes, versiones con hash y miniaturas; npm run build:main debe ejecutarse tras editar fuentes compartidas, curación o fotos destacadas. npm test rechaza paquetes desactualizados. Compilación determinista con dependencias fijadas. No editar paquetes a mano.
- No se han modificado los archivos fuente compartidos de assets, los productos, los originales ni nuevo/index.html. La transformación del atributo srcset se aplica solamente al paquete principal, con comprobación de la plantilla de origen.

Validación: 21 pruebas existentes correctas y prueba nueva de variantes/original ampliado correcta; 849 imágenes de catálogo decodificadas; catálogo conserva 998 referencias y 726 con foto. Sin mediciones Lighthouse/Core Web Vitals ni pruebas en móvil físico; no se promete una puntuación o tiempo de carga. Comprobación de publicación y navegación de escritorio al desplegar.
