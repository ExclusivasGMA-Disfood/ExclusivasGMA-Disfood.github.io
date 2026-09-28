# Auditoría integral · GMA Disfood

Fecha: 28 de septiembre de 2026. Versión examinada: `aac7ae58a140ea43625b07ce503af52c04f66f86`.

Sitios: https://exclusivasgma-disfood.github.io/ y https://exclusivasgma-disfood.github.io/nuevo/.

## 1. Dictamen

La web dispone de una base útil: catálogo amplio, referencias estables, imágenes mediante archivos y manifiesto, selección persistente, búsqueda y generación de PDF bajo demanda. Sin embargo, todavía no alcanza una calidad profesional consistente. Los principales obstáculos son defectos de composición de las tarjetas, estados de navegación contradictorios, pérdida de información visible y comprobaciones de publicación que no detectan estas regresiones.

**La prioridad es estabilizar los componentes y los recorridos existentes antes de añadir otra capa de cambios visuales.** La estética anterior a Crego debe funcionar como referencia de diseño; los datos incorporados después deben conservarse. Recuperar CSS antiguo por sí solo no recupera el comportamiento de toda la web.

Esta auditoría no modifica la web publicada. Documenta defectos, mejoras y criterios de aceptación; no certifica que estén resueltos.

## 2. Alcance y evidencia

- Inspección del código, datos, manifiestos y scripts de validación del repositorio.
- Comprobación de la web publicada mediante navegador de escritorio a **1363 × 936**.
- Pruebas de navegación, búsqueda, apertura de producto y estado de diálogos; mediciones geométricas de diez tarjetas de Novedades.
- Verificación de existencia y decodificación de las imágenes referenciadas; validación estructural de SVG.
- Ejecución satisfactoria de `node scripts/build-product-specs.mjs --check` y `node scripts/check-catalog.mjs`.

**Límites:** no se ha realizado una prueba visual en un iPhone real ni una emulación de orientación; las conclusiones sobre horizontal provienen del código. Tampoco se han medido Core Web Vitals, Lighthouse o tiempos bajo red limitada, ni completado una descarga de PDF. No se ha realizado una auditoría legal, una prueba de intrusión ni una certificación de accesibilidad. Las fuentes de fabricantes se han inventariado desde los datos guardados, sin revalidar todo su contenido externo en esta auditoría.

Evidencias adjuntas: [captura de escritorio](escritorio.jpg), [mediciones del navegador](evidencia-navegador.json), [métricas del repositorio](metricas.json) y [cobertura de datos](datos.json). Las líneas de código citadas son aproximadas y corresponden exclusivamente al commit auditado.

## 3. Estado medido

| Indicador | Resultado | Interpretación |
|---|---:|---|
| Referencias | 1.001 | Sin duplicados detectados por el validador |
| Departamentos / familias | 17 / 79 | Estructura que debe preservarse |
| Referencias con imagen en manifiesto | 641 · 64,0 % | No equivale a 641 fotografías de producto verificadas visualmente |
| Referencias sin imagen en manifiesto | 360 · 36,0 % | Oportunidad importante de mejora de contenido |
| Galerías con varias imágenes | 100 | Necesitan navegación y fallbacks fiables |
| Archivos únicos referenciados | 746 | 687 ráster válidos, 58 SVG válidos y 1 ráster corrupto |
| Peso conjunto de estos archivos | 48.512.894 bytes · 46,3 MiB | Archivo total; no descarga inicial de la página |
| Novedades sin imagen | 9 de 30 | El escaparate prioritario tiene un 30 % sin imagen |
| Selección GMA sin imagen | 0 de 25 | Cobertura completa en manifiesto |
| Registros generados de información técnica | 61 · 6,1 % del catálogo | Cobertura reducida; no implica que el resto tenga datos incorrectos |
| Registros documentados excluidos | 16 | Conservan fuente y datos en los JSON originales |
| HTML principal / alternativo | 263.174 / 313.284 bytes | Documentos grandes con estilos y lógica mezclados |
| Reglas `!important` principal / alternativo | 268 / 312 | Señal de acumulación de sobrescrituras |

