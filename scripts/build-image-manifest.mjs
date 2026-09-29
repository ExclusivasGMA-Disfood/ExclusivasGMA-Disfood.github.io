import fs from 'node:fs';
import path from 'node:path';
const refs = JSON.parse(fs.readFileSync('data/references.json','utf8'));
const dir = 'images/products';
const allowed = new Set(Object.keys(refs));
// Estas referencias tienen una fotografía editorial nueva que sustituye por
// completo a las antiguas tomas de proveedor. Evitamos que una reconstrucción
// futura del manifiesto vuelva a añadir imágenes secundarias obsoletas.
const singleEditorialPhotoRefs = new Set(['6740', '6742', '6743', '6744', '6745', '6750']);
const preferredProductPhotos = new Map([
  ['3165', '3165-sanesteban.png'],
  ['2785', '2785-sanesteban.png'],
  ['2753', '2753-sanesteban.png'],
  ['2752', '2752-sanesteban.png'],
  ['3400', '3400-sanesteban.png'],

  ['962', '962-granbologna.png'],
  ['967', '967-granbologna.png'],
  ['1347', '1347-granbologna.png'],
  ['25', '25-granbologna.png'],
  ['986', '986-granbologna.png'],
  ['995', '995-granbologna.png'],
  ['2152', '2152-granbologna.png'],
  ['610', '610-granbologna.png'],
  ['199', '199-granbologna.png'],
  ['604', '604-granbologna.png'],
  ['957', '957-granbologna.png'],
  ['2204', '2204-granbologna.png'],
  ['2205', '2205-granbologna.png'],
  ['959', '959-granbologna.png'],
  ['2203', '2203-granbologna.png'],
  ['2218', '2218-granbologna.png'],
  ['1996', '1996-oficial-marzo.webp'],
  ['1999', '1999-oficial-marzo.webp'],
  ['853', '853-2.webp'],
  ['5311', '5311-2.webp'],
  ['5722', '5722-fondo-blanco-selec-mardis.jpg'],
  ['5867', '5867-2.webp'],
  ['6607', '6607-oficial-divella.jpg']
]);
const groups = {};
for (const name of fs.readdirSync(dir).sort()) {
  const ext = path.extname(name).toLowerCase();
  if (!['.jpg','.jpeg','.png','.webp','.svg'].includes(ext)) continue;
  const stem = path.basename(name, ext);
  const match = stem.match(/^(\d+)(.*)$/);
  if (!match) continue;
  const ref = match[1];
  if (!allowed.has(ref)) continue;
  if (preferredProductPhotos.has(ref) && name !== preferredProductPhotos.get(ref)) continue;
  const suffix = match[2];
  if (singleEditorialPhotoRefs.has(ref) && suffix) continue;
  const numbered = suffix.match(/^-(\d+)$/);
  const order = suffix === '-producto-tre-archi' || suffix === '-producto-selec-mardis'
    ? 0
    : suffix === '-informacion-tre-archi' || suffix === '-informacion-pasta' || suffix === '-informacion-fabricante'
      ? 100
      : numbered
        ? 10 + Number(numbered[1])
        : 10;
  (groups[ref] ||= []).push({order,url:'images/products/'+name});
}
const manifest = {};
for (const ref of Object.keys(groups).sort()) {
  const urls = groups[ref].sort((a,b)=>a.order-b.order).map(x=>x.url);
  manifest[ref] = urls.length === 1 ? urls[0] : urls;
}
// Galería vinculada manualmente: mantenerla al incorporar fotos nuevas.
if (manifest['989900'] && fs.existsSync('images/products/4476.jpg')) manifest['989900']=[...new Set([].concat(manifest['989900'],'images/products/4476.jpg'))];
fs.writeFileSync('data/images-manifest.json', JSON.stringify(manifest,null,2)+'\n');
console.log('Manifest actualizado:', Object.keys(manifest).length, 'referencias con foto');
