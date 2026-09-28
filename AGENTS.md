# Continuidad del catálogo GMA

Antes de editar, leer `PROJECT_STATUS.md` y el registro de cambios relevante en `docs/audits/`.

- Trabajar sobre la versión publicada de `main`. Comprobar el estado remoto antes de publicar; nunca sustituirla por una rama de auditoría o por `/nuevo/`.
- Una petición de información o fotos de proveedor no autoriza cambios de diseño.
- Corregir los problemas concretos indicados por el usuario. No cambiar simultáneamente tamaños de tarjetas, fuentes, cabecera, colores o estructura por preferencia propia.
- Vista Lista / Carrusel / Visual y Desplegar / Recoger todo deben permanecer en la misma fila en móvil. En horizontal, mantener juntos los controles de vista y desplegado.
- Las fotografías de producto se muestran completas, centradas y con margen interior. No usar cover, zoom, desplazamientos o recortes automáticos para llenar el marco.
- Conservar Geist y Merriweather, las familias y subfamilias, los datos y las imágenes con su manifiesto JSON. No incrustar fotografías en Base64.
- Registrar cada publicación: petición, archivos afectados, comportamiento cambiado, comprobaciones y limitaciones. Una captura de escritorio no demuestra que el móvil esté bien.
- Para cambios de disposición comprobar 320, 390 y 430 px en vertical, 844 x 390 en horizontal y escritorio; todas las vistas afectadas. Los tests de DOM no sustituyen esta comprobación visual.
- No presentar como «todo perfecto» una revisión parcial. Distinguir entre pruebas en navegador y pruebas en dispositivos físicos.
