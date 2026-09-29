# Estado y continuidad del catálogo GMA

## Identidad y alcance

- Catálogo oficial: `/`. Presentación alternativa: `/nuevo/` (sin indexación).
- 999 referencias; 17 departamentos y 73 familias. No publicar precios.
- Geist para interfaz y lectura; Merriweather para títulos y nombres de producto, tal como estaba antes de la auditoría.
- Referencia estética anterior a Crego: `82f3ca8d013bbd444bdb13b8c89641194098f933`.
- Mantener encabezado, colores y organización; no mezclar una importación de proveedor con un rediseño.
- Fotografías como archivos en `images/products/`, relacionadas mediante `data/images-manifest.json`. Nunca imágenes de producto incrustadas en Base64.
- No mostrar enlaces de fabricantes en las fichas. Mantener fuentes internamente y no inventar ingredientes.

## Corrección de la auditoría de septiembre

Ver `docs/audits/2026-09-28/CORRECCIONES.md` y `AUDITORIA.md`.

La lógica funcional de las dos páginas está en `assets/*.js`. Los temas conservan sus estilos y comparten `assets/catalog-components.css` para geometría y accesibilidad. Los scripts se cargan en orden como scripts clásicos: no cambiar indiscriminadamente a async o módulos.

El catálogo de escritorio/horizontal muestra todo el resultado y carga lotes progresivamente. Seleccionar una familia delimita el recorrido; desplegar vuelve al resultado global respetando filtros explícitos. Anterior/siguiente en una ficha usa el conjunto desde el que se abrió.

## Antes de publicar

1. `npm ci && npm test`.
2. Comprobar las dos rutas en vertical y horizontal; imágenes completas, títulos sin invasión, referencia visible y botones de desplegar/recoger.
3. Probar foco y cierre de paneles, selección y recarga, búsqueda, galería y PDF.
4. Verificar el despliegue y los archivos servidos. Registrar la versión y las limitaciones reales; CI verde no sustituye una revisión visual.

No revertir datos o eliminar hechos documentados para lograr una validación verde. Un campo ausente debe tener un estado explícito.

## Corrección de continuidad visual

La revisión posterior a `b9f7d9f` elimina las ampliaciones de tarjetas y títulos introducidas por la auditoría. Los anchos, proporciones y tipografías vuelven a los definidos en los temas anteriores (`aac7ae58`); se conserva la contención de imágenes y la separación de referencia/botón. No sustituir la página principal por `/nuevo/`. Mantener las reparaciones funcionales y todos los datos.

## Regla vigente: revisar el estado actual, no recuperar otra versión

La aclaración final del usuario pide corregir el diseño actual y documentar cambios, no seguir comparando/restaurando versiones. Leer `AGENTS.md` y `docs/audits/2026-09-28/CONTINUIDAD-Y-ENCUADRE.md`. La barra de vistas y Desplegar todo comparten fila. Fotos completas, centradas, con margen interior del 8 %, sin cover ni zoom. No tocar anchos de tarjetas o cabecera como consecuencia de una corrección de fotografías.

## UX autorizada: cabecera y móvil horizontal

El siguiente encargo autoriza mejorar los tres desplegables, seguir la familia al bajar y adaptar dimensiones en móvil horizontal. Registro: `docs/audits/2026-09-28/UX-CABECERA-Y-HORIZONTAL.md`. Los paneles de cabecera se superponen sin alterar el flujo; solo uno abierto. La familia leída se marca sin cambiar filtros ni reconstruir productos. Solo entre 640–999 px en horizontal se reduce la cabecera a 44 px y se usan fotos laterales en Cuadrícula/Lista. No extender esos tamaños a móvil vertical o escritorio.

## Etiquetas Top

Petición posterior: cambiar únicamente la etiqueta «Selección» de las tarjetas del carrusel a «Top». Se cambia en `assets/discovery.js`, compartido por ambas páginas; recursos versionados en ambos HTML. La recomendación sigue siendo editorial, sin afirmar ventas medidas. Las fotos 5329 y 6112 se inspeccionaron: 6112 incorpora un amplio borde blanco en el archivo. Se propone normalizar el fondo sobrante y la escala visual por tipo de producto con copias derivadas y manifiesto JSON; esa propuesta no se ha aplicado todavía.

