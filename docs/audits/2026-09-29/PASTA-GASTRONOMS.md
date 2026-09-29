# Corrección de clasificación de tres pastas Gastronoms

Petición: los tres productos señalados en la captura son pasta rellena. Base main: 309b603, manteniendo el piloto de formatos Marzo.

Se trasladan de Gama del Chef / Congelados a Pasta Italiana / Pasta Rellena (IQF), junto a las demás pastas Gastronoms:
- 3816 Ravioli crujiente de butifarra negra y manzana asada: Ravioli y Agnolotti.
- 3837 Ravioli crujiente secreto, jamón y cebolla Oporto: Ravioli y Agnolotti.
- 4287 Canelón de brandada de bacalao y ajo escalivado: Canelones y Lasañas.

Solo cambian ubicación y campo sub de las tres referencias en catalog-data.js. Conservados nombres, referencias, fotos, unidades, novedades y demás datos. La selección editorial usa referencias; la carga de selecciones guardadas utiliza favRefs y recalcula los identificadores de posición, por lo que el traslado no altera el producto seleccionado. No se modifica el diseño ni los tomates agrupados.

Validación: comparación estructurada con main confirma que solo estas tres referencias cambian de familia y que todos los campos salvo sub permanecen iguales; 1.001 referencias conservadas. npm ci y npm test: 14 pruebas superadas, incluidas las del piloto Marzo y PDF. git diff --check sin errores. Es una corrección de datos, sin cambios geométricos ni nueva revisión visual de dispositivos.

Archivos: data/catalog-data.js, ambos HTML solo para invalidar caché de esos datos, y este registro. Verificar despliegue y datos servidos después.
