# Fotos aportadas: Izzimo y San Marco

Petición: preparar las dos fotos como las demás y asignarlas a sus productos. Base main 4c7e91b8b582a4a70f90f709c2dc725994b8a0c1.

Correspondencias por marca y producto: Izzimo → 6739 Mozzarella Izzimo Rallada Premium 100 (6 X 2 KG); Züger Mozzarella San Marco → 6163 Mozzarella San Marco (5 * 2 KG). Ambas permanecen en Quesos y Lácteos / Quesos Italianos / Mozzarella. Las dos referencias carecían de foto en el manifiesto.

Fuentes: fotos adjuntas 5608ec31-cf3c-4d02-9fb5-8ccc1f336eff.jpeg y 84dbdb4b-43ea-4123-bd67-8659b10e72b6.jpeg, conservadas como originales en los archivos del usuario. Derivadas mediante herramienta image_gen integrada, fondo blanco, bolsa completa y centrada. Revisión visual del envase y marcas; la edición generativa no es una reproducción idéntica píxel a píxel y no se utiliza para extraer datos técnicos de la etiqueta. No se incorporan ingredientes ni datos nuevos.

Prompt aplicado a cada foto: Use case: background-extraction. Edit the supplied product photograph for a food wholesale catalog. Change ONLY the green table background to pure white. Preserve the exact photographed bag, its shape, transparent seals, folds, colors, all printed branding and every text character, and the cheese seen through the plastic. Do not redraw, redesign, invent or improve packaging. Center the COMPLETE bag, upright as photographed, on a square white canvas, bag occupying 90% of canvas height, with comfortable margin on every side. No clipping. No added text or props. Output a single product photo.

Archivos finales: images/products/6739-foto-gma.jpg y images/products/6163-foto-gma.jpg, JPEG 1000×1000, calidad 90. Añadidas dos entradas en data/images-manifest.json. Fotos como archivos, sin imágenes incrustadas. Diseño y lógica de catálogo intactos; se reutilizan los marcos contain existentes y su margen interior.

Validación: npm ci y npm test, 16 pruebas superadas; 1.001 referencias, 718 productos con foto, 852 imágenes verificadas. Chromium local en ambas rutas a 390×844 y 844×390: búsqueda por las dos referencias, carga de la foto correcta, capturas y ausencia de desbordamiento horizontal. No pruebas en dispositivos físicos ni cambios geométricos. git diff --check. Publicar sin force y comprobar despliegue y contenido público.
