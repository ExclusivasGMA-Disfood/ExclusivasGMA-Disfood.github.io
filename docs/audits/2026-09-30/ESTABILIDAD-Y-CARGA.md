# Segunda optimización: resultados de PageSpeed

Petición: aplicar las correcciones convenientes tras medir la principal. No cambiar diseño ni secundaria.

Base: dos ejecuciones PageSpeed 30/09/2026 09:45–09:46 CEST: móvil 46/49, LCP 7,7/5,4 s, CLS 1,004/1,098; escritorio 73/72, LCP 1,2/1,3 s, CLS 0,806/0,809. Informes z03k9w3yi9 y p6d3jap60l en pagespeed.web.dev. Sin datos CrUX.

Cambios:
- El build ejecuta los renderizadores reales en Happy DOM y coloca el contenido inicial de Novedades, Selección, familias y primer lote de escritorio en HTML. No inventa un segundo catálogo ni cambia su organización. La aplicación vuelve a enlazar los controles y restaura el estado del usuario normalmente.
- El paquete principal lleva el manifiesto inicial de fotos para evitar una primera pasada sin imágenes; se conserva su actualización remota y el comportamiento de fichas, filtros y selección.
- Estilos existentes incluidos en el documento sin alterar reglas ni geometría, evitando su petición bloqueante. La fuente de los estilos sigue siendo assets/*.css.
- Geist y Merriweather autoalojadas en WOFF2 con pesos usados, licencias OFL y procedencia en assets/fonts. Dos caras principales precargadas; no llamadas a Google Fonts en la principal.
- Logos GMA y marcas con alternativa WebP de calidad 90, sin recorte ni cambio de dimensiones o proporciones. Originales conservados. Alternativas seleccionadas reducen de 1.562.839 a 667.717 bytes el conjunto de logos (incluidos los que conservan el original).
- No se han cambiado assets fuente compartidos, datos comerciales, fotos de producto ni /nuevo/.

Validación local: 23 pruebas correctas; contenido inicial sin JS comprobado; generación reproducible; 849 originales verificados. Pendiente en este registro inicial la medición posterior al despliegue. No se afirma una optimización perfecta ni se sustituye la prueba en dispositivo físico por DOM o emulación.

## Verificación posterior

Publicación d5052a5. PageSpeed 30/09/2026 09:57–09:58 CEST:
- Móvil, dos ejecuciones: rendimiento 90 y 96; FCP 1,2 y 1,7 s; LCP 3,6 y 2,7 s; TBT 10 ms en ambas; CLS 0 y 0,001. Moto G Power y 4G lenta emulados.
- Escritorio: 96; FCP 0,5 s; LCP 1,4 s; TBT 40 ms; CLS 0. El segundo enlace muestra la misma captura de escritorio de 09:57, por lo que no se cuenta como muestra independiente.
- Informes: https://pagespeed.web.dev/analysis/https-exclusivasgma-disfood-github-io/4mw0uvo9m8?form_factor=mobile y https://pagespeed.web.dev/analysis/https-exclusivasgma-disfood-github-io/otwm51wjvx?form_factor=mobile ; pestaña Ordenador disponible.
- Navegador: tarjetas de escaparate conservan exactamente 132 x 143 px y misma posición en el viewport de escritorio usado; 14 fotos cargadas; búsqueda confirmada de 6715 devuelve una ficha; abrir/cerrar ficha y añadir/quitar selección correctos.
- La medición de carga principal móvil aún supera el objetivo de 2,5 s. Sin datos de usuarios reales/INP ni prueba en móvil físico. Ahorro pendiente en imágenes del catálogo y caché según Lighthouse; no se ha cambiado de alojamiento ni la política de GitHub Pages.