## 4. Hallazgos prioritarios

**P1:** corregir antes de considerar estabilizada la siguiente versión. **P2:** siguiente ciclo de calidad. **P3:** mejora posterior. “Confirmado en navegador” significa comportamiento observado; “confirmado en código” identifica una ruta concreta, aunque no se haya forzado el fallo en producción.

### A01 · P1 · Fotografías recortadas por el marco

**Evidencia — navegador y código.** En las tarjetas medidas, las imágenes ocupan 122 px de alto y el marco unos 78,7 px. El padre oculta el desbordamiento. `object-fit: contain` no evita que se recorte la propia caja de la imagen. Afecta, entre otras, a las referencias 5329, 6112, 2323 y 5966. Revisar `.discovery-photo` y sus sobrescrituras de escritorio en `index.html`, alrededor de las líneas 820–829.

**Corrección:** dar dimensiones coherentes al marco y al elemento de imagen; impedir que el contenido mínimo de la cuadrícula fuerce una altura superior. Mantener la proporción del producto y el fondo acordado.

**Aceptación:** la caja de cada imagen queda dentro del marco en todos los tamaños de prueba; productos altos, anchos y cuadrados se ven completos. Comprobar Novedades, Selección, catálogo y detalle por separado.

### A02 · P1 · El botón de añadir invade el título

**Evidencia — navegador.** En las diez tarjetas medidas el botón se superpone al área del título; mide 30 × 30 px. El ajuste reciente para móvil está limitado a anchuras de hasta 600 px y no resuelve el componente completo.

**Corrección:** reservar espacio independiente para imagen, título, referencia y acción. Un título largo no debe competir con el botón. Definir líneas y alturas de texto por componente, con nombre completo accesible en el detalle.

**Aceptación:** cero intersecciones entre rectángulos de texto y controles; referencias siempre visibles; ninguna línea cortada a media altura. Probar nombres largos y zoom de texto.

### A03 · P1 · Archivo de imagen corrupto

**Evidencia — decodificación local.** `images/products/4476.jpg` existe pero no se puede decodificar como imagen. Corresponde al centro de jamón serrano Díaz. El validador actual comprueba existencia, por lo que lo acepta.

**Corrección:** sustituirlo por un original verificado y añadir decodificación al control del manifiesto. Conservar el archivo real y su relación con JSON/manifiesto.

**Aceptación:** todos los ráster decodifican, todos los SVG se analizan, todas las rutas existen y el producto 4476 muestra su imagen en tarjeta y detalle.

### A04 · P1 · Se ocultaron 16 registros con datos documentados

**Evidencia — código y datos.** `scripts/build-product-specs.mjs`, línea 20 aproximadamente, excluye entradas sin `ingredients`, aunque tengan fuente y hechos documentados. El cambio anterior hizo pasar la validación reduciendo de 77 a 61 los registros publicados. Los originales permanecen intactos. El renderizador ya admite ingredientes opcionales.

Referencias afectadas: **Gastrònoms:** 3821, 3876, 3885, 3944, 4404, 5509, 6104. **Díaz:** 121, 425, 796, 797, 803, 4476, 5068, 6153, 989900.

**Corrección:** recuperar los hechos documentados y distinguir información comercial contrastada de ficha técnica completa. Indicar los campos pendientes cuando proceda. Nunca inventar ingredientes ni deducir ausencia de alérgenos. Ajustar el validador a ese modelo explícito.

**Aceptación:** los 16 registros recuperan sus datos respaldados; todos mantienen trazabilidad interna; la ausencia de ingredientes no elimina información válida ni se presenta como una ficha completa.

### A05 · P1 · Diálogos cerrados expuestos y foco fuera del modal

**Evidencia — navegador y código.** Los paneles `sheet`, `filterSheet`, `indexSheet` y `productSheet` cerrados siguen expuestos en el árbol accesible. Ocultarlos mediante desplazamiento u opacidad no retira sus controles de la navegación. Al abrir un producto, el foco permanece en el botón de la tarjeta de fondo. Existe cierre con Escape, pero no se encontró confinamiento de Tab ni fondo inerte.