## Encuadre individual autorizado: 6112

El usuario aprobó normalizar los dos jamones señalados. 5329 ya sirve de referencia de escala; 6112 recibe un encuadre manual del área 130,130–1070,1070 de su fuente 1200×1200, con margen visual del 8 %. Se configura en `data/image-framing.json` y se aplica mediante `assets/image-framing.js`; el archivo original y el manifiesto de imágenes permanecen intactos. No es una regla automática para todas las fotos. La prueba con edición generativa se descartó porque retocaba detalles del producto. No usarla como fuente de catálogo.

## Piloto de imágenes hasta el borde en Novedades y Top

El usuario autoriza probar 6772, 6774, 403, 229160 y 5986 con fotos hasta los bordes curvos de los dos carruseles. Esta autorización sustituye la regla general de margen/contain solo para esas cinco fotos y esos dos carruseles. Encuadres manuales en `data/image-framing.json`: platos con fondo continuo y la lata completa ampliada sobre blanco. La terrina 229160 puede perder los extremos laterales de la bandeja en formato cuadrado. No alterar imágenes originales, fichas ampliadas, listas, tipografías ni dimensiones de tarjeta. No extender el piloto a otras referencias sin petición.

## Selección cuidada sobre blanco — criterio vigente

Tras valorar el piloto, el usuario autoriza elegir productos apetecibles con fondo blanco. Se sustituye la selección de los carruseles: Top 8 referencias (1902, 6140, 3842, 4599, 6767, 049, 802, 6256); Novedades 6 referencias marcadas isNew (6744, 3816, 6777, 6786, 6765, 6742). Todos conservan su ficha en el catálogo; no se borran productos. Se retiran los cinco encuadres del piloto y se configuran encuadres contain individuales para los 14 destacados, con margen del 8 % y producto completo. Se mantienen las dimensiones actuales, tipografías, controles y estructura. Registro: docs/audits/2026-09-28/SELECCION-FONDO-BLANCO.md.

## Sustitución solicitada de frutos secos

Se sustituyen exclusivamente en Novedades la almendra 6744 por gilda triple de boquerón 6154 y el cocktail 6742 por tarta Carrot Cake tres pisos 6766. Ambas sustitutas tienen isNew y foto revisada sobre blanco. Se actualizan los dos encuadres contain en JSON y las versiones de recursos. Top, resto del carrusel, geometría y catálogo completos permanecen iguales. La elección es editorial, sin afirmar un ranking de ventas. Validación del catálogo y de las 748 imágenes antes de publicar; verificación de referencias e imágenes servidas al finalizar.

## Piloto autorizado: formatos de tomate Marzo

Diez referencias de tomate frito, triturado y entero de Marzo se muestran en tres tarjetas, con selector de formato dentro de la ficha. Mapa explícito en data/product-formats.js; no extenderlo a otras marcas/productos sin petición. Mermelada separada. La búsqueda se aplica antes de agrupar y una referencia exacta abre su formato; seleccionados y PDF mantienen cada SKU/cantidad independiente. Permanecen 1.001 referencias y 994 tarjetas en navegación sin filtros. Registro y validación: docs/audits/2026-09-29/MARZO-FORMATOS.md.

## BEHER y Tomate Nacional: ampliación autorizada

BEHER muestra solo su identidad principal derecha mediante una ventana CSS sobre el original oficial. Dimardis 4830 y 2631 comparten una tarjeta con dos formatos y foto preferida 2631. Marzo frito y triturado prefieren 1988 y 1997 sobre blanco. Se conservan 1.001 referencias y se muestran 993 tarjetas sin filtros. Las 12 fotos disponibles de Tomate Nacional tienen encuadres manuales contain, centrados y con margen del 8 %, configurados en data/image-framing.json. No se modifica ningún archivo de fotografía ni se añaden reglas automáticas para otras familias. Ver docs/audits/2026-09-29/BEHER-TOMATE-NACIONAL.md.

## Organización de la Huerta

