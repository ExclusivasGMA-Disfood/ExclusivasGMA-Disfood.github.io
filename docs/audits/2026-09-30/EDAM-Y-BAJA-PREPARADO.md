# Edam 6715 y retirada 6617

Petición: eliminar el preparado rallado a base de mozzarella 6617 y añadir la fotografía aportada del Edam Corona D’Oro 6715 sobre blanco. No tocar nada más. Base: a98012c.

Retirada 6617 de data/catalog-data.js y data/references.json: no aparece en catálogo, búsquedas ni fichas. El mapa histórico de IDs se conserva para no reasignar selecciones antiguas, igual que las bajas anteriores. 998 referencias, 990 tarjetas.

Foto 6715: images/products/6715-edam-blanco.webp, vinculada en data/images-manifest.json. Edición mediante image_gen integrado de la foto aportada: sustituir cartón por blanco puro, enderezar y centrar el envase completo, conservar producto y etiqueta, iluminación neutra y sombra leve. Es una edición generativa, no una nueva fotografía del fabricante; no se extraen datos técnicos de la etiqueta generada. Fuente adjunta: 93164fd3-36a0-446b-90f2-61603a191def.jpeg. Prompt: “Remove cardboard background completely and replace with pure white #FFFFFF. Preserve the exact Corona D’Oro Edam sliced cheese 1 kg package, actual cheese, transparent plastic tray, label and all printed lettering faithfully. Straighten the tray, full package visible, centered, neutral studio illumination.”

Solo versionado del recurso de datos en ambos HTML; sin cambios CSS, geometría, tipografías, colores ni otros productos. Recuentos esperados actualizados en pruebas existentes.

Validación: npm ci y npm test, 21/21 pruebas, 849 imágenes válidas y 726 referencias con foto. Comparación estructural antes/después confirma que el único cambio en datos de producto es la baja 6617. Imagen editada revisada visualmente. Sin comprobación visual del sitio en navegador: Chromium no está instalado y su descarga devuelve un archivo inválido. Sin prueba física en iPhone.
