# Correcciones aplicadas · 28 septiembre 2026

Referencia de partida: `aac7ae58a140ea43625b07ce503af52c04f66f86`. La estética de referencia sigue siendo la anterior a Crego; se mantienen logo, encabezado, colores, Geist/Merriweather, 1.001 referencias y 17 departamentos / 79 familias.

## Cambios

- Tarjetas compartidas con marcos que contienen toda la imagen, tres líneas de nombre y controles de 44 px en un espacio independiente. Referencia separada de la acción.
- Fotografías y documentos incorporados mediante archivos y manifiesto JSON. Recuperada una imagen válida para 4476 desde el fabricante: se identifica en el detalle como imagen de gama orientativa. Dos fotografías oficiales nuevas para 6777, una principal y una secundaria.
- Recuperados los 16 registros con hechos documentados pero sin ingredientes: 77 registros visibles. Se declara cuándo no están disponibles los ingredientes.
- Una sola lógica funcional para ambas presentaciones. La alternativa conserva su tema y portada; Novedades precede a Selección GMA y ya no afirma ventas medidas.
- Catálogo completo predeterminado en escritorio y horizontal, carga inicial de 72 tarjetas y siguientes lotes al acercarse al final. «Desplegar todo / Recoger todo» conserva los filtros explícitos; los filtros pueden quitarse desde el panel. Un departamento se puede cerrar.
- Navegación anterior/siguiente coherente con el escaparate o resultado desde el que se abrió la ficha.
- Paneles cerrados retirados del foco; foco inicial, ciclo de Tab, fondo inerte y retorno al activador. Se mantiene Escape.
- Guardado con resultado real, mensaje de fallo y aviso persistente dentro de la selección. Vaciar también elimina el nombre del cliente.
- Una imagen fallida no borra las acciones ni la galería; una imagen posterior válida recupera el marco.
- PDF bajo demanda desde archivos locales de las mismas versiones utilizadas anteriormente, sin depender del CDN. Timeout, limpieza del recurso fallido y reintento real. El mensaje indica comprobar las descargas, sin afirmar una descarga que no se ha observado.
- Carruseles manuales y sin duplicación de tarjetas. Preferencias de movimiento reducido respetadas.
- Etiquetas de añadir/quitar incluyen el producto. El acceso de clientes informa de su estado sin pedir credenciales para un servicio inexistente. Se retiran enlaces de menú sin destino.
- Metadatos de la página oficial y enlaces compartibles por `?ref=...`. La alternativa continúa sin indexación.
- Estilos base y lógica extraídos en recursos reutilizables y cacheables; menos variantes de fuentes. La galería vinculada de 989900 se conserva al reconstruir el manifiesto.

## Verificación

`npm test` comprueba integridad y cobertura de datos, ambas páginas, decodificación de las 748 imágenes referenciadas y pruebas funcionales de navegación, modales, fallbacks, guardado fallido, reintento PDF y producción de un PDF real multipágina con 60 referencias y sin precios.

La vista de revisión aislada permite comprobar escritorio y documentos a 390 × 844 y 844 × 390 dentro del navegador. Estas comprobaciones no equivalen a una prueba en un iPhone físico. Antes de la promoción se midió que las imágenes quedaban dentro del marco y no había intersección de botones con títulos; se verificó el retorno de foco y el alcance 1 de 30 al entrar desde Novedades.

## Pendientes que requieren material o medición adicional

- Ocho novedades siguen sin foto contrastada: 6486, 5985, 6752, 6809, 6807, 6781, 6791 y 6779. En el conjunto del catálogo son 359 referencias sin foto en manifiesto. Se mantiene el marcador de familia; no se asignan imágenes de otro producto para simular cobertura completa.
- No se han inventado fichas técnicas para las referencias que carecen de documentación. Se preservan los nombres maestros y la clasificación comercial.
- Queda pendiente la comprobación física en Safari de iPhone / Android y una medición de Core Web Vitals con condiciones de red reproducibles. No se otorga una puntuación artificial de rendimiento o accesibilidad.
- El acceso autenticado sigue siendo un servicio futuro, comunicado como tal; crear cuentas y backend queda fuera de estas correcciones del catálogo estático.

## Continuidad

La implementación compartida está en `assets/`. Cualquier importación de fabricante debe modificar datos, imágenes y manifiesto; los cambios de diseño se revisan por separado. Ejecutar `npm ci && npm test` antes de publicar y comprobar después la versión servida. No dar por resuelta una regresión visual solo porque CI esté en verde.
