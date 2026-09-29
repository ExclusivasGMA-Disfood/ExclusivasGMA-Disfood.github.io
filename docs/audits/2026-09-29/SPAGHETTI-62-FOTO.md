# Foto correcta para espaguetis Divella 62

Petición: retirar la mozzarella antigua asignada por error y usar la segunda foto. Base main: 7dee455118f8ef253c8dab6db42b85c3df683520.

Inspección visual de images/products/62-2.webp: envase Divella Spaghetti Ristorante 8, 500 g; corresponde a la referencia 62. Se conserva como única imagen, ya centrada sobre blanco y con producto completo. Se elimina images/products/62.jpg (mozzarella antigua) y se actualiza data/images-manifest.json. Suprimir el archivo impide que la reconstrucción automática lo vuelva a incorporar. No se toca 062, referencia distinta.

Sin cambios de diseño, datos comerciales ni otras fotografías. Validación: npm ci y npm test, 16 pruebas; 1.001 referencias, 718 con foto y 851 imágenes válidas. Reconstrucción del manifiesto y diff limitados a 62. Inspección de imagen fuente; sin nueva prueba geométrica o en dispositivo físico. git diff --check. Publicación sin force y verificación del despliegue/manifiesto público.
