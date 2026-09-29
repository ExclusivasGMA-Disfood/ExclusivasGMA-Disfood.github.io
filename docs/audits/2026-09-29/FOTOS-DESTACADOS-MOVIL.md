# Tamaño de fotografías de los destacados en móvil

Petición: igualar el tamaño de foto a la captura con página reducida, sin reducir el resto de la interfaz; texto legible sin agrandar la imagen. Base fe3ba5f.

La captura no muestra porcentaje de Safari. Las tarjetas ocupan aproximadamente el 24 % del ancho de pantalla; comparadas con las de 132 px en pantalla móvil de unos 414 px, son compatibles con una reducción cercana al 75 %, sin poder confirmar un valor exacto.

Únicamente Novedades y Selección GMA hasta 639 px pasan a tarjetas de 100 px (marco de fotografía de unos 98 × 84 px). Fotos completas, mismo margen y proporción. Nombre de 12 px, hasta tres líneas; referencia de 11 px. No se aplica zoom global ni se modifica cabecera, títulos de sección, familias, botones o catálogo general. Escritorio y horizontal conservan su geometría. Se evita separar el porcentaje de su número en los títulos destacados con un espacio inseparable.

Validación: npm ci y npm test, 17 pruebas. Chromium: ambas rutas a 320, 390, 430, 844×390 y 1366×900; los 14 títulos sin truncamiento, sin desbordamiento de página, tres vistas móviles operativas. Capturas revisadas. Sin pruebas en dispositivo físico. Verificar publicación y archivos servidos.
