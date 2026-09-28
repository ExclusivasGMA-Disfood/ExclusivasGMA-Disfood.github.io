# Registro: controles y encuadre del catálogo

## Petición del usuario

Revisar la web actual, sin volver a otra versión. Mantener Desplegar todo junto a Lista / Carrusel / Visual. Mostrar las fotografías completas y con margen. Dejar historial verificable y evitar cambios ajenos a la petición.

## Publicaciones de esta sesión

| Commit | Actuación | Resultado |
| --- | --- | --- |
| b9f7d9f | Reparaciones funcionales y nuevas reglas compartidas de geometría | También amplió las tarjetas y cambió fuentes de producto; el usuario rechazó esos cambios visuales. |
| 320ba37 | Retirada de ampliaciones y recuperación de las fuentes del tema | No corrigió la regla de salto de línea ni el recorte de fotos en listas móviles. |
| 8a9a3e3 | Separación de nombre y botón de tarjeta | Se comprobó escritorio; esa comprobación fue insuficiente para afirmar resuelto el móvil. |
| 66be45d | Prueba aislada de alineación y encuadre | Añade únicamente `/revision/`; no cambia los archivos que usa la página principal. |

## Diagnóstico actual

- `catalog-components.css` introdujo `flex-wrap:wrap` en el control móvil. La regla del tema asignaba a `.view-switch` un ancho del 100 %. La combinación permitía una segunda línea para Desplegar todo.
- `.item-photo img` conservaba `object-fit:cover` sin margen. En Lista / Carrusel / Visual podía recortar fotografías no cuadradas; las reparaciones anteriores habían cubierto escaparates y escritorio, pero no este selector móvil.
- Persisten reglas históricas `product-photo-crop` con 240 % y desplazamientos. La función actual `productPhotoCropClass()` devuelve vacío: no se ha demostrado que ese zoom estuviera activo en las tarjetas actuales. Se neutraliza como regla residual, sin atribuirle los recortes observados.
- Las ramas remotas existentes al revisar son `main`, `codex/auditoria-catalogo-movil` y `codex/auditoria-integral-20260928`. Las publicaciones recientes de Pages proceden de `main`. `/nuevo/` es una ruta alternativa del mismo repositorio.

## Alcance de la corrección

- Barra móvil sin salto de línea: las vistas ocupan el espacio disponible y Desplegar / Recoger conserva su espacio.
- Controles de escritorio y horizontal en la misma fila; el título puede ocupar una fila superior en anchos intermedios.
- Fotografías completas mediante `contain`, centradas, con margen interior del 8 %; miniaturas de selección con 4 px. El marco mantiene sus dimensiones actuales.
- No cambia el catálogo, el manifiesto, los archivos de imagen, las fuentes, los anchos de tarjeta, la cabecera, las familias ni la lógica de selección.
- `AGENTS.md` documenta las reglas de continuidad para futuros chats.

## Verificación

- Principal: 320, 390 y 430 px, en Lista / Carrusel / Visual: 9 combinaciones; controles en la misma fila, sin desbordamiento horizontal y sin imágenes visibles con `cover` o fuera de su marco.
- Desplegar abre las 79 familias. En horizontal 844 x 390 se muestra el conjunto de 1.001 productos y el control permanece junto a las vistas.
- Escritorio 1280 x 900: controles alineados; fotografías cargadas con `contain` y margen del 8 %.
- Ficha ampliada a 390 px: imagen dentro de su marco, centrada, sin zoom ni recorte.
- `npm test`: 8 pruebas superadas; 748 archivos de imagen válidos; catálogo de 1.001 referencias y 77 fichas documentadas.
- La comprobación responsive usa ventanas dentro de un navegador Chromium. No es una prueba física de Safari iPhone o de tablets Android. Se comprobaron las imágenes renderizadas de muestra; no se ha revisado visualmente cada una de las 748 fotografías.
- La página alternativa comparte esta corrección; su validación funcional está incluida en los tests. La matriz visual anterior corresponde a la principal.

No se puede recuperar contenido ya cortado dentro del archivo original mediante CSS. No se simula una fotografía que falta.
