# Cecinas Pablo y Morra — fondos y escala

Petición: quitar los fondos blancos de ambos logos y proporcionar Cecinas Pablo al resto del panel.

Se crean dos derivados PNG con transparencia real, conservando los originales y sus trazos. Conversión determinista a monocromo con cobertura alfa derivada de luminancia; solo se elimina ruido casi blanco. Cecinas Pablo tenía un lienzo 98×127 con marca útil de 87×43: se elimina el margen vacío y se normaliza el derivado a 348×172 para usar la altura máxima común del panel. No se redibuja la marca ni se afirma mayor resolución de origen. Morra conserva 314×200 y su escudo gris.

Archivos: los dos derivados, data/brands-manifest.json, index.html y nuevo/index.html. En cada HTML solo cambian las rutas de las dos imágenes y las dimensiones de Cecinas Pablo. CSS, rejilla, restantes marcas, productos y navegación intactos.

Verificación: npm ci y npm test: 12 pruebas superadas, 832 imágenes válidas, 1.001 referencias y 150 fichas documentadas. Inspección de ambos PNG sobre fondo gris junto a otros logos; canal alfa y dimensiones comprobados. No se ha realizado validación visual en navegador ni en dispositivo físico en esta sesión. Se comprueban archivos publicados y ejecución de GitHub Pages al desplegar.
