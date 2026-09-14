import fs from 'node:fs';
import path from 'node:path';
const refs = JSON.parse(fs.readFileSync('data/references.json','utf8'));
const dir = 'images/products';
const allowed = new Set(Object.keys(refs));
const groups = {};
for (const name of fs.readdirSync(dir).sort()) {
  const ext = path.extname(name).toLowerCase();
  if (!['.jpg','.jpeg','.png','.webp'].includes(ext)) continue;
  const stem = path.basename(name, ext);
  const match = stem.match(/^(.*?)(?:-(\d+))?$/);
  const ref = match[1];
  if (!allowed.has(ref)) continue;
  const order = match[2] ? Number(match[2]) : 1;
  (groups[ref] ||= []).push({order,url:'images/products/'+name});
}
const manifest = {};
for (const ref of Object.keys(groups).sort()) {
  const urls = groups[ref].sort((a,b)=>a.order-b.order).map(x=>x.url);
  manifest[ref] = urls.length === 1 ? urls[0] : urls;
}
fs.writeFileSync('data/images-manifest.json', JSON.stringify(manifest,null,2)+'\n');
console.log('Manifest actualizado:', Object.keys(manifest).length, 'referencias con foto');
