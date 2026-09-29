# Formato Dimardis de medio kilo y textos señalados

Petición: adaptar la imagen de la referencia 4830 al formato de ½ KG y corregir mayúsculas/minúsculas, incluido el preparado de mozzarella 6617. Base: 19721d2.

La foto anterior de 4830 mostraba una lata marcada 2.500 g. Se sustituye por images/products/4830-500g.jpg, adaptación visual solicitada mediante image_gen integrado a partir de 2631-frontal.jpg. No es una fotografía nueva obtenida del fabricante. Prompt aplicado: conservar marca Selec Mardis, etiqueta negra/dorada, botella, tomates y bol; representar lata pequeña de 500 gramos con lados verticales, perspectiva frontal, peso 500 G, producto completo y fondo blanco. El resultado imprime 500 g (notación del envase), revisado visualmente; JPEG 1000×1000. El original grande permanece para 2631 y el anterior 4830.jpg se retira del árbol actual. Se actualizan manifiesto y encuadre manual JSON, con margen del 8 %.

Nombres finales: «Tomate frito casero (½ KG) (Dimardis)», «Tomate frito casero (3 KG) (Dimardis)» y «Preparado rallado a base de mozzarella (6 × 2 KG) (Casa Italiana)». Selector Dimardis con KG. No se infiere nueva información técnica ni se modifica el formato comercial grande. No se cambia diseño ni el resto de referencias.

Validación: npm ci y npm test, 21 pruebas correctas; 999 referencias, 722 con foto y 855 imágenes válidas. Chromium en ambas rutas, 390×844 y 844×390: búsqueda 4830, foto pequeña, apertura, cambio a 2631 con foto grande y regreso a 4830; búsqueda 6617 y texto normalizado. Captura revisada. Sin prueba física en iPhone. Comprobar despliegue y archivos públicos antes de confirmar publicación.
