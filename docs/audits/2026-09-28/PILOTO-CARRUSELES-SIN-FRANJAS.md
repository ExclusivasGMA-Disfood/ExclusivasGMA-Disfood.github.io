# Piloto: fotos hasta el borde en Novedades y Top

Petición: aprobar cinco muestras de la captura IMG_1090 antes de extender el criterio al resto. Se trabaja sobre 9043b14, sin cambiar dimensiones de tarjetas ni otras vistas.

| Referencia | Tratamiento exclusivo en los dos carruseles |
| --- | --- |
| 6772 | Quitar las franjas laterales del encuadre; llenar y priorizar las croquetas inferiores. |
| 6774 | Quitar las bandas horizontales; centrar la tarta y llenar el marco. |
| 403 | Fondo continuo; conservar protagonismo del paté y el plato inferior. |
| 229160 | Quitar bandas blancas; centrar la terrina. Puede cortar extremos de la bandeja y decoración en formato cuadrado. |
| 5986 | Lata completa ampliada; blanco continuo, sin recortar el envase. |

Se conservan los archivos originales y `data/images-manifest.json`. Los límites de encuadre están en `data/image-framing.json`; `assets/image-framing.js` adapta la presentación al tamaño real del marco. El margen del 8 % se elimina solo en estas cinco muestras, dentro de Novedades/Top. Las fichas ampliadas y las otras vistas mantienen su presentación anterior. No se ha generado ni retocado el contenido de ninguna fotografía.

## Comprobaciones

- 12 pruebas funcionales superadas; catálogo y 748 archivos de imagen válidos.
- Comprobación responsive en navegador: 320, 390, 430, 844 × 390 y 1280 × 900. Sin desbordamiento horizontal del documento; las cinco muestras tienen padding cero y encuadre adaptado. Inspección visual móvil, horizontal y escritorio. La lata conserva el envase completo; las escenas llenan el marco con el recorte indicado.
- No se ha realizado prueba física de Safari/iPhone.