**Corrección:** estados de apertura accesibles, foco inicial dentro, recorrido de Tab contenido y retorno al activador. Revisar el gestor de paneles y `lockScroll`, alrededor de las líneas 2100 y 3129.

**Aceptación:** un panel cerrado no contiene paradas de teclado ni aparece como diálogo activo; uno abierto recibe el foco, permite cierre y lo devuelve al control de origen. Verificar con teclado y lector de pantalla.

### A06 · P1 · «Guardado» puede mostrarse aunque falle el guardado

**Evidencia — ruta de código.** `saveState`, líneas 2530–2535, absorbe errores de almacenamiento. El envoltorio de la línea 3321 espera la función y marca el estado como guardado aunque aquella haya fallado. Hay además accesos a preferencias de `localStorage` sin protección.

**Corrección:** devolver un resultado explícito de persistencia, distinguir guardado local de otros destinos y conservar el estado de la sesión ante fallos. Mostrar un mensaje preciso si no se puede persistir.

**Aceptación:** simulando almacenamiento bloqueado o cuota agotada, no aparece una confirmación falsa ni se bloquea la aplicación. Con almacenamiento disponible, recargar conserva cantidades y referencias.

### A07 · P1 · El fallback de imagen puede borrar controles

**Evidencia — código.** El manejador global de error, líneas 3286–3291, elimina la imagen y asigna `box.textContent`. Esto reemplaza todos los hijos del contenedor; si contiene navegación o acciones de galería, también desaparecen.

**Corrección:** sustituir únicamente el nodo de imagen o su capa de contenido, manteniendo controles y estructura.

**Aceptación:** una fotografía rota muestra un fallback, pero siguen funcionando añadir, cerrar y pasar a otras fotos válidas.

### A08 · P1 · Horizontal no tiene un comportamiento unificado

**Evidencia — código; pendiente de dispositivo real.** El modo completo de la principal depende de `landscapeBrowseMedia`, `landscapeShowAll` y `!isBroadResult()`. Con búsqueda u otros filtros amplios se vuelve a los lotes con «Mostrar más». «Desplegar todo» restablece parte del estado privado, pero conserva filtros globales. En su modalidad completa puede crear las 1.001 tarjetas de una vez. `/nuevo/` utiliza otra condición de escritorio y no tiene el mismo comportamiento.

**Corrección:** definir un único alcance del resultado: catálogo completo o resultado filtrado, con etiqueta y recuento claros. Mantener el desplazamiento continuo dentro de ese alcance mediante carga progresiva que no obligue a cambiar de subfamilia. Mantener «Desplegar todo» disponible y explicar qué despliega.

**Aceptación:** en horizontal se recorre todo el resultado deslizando, se atraviesan familias sin bloqueos, se puede ampliar/contraer y la rotación conserva selección y filtros. Medir fluidez antes de decidir entre carga progresiva y virtualización.

### A09 · P1 · Los controles actuales no detectan estas regresiones

**Evidencia.** Ambos comandos de validación pasan en el commit auditado pese a A01–A08. No comprueban decodificación, geometría de tarjetas, pérdida de cobertura de datos o comportamiento modal. La validación se centra en `index.html`; el flujo tampoco cubre adecuadamente cambios exclusivos de `nuevo/**`.

**Corrección:** mantener las comprobaciones de integridad y añadir pruebas dirigidas a los fallos reales: imágenes válidas, variación de cobertura, tarjetas sin solapamientos, navegación, guardado fallido y paneles. Incorporar ambas rutas si ambas siguen activas.

**Aceptación:** cada regresión anterior provoca un fallo identificable antes de publicar. Comprobar despliegue y versión servida, además del resultado de CI. La protección de ramas no fue inspeccionada; se recomienda verificarla.

### A10 · P2 · Un departamento expandido no se puede cerrar

