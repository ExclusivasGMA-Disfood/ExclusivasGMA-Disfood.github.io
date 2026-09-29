# Paleta oficial y auditoría de combinación

29/09/2026. Base f4297bc. Petición: corregir Sand Dune y auditar la combinación de colores. Alcance: principal y alternativa; exclusivamente color, sin modificar contenidos, fuentes, tamaños, distribución ni fotografías.

## Fuente y criterio

Lámina aportada: Soft Linen #EFEFE3, Brick Ember #BB080B, Platino #F3F3F4, Night Bordeaux #4B051D y Sand Dune RGB 210,207,182 = #D2CFB6. Se corrige el antiguo #D8CFB6. La combinación estética es una decisión editorial, no una propiedad objetivamente «perfecta».

Roles compartidos en assets/palette.css, cargado después de las capas existentes en ambas rutas:
- Marfil: fondo de página y apoyo de lectura.
- Platino: paneles y navegación.
- Burdeos: jerarquía, distintivos y estados activos de navegación.
- Rojo: acciones principales y foco de teclado.
- Arena: detalles y botones de productos seleccionados, con icono burdeos.
- Blanco: producto y marcas; carbón #2C2C2C y gris #5A5055 para lectura.
- Oro de logos: excepción decorativa solicitada anteriormente, sin cambiar imágenes ni filtro.

Se unifican variables heredadas de la alternativa (burdeos, crema, colores familiares y aliases bx). Se conservan sus estructuras y tamaños propios. No se pretende eliminar los colores originales de fotos/logos ni cada matiz producido por transparencia, degradado o sombra.

## Hallazgos y correcciones

1. Arena incorrecto, corregido en origen y en capa común.
2. Variantes cromáticas de la alternativa: tokens vinculados a la misma paleta oficial.
3. Navegación inferior principal: textos secundarios 4,00:1 sobre platino, ahora 6,98:1.
4. Recuentos de escritorio: aproximadamente 2,50–2,87:1, ahora gris legible. Avisos de selección vacía y persistencia: 3,56 y 2,88:1, corregidos.
5. Botones de vista inactivos y recuento de resultados: aproximadamente 4,31 y 4,00:1, corregidos.
6. Placeholders, fallback de imagen y referencias reciben gris común.
7. Distintivos de novedades/top: burdeos y blanco en lugar de negro genérico. Fotos permanecen blancas. Productos seleccionados: arena y burdeos en ambas versiones.
8. La navegación inferior alternativa emplea platino, gris y burdeos para evitar texto gris sobre su antiguo fondo oscuro.

## Contrastes de las parejas principales

Cálculo de luminancia relativa sRGB:

| Texto / fondo | Relación |
|---|---:|
| Blanco / rojo | 6,66:1 |
| Blanco / burdeos | 15,69:1 |
| Gris secundario / platino | 6,98:1 |
| Gris secundario / marfil | 6,68:1 |
| Burdeos / arena | 9,97:1 |
| Rojo / marfil | 5,75:1 |

## Validación y límites

npm ci y npm test: 21 pruebas correctas; 999 referencias y datos/imágenes intactos. Muestreo de texto visible en Chromium: ambas rutas × 5 tamaños (320,390,430,844×390,1366×900) × 5 estados (catálogo inicial, ficha, búsqueda abierta, cuenta, filtros), 50 escenarios. Sin parejas de texto detectadas por debajo de 4,5:1 en ese muestreo. Colores computados normalizados con canvas para manejar color-mix; composición de fondos transparentes de los ancestros. Datos en palette/contrast-sampled.json.

Comprobación adicional de tres vistas por tamaño/ruta, selección arena y dimensiones antes/después de activar la capa de color. Revisión de capturas móviles, horizontal y escritorio. No es una certificación completa de accesibilidad: el muestreo no cubre cada píxel de fotografías, fondos degradados, contenido solapado ni todos los productos/estados posibles. No prueba física de Safari/iPhone. Recursos públicos deben verificarse tras despliegue.
