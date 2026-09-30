# Familias comerciales — principal

Petición: aplicar la organización comercial aprobada, sin cambios estéticos ni modificar /nuevo/.

16 familias con subfamilias específicas; 998 referencias únicas y 990 tarjetas. Canelones y lasañas elaborados permanecen dentro de Pasta; las láminas secas y pasta sin relleno se distinguen de la rellena. Navidad pasa a selección transversal accesible desde el menú. Halal y por encargo se conservan como características y términos de búsqueda. Se añaden subfamilias necesarias para productos existentes como yogures, huevos y cerdo no ibérico.

Fuente explícita: data/main-taxonomy.json. scripts/build-taxonomy.mjs genera data/catalog-main.js; scripts/build-main.mjs integra la clasificación, etiquetas y acceso estacional en el paquete principal. Datos originales, fotografías, formatos, origen y secundaria conservados. Las selecciones guardadas se recuperan por referencia estable. Se protege la actualización de la barra de sesión cuando sus nodos ya no están presentes.

Validación previa: npm test, 25 pruebas correctas; 998 referencias, 726 productos con foto, 252 fichas documentadas, 849 imágenes verificadas. Pruebas de clasificación única, integridad de campos, formatos agrupados, filtros, selección de Navidad y migración de selección previa. Sin cambios de CSS ni geometría. Estas pruebas DOM no equivalen a una prueba visual en dispositivo físico. Comprobación de publicación pendiente al preparar este registro.