**Evidencia — reproducido.** Al pulsar «Aperitivos 14», `aria-expanded` permanece en `true`. El manejador pone `openDept=null`, pero `renderNavigation` vuelve a asignar el departamento activo; líneas 3711–3714 y 3793.

**Corrección:** separar grupo seleccionado de departamento expandido.

**Aceptación:** un segundo clic cierra el departamento sin perder la selección y el estado accesible coincide con el visual.

### A11 · P2 · Las dos versiones comunican cosas distintas

**Evidencia — navegador y código.** La principal muestra «Selección GMA»; `/nuevo/` mantiene «Más vendidas» y etiquetas «Top». La comprobación que evita aquella afirmación solo cubre la principal. El orden y la visibilidad de Novedades también difieren.

**Corrección:** fijar una versión oficial y el propósito de la alternativa. Si no existen datos de ventas que respalden la sección, utilizar una denominación editorial acordada en ambas. Confirmar también las afirmaciones comerciales, como «40 años».

**Aceptación:** mismo significado de secciones y controles en las rutas que se mantengan. El `noindex` de la alternativa puede ser correcto si sigue siendo una prueba; no debe retirarse automáticamente.

### A12 · P2 · El reintento de carga del PDF puede quedarse pendiente

**Evidencia — código.** `loadExternalScript`, líneas 1253–1271, reutiliza un elemento script que pudo haber fallado. Añadir nuevos listeners a ese elemento no repite la descarga. Se reinicia la promesa de carga, pero no se retira el script fallido; tampoco hay timeout.

**Corrección:** registrar estados de carga, retirar recursos fallidos, limitar la espera y ofrecer reintento real. Existe una alternativa de texto que debe conservarse con mensaje claro.

**Aceptación:** probar PDF normal, proveedor externo inaccesible, reintento recuperado y selección extensa; nunca dejar una espera indefinida. La exportación completa queda pendiente de prueba.

### A13 · P2 · El alcance de anterior/siguiente no coincide con lo visible

**Evidencia — navegador y código.** El escritorio muestra inicialmente tres frutos secos; al abrir el primero, el detalle indica «1 de 1001». `getCurrentFilteredItems`, alrededor de la línea 2230, no aplica todo el estado privado del navegador de escritorio.

**Corrección:** acordar si anterior/siguiente recorre la familia visible o el resultado global y mostrar ese alcance claramente. No cambiarlo implícitamente según el modo visual.

**Aceptación:** lista, carrusel y detalle comparten una política predecible de recorrido; cambiar de orientación no modifica silenciosamente el conjunto.

### A14 · P2 · Carrusel automático sin pausa por foco

**Evidencia — código.** `initShowcaseAutoScroll`, líneas 3508–3545, contempla interacción de puntero y movimiento reducido inicial, pero no pausa por foco ni un control explícito. En móvil se duplican tarjetas para el bucle.

**Corrección:** preferir desplazamiento manual o permitir una pausa persistente; detener movimiento mientras se navega con teclado y evitar copias interactivas redundantes.

**Aceptación:** leer o accionar una tarjeta no hace que se desplace; las preferencias de movimiento se respetan y el recorrido accesible no repite artificialmente productos.

### A15 · P2 · Nombres accesibles y superficies de acción mejorables

**Evidencia.** Muchos botones comparten «Añadir a la selección» sin identificar el producto. Los botones medidos tienen 30 px de lado.

**Corrección:** incluir el nombre o referencia en la etiqueta accesible y adoptar como objetivo de diseño controles táctiles de unos 44 px, con separación suficiente. Esta medida es un objetivo del proyecto, no una declaración de incumplimiento normativo por sí sola.

**Aceptación:** una lista de botones en lector de pantalla identifica qué producto se añade; en móvil no hay acciones contiguas fáciles de confundir.

### A16 · P2 · La acumulación de CSS favorece nuevas regresiones