El departamento pasa a Conservas de la Huerta. Dos familias: Huerta Nacional (Tomate Nacional, Verduras Selectas, Verduras y Frutas en Conserva, Legumbres) y Huerta Italia (Conserva Italiana, Tomate Italia). Lentejas, garbanzos y alubias se reúnen en Legumbres. Se conservan las 1.001 referencias, la selección por referencia y las agrupaciones de formatos. Registro: docs/audits/2026-09-29/HUERTA-ORGANIZACION.md.

## Bajas solicitadas: mozzarella y cheddar rallados

Retiradas 6703 (mozzarella rallada 70/30 Disfood) y 6754 (cheddar rojo rallado). Quedan 999 referencias y 991 tarjetas; sin cambios de diseño. Se conserva el mapa histórico de IDs para no alterar selecciones guardadas. Ver docs/audits/2026-09-29/BAJAS-QUESOS.md.

## Refinado autorizado de los carruseles destacados

Novedades y Selección GMA reciben un ajuste discreto de proporciones y espacios. Sus 14 referencias tienen títulos breves específicos (discoveryName) y nombres completos revisados en español; unidades G/KG/ML según criterio del usuario. No extender esta geometría a las tarjetas del catálogo general. Registro: docs/audits/2026-09-29/CARRUSELES-REFINADOS.md.

## Fotos pequeñas en destacados móviles

La captura posterior pide fotos como al reducir la página, manteniendo el resto al tamaño normal. Solo hasta 639 px: tarjetas destacadas de 100 px, foto completa con proporción 1,16, títulos de 12 px y hasta tres líneas, referencia de 11 px. Escritorio, horizontal, cabecera y catálogo general intactos. El porcentaje exacto del zoom de la captura no es verificable; proporciones compatibles aproximadamente con 75 %. Registro: docs/audits/2026-09-29/FOTOS-DESTACADOS-MOVIL.md.

## Títulos de destacados en dos líneas

Ajuste posterior solicitado: en móvil los nombres pasan de 12 a 11 px y de tres a dos líneas, con puntos suspensivos. Fotos de 100 px y resto de interfaz intactos. Registro: docs/audits/2026-09-29/DESTACADOS-DOS-LINEAS.md.

## Cierre de ventanas de producto

La ficha tiene aspa SVG de 44 px y el visor de fotos una nueva aspa superior que sigue accesible al desplazar. Ambos cierran al tirar hacia abajo desde el inicio del contenido (70 px); leer texto ya desplazado no cierra la ventana. Alturas basadas en viewport dinámico. Sin cambios en carruseles ni datos. 19 pruebas y matriz Chromium en ambas rutas; no probado en iPhone físico. Registro: docs/audits/2026-09-29/CIERRE-VENTANAS.md.

## Navegación estable y controles fijos

En horizontal/escritorio, la cabecera del catálogo con las vistas y Desplegar/Recoger queda fija bajo la cabecera superior; franja de familia debajo. Cambios de vista, desplegado y giro conservan el producto/familia leído, incluyendo referencias posteriores al primer bloque. Recoger mantiene familia actual en horizontal y departamento en vertical. Nuevo assets/navigation-position.js, cargado antes de views.js. 21 pruebas y revisión Chromium en ambas rutas; sin prueba física en iPhone. Ver docs/audits/2026-09-29/NAVEGACION-ESTABLE.md.

## Dimardis ½ KG y textos señalados

4830 usa ahora images/products/4830-500g.jpg: adaptación visual solicitada, con peso 500 g, fondo blanco y lata recta. No tratar como foto original del fabricante. 2631 mantiene su foto propia. Normalizados nombres 4830, 2631 y 6617; KG en selector Dimardis. 21 pruebas y comprobación de cambio entre formatos en ambas rutas. Registro: docs/audits/2026-09-29/DIMARDIS-MEDIO-KILO-TEXTOS.md.

## Panel de marcas por familias

39 logos en seis bloques editoriales por especialidad, definidos en data/brand-groups.json. Regenerar el HTML con node scripts/render-brand-groups.mjs al cambiar ese orden. Filas incompletas centradas, títulos discretos, monocromo y fondo blanco; B&G oscuro mediante CSS para hacer visible su fuente blanca. Sin cambios de producto ni animaciones. Entrada suave por bloques solo propuesta, no autorizada/aplicada. Ver docs/audits/2026-09-29/LOGOS-POR-FAMILIAS.md.
