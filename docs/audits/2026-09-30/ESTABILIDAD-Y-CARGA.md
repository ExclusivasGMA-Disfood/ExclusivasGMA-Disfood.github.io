# Segunda optimización: resultados de PageSpeed

Petición: aplicar las correcciones convenientes tras medir la principal. No cambiar diseño ni secundaria.

Base: dos ejecuciones PageSpeed 30/09/2026 09:45–09:46 CEST: móvil 46/49, LCP 7,7/5,4 s, CLS 1,004/1,098; escritorio 73/72, LCP 1,2/1,3 s, CLS 0,806/0,809. Informes z03k9w3yi9 y p6d3jap60l en pagespeed.web.dev. Sin datos CrUX.

Cambios:
- El build ejecuta los renderizadores reales en Happy DOM y coloca el contenido inicial de Novedades, Selección, familias y primer lote de escritorio en HTML. No inventa un segundo catálogo ni cambia su organización. La aplicación vuelve a enlazar los controles y restaura el estado del usuario normalmente.
- El paquete principal lleva el manifiesto inicial de fotos para evitar una primera pasada sin imágenes; se conserva su actualización remota y el comportamiento de fichas, filtros y selección.
- Estilos existentes incluidos en el documento sin alterar reglas ni geometría, evitando su petición bloqueante. La fuente de los estilos sigue siendo assets/*.css.
- Geist y Merriweather autoalojadas en WOFF2 con pesos usados, licencias OFL y procedencia en assets/fonts. Dos caras principales precargadas; no llamadas a Google Fonts en la principal.
- Logos GMA y marcas con alternativa WebP de calidad 90, sin recorte ni cambio de dimensiones o proporciones. Originales conservados. Alternativas seleccionadas reducen de 1.562.839 a 655.934 bytes el conjunto correspondiente.
- No se han cambiado assets fuente compartidos, datos comerciales, fotos de producto ni /nuevo/.

Validación local: 23 pruebas correctas; contenido inicial sin JS comprobado; generación reproducible; 849 originales verificados. Pendiente en este registro inicial la medición posterior al despliegue. No se afirma una optimización perfecta ni se sustituye la prueba en dispositivo físico por DOM o emulación.