**Evidencia.** 268 y 312 declaraciones `!important`, documentos monolíticos y sucesivas capas de corrección. `productPhotoCropClass` devuelve siempre una cadena vacía, por lo que el ajuste para esa clase no ataca el recorte observado. Los nombres de producto también reciben familias tipográficas diferentes según componente.

**Corrección:** extraer estilos compartidos y definir variables para escala tipográfica, espaciado, altura de controles y marcos. Mantener Geist y Merriweather, con funciones consistentes. Eliminar reglas muertas después de demostrar equivalencia visual.

**Aceptación:** una modificación de tarjeta se valida en sus cuatro contextos; no requiere añadir otra sobrescritura global. Capturas de referencia protegen encabezado, jerarquía, proporciones y navegación.

### A17 · P2 · Cobertura fotográfica y nombres de catálogo

**Evidencia.** Sin imagen en Novedades: 6486, 6777, 5985, 6752, 6809, 6807, 6781, 6791 y 6779. En total hay 360 referencias sin entrada de imagen. Los nombres mezclan abreviaturas, formato y marca, lo que dificulta el ajuste visual.

**Corrección:** priorizar originales verificables de esas nueve novedades. Separar nombre de presentación, marca y formato sin alterar referencia ni denominación maestra. Conservar manifiesto y JSON para imágenes principales y secundarias; nunca fotos incrustadas como Base64.

**Aceptación:** producto inequívoco, referencia visible, fallback digno donde falte foto y trazabilidad interna de cada incorporación. No sustituir fotos reales por imágenes generadas.

### A18 · P2 · Acceso de clientes que no presta el servicio anunciado

**Evidencia — código.** El formulario `accountForm`, alrededor de la línea 3631, borra la contraseña y comunica que el acceso estará disponible próximamente. No se auditó ni utilizó autenticación.

**Corrección:** no solicitar credenciales para una función inexistente; mostrar su disponibilidad real o desarrollar el servicio como proyecto separado.

**Aceptación:** cada acción visible tiene un resultado útil y comprensible; ninguna sugiere que se ha iniciado sesión cuando no existe ese servicio.

### A19 · P2 · Rendimiento: riesgos identificados, sin puntuación medida

**Evidencia.** HTML y CSS voluminosos, numerosas variantes de fuente, fuentes de imagen compartidas entre miniatura y detalle, y hasta 1.001 tarjetas creadas juntas en horizontal. Como puntos positivos, hay carga diferida de imágenes, bibliotecas PDF bajo demanda y `font-display: swap`.

**Corrección:** medir primero en móvil y red limitada. Después reducir trabajo de renderizado, generar tamaños de imagen adecuados y cargar solo las variantes tipográficas necesarias. Evaluar la resiliencia de los scripts externos del PDF.

**Aceptación:** publicar resultados reproducibles de carga y respuesta, con dispositivo y condiciones. No usar el peso total de las 746 imágenes como si fuese el peso inicial ni prometer una puntuación sin medición.

### A20 · P3 · Metadatos y enlaces compartibles incompletos

**Evidencia.** La principal carece de descripción, canonical y Open Graph en su HTML inicial; la alternativa sí dispone de parte de ellos. Compartir producto no ofrece una ruta pública estable de detalle en la interfaz auditada.

**Corrección:** completar metadatos de la página oficial y permitir abrir un producto mediante su referencia en URL. Mantener las decisiones previas sobre enlaces de fabricantes; trazabilidad interna no obliga a exponerlos públicamente.

**Aceptación:** un enlace compartido abre el producto correcto, funciona tras recarga y tiene una vista previa coherente. Revisar privacidad y ciclo de vida de los datos guardados en dispositivos compartidos como trabajo independiente, sin inferir incumplimientos legales.

## 5. Dirección visual recomendada

Usar el estado anterior a Crego (`82f3ca8d013bbd444bdb13b8c89641194098f933`) como referencia comparativa, no como restauración indiscriminada de todo el repositorio. La versión actual incorpora parte de aquel CSS, pero las mediciones demuestran que persisten incompatibilidades con las capas posteriores.

