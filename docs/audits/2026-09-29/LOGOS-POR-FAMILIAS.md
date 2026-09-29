# Logos organizados por especialidad

Petición: evitar marcas de jamón entre los vinos, ordenar el conjunto por familias con equilibrio visual y proponer un efecto. Base: 52b584d.

39 marcas, cada una una sola vez, en seis bloques: Jamones, embutidos y carnes (8); Quesos y lácteos (3); Pescados, aperitivos y conservas (5); Pasta, harinas y panadería (5); Patés y cocina preparada (3); Vinos y espumosos (15). Las marcas multicategoría se asignan por especialidad editorial, sin modificar categorías de productos. Galván y Cecinas Pablo quedan junto al resto de jamones/embutidos. Vinos agrupados al final.

data/brand-groups.json conserva el orden y criterio. scripts/render-brand-groups.mjs genera las dos secciones HTML y valida que todas las marcas aparezcan exactamente una vez; no ejecuta retoques de imagen. assets/brands.css mantiene tamaños de logo y ventanas existentes, centra las últimas filas, añade títulos discretos y separadores. B&G, cuya fuente es blanca con alfa, recibe filtro CSS oscuro para verse en fondo blanco. No se redibujan logos ni se añaden enlaces.

Efecto propuesto, todavía sin aplicar: entrada suave por bloque al llegar a pantalla, una sola vez, con opacidad y desplazamiento mínimo, respetando movimiento reducido. No se añade animación en esta publicación.

Validación: npm ci y npm test, 21 pruebas correctas. Chromium en principal y alternativa: 320, 390, 430, 844×390 y 1366×900, 39 imágenes cargadas/decodificadas, seis bloques y ningún desbordamiento. Capturas revisadas; contraste de B&G corregido después de detectar la fuente blanca. No probado en móvil físico. Confirmar bytes públicos al publicar.
