# Familias y subfamilias: paleta plana

Petición: eliminar rojo/morado difuminado y respetar estrictamente la paleta corporativa en la jerarquía del catálogo.

Se elimina el degradado y las mezclas de color de cabeceras, separadores, contadores y navegación de familias. Familias: Night Bordeaux #4B051D con Soft Linen #EFEFE3. Subfamilias: Platino #F3F3F4; abiertas/activas: Sand Dune #D2CFB6; texto y acentos: Night Bordeaux. Sin sombras coloreadas en los contenedores de familias. La capa común prevalece sobre reglas heredadas de /nuevo/.

Archivos: assets/palette.css y versiones de recurso en ambos HTML. No se alteran geometría, tipografía, productos ni imágenes.

Validación: npm ci y npm test, 21 pruebas correctas. Chromium: ambas rutas en 390×844, 844×390 y 1366×900; colores computados de cabeceras, separadores, contadores y navegación dentro de los cuatro valores oficiales y background-image:none. Revisión visual de capturas. Sin prueba en dispositivo físico.