1. **Jerarquía:** Geist para lectura y controles; Merriweather para títulos editoriales, con una asignación explícita y estable. Ajustar escala y altura de línea, no encoger todo para que quepa.
2. **Tarjetas:** marco de imagen completo, nombre legible, referencia independiente y acción con espacio reservado. Probar el nombre más largo antes de aprobar el componente.
3. **Densidad:** evitar un escaparate demasiado comprimido; decidir anchura mínima de tarjeta según contenido, no solo cuántas caben.
4. **Consistencia:** mismos estados de selección, carga, ausencia de foto y error en todos los modos.
5. **Estabilidad:** encabezado, estructura de familias, identidad y colores requieren una comparación explícita antes de cualquier cambio. El arreglo de una tarjeta no debe alterar el encabezado.

## 6. Plan de ejecución y publicación

| Etapa | Trabajo | Condición de salida |
|---|---|---|
| 1 · Base protegida | Capturas del estado aceptado, registro de decisiones y separación de rutas oficial/experimental | Referencia de diseño y alcance escritos |
| 2 · Integridad y confianza | A03–A07: imagen, datos suprimidos, modales, guardado y fallback | Pruebas específicas superadas y datos recuperados con su estado correcto |
| 3 · Componentes y navegación | A01, A02, A08, A10, A13–A15 | Tarjetas sin recortes/solapes; navegación continua y accesible |
| 4 · Coherencia y mantenimiento | A11, A12, A16, A18 | Ambas rutas bajo control y acciones fiables |
| 5 · Calidad de contenido y carga | A17, A19, A20 | Cobertura prioritaria mejorada y mediciones de rendimiento disponibles |
| 6 · Publicación | Integridad, pruebas funcionales, comparación visual, despliegue y revisión de URL pública | Commit servido identificado y ausencia de regresiones comprobada |

Realizar cambios por bloques pequeños con vista previa. Conservar un commit de retorno conocido y un registro de qué se ha modificado. Evitar que una importación de datos incluya cambios de estilo sin relación. El registro debe permitir continuar en otro chat sin reconstruir decisiones de memoria.

## 7. Matriz mínima antes de publicar

| Entorno | Recorridos obligatorios |
|---|---|
| Móvil vertical, anchuras 320, 375, 390 y 430 px | Encabezado, Novedades, Selección, nombres largos, referencias y botones; barra inferior sin tapar contenido |
| Móvil horizontal, anchuras 667, 844 y 932 px | Catálogo completo y filtrado, atravesar varias familias deslizando, desplegar/contraer y rotar de nuevo |
| Tableta y escritorio, 768, 1024 y 1366 px | Navegación por departamento, colapsar, detalle, galerías y selección |
| Safari en iPhone y navegador Android reales | Scroll, orientación, teclado virtual, áreas seguras, selección persistente y exportación |
| Teclado y lector de pantalla | Abrir/cerrar paneles, Tab, Escape, retorno de foco, nombres de acciones y movimiento pausado |
| Errores controlados | Imagen rota, almacenamiento no disponible, biblioteca PDF bloqueada y reintento |
| Datos y publicación | 1.001 refs conservadas, JSON/manifiesto coherentes, imágenes decodificables, cobertura sin pérdidas silenciosas y ambas rutas comprobadas |

Comprobar búsqueda con y sin resultados; selección, cantidades y recarga; producto sin foto y con varias fotos; filtro de novedades; navegación anterior/siguiente; PDF pequeño y extenso. Usar datos ficticios en pruebas de selección y exportación.

## 8. Qué significa llegar al nivel profesional

El criterio de cierre será observable: ningún producto recortado por error, ningún texto invadido por botones, controles que siempre responden, desplazamiento que corresponde al alcance anunciado, información contrastada que no desaparece, guardado que dice la verdad y una publicación reproducible con comprobación visual.

La web tiene material suficiente para alcanzar ese nivel. La siguiente intervención debe resolver primero estos defectos y demostrar el resultado en los recorridos anteriores; una nueva estética por sí sola no cerraría la auditoría.
