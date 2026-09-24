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
fs.writeFileSync('data/images-manifest.json', JSON.stringify(manifest,null,2)+'\n');
console.log('Manifest actualizado:', Object.keys(manifest).length, 'referencias con foto');
