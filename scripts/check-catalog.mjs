import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Script, runInNewContext } from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(join(root, path), 'utf8');
const html = read('index.html');
const context = { window: {} };
runInNewContext(read('data/catalog-data.js'), context);
runInNewContext(read('data/product-specs.js'), context);

const groups = context.window.GMA_CATALOG_DATA;
const departments = context.window.GMA_CATALOG_DEPARTMENTS;
const curation = context.window.GMA_CATALOG_CURATION;
const specs = context.window.GMA_VERIFIED_PRODUCT_INFO;
const referenceFile = JSON.parse(read('data/references.json'));
const manifest = JSON.parse(read('data/images-manifest.json'));
const errors = [];
const fail = message => errors.push(message);
const products = groups.flatMap(group => group.items);
const refs = new Set();

if (products.length !== Object.keys(referenceFile).length) fail('El número de referencias difiere de data/references.json');
for (const item of products) {
  if (!item.ref || !item.n || !Object.hasOwn(referenceFile, item.ref)) fail(`Referencia no válida: ${item.ref}`);
  if (refs.has(item.ref)) fail(`Referencia duplicada: ${item.ref}`);
  refs.add(item.ref);
  if (Object.keys(item).some(key => /^(price|precio|coste|cost|tarifa)$/i.test(key))) fail(`Precio no público: ${item.ref}`);
}
for (const group of groups) {
  if (!departments.some(dept => dept.name === group.dept)) fail(`Departamento sin definir: ${group.dept}`);
}
for (const [name, expected] of [['featured', 8], ['new', 6]]) {
  const selected = curation[name];
  if (!Array.isArray(selected) || selected.length !== expected) fail(`Selección ${name}: cantidad inesperada`);
  if (!Array.isArray(selected)) continue;
  if (new Set(selected).size !== selected.length) fail(`Selección ${name}: referencias duplicadas`);
  for (const ref of selected) {
    if (!refs.has(ref)) fail(`Selección ${name}: falta la referencia ${ref}`);
    if (!manifest[ref]) fail(`Selección ${name}: falta foto de ${ref}`);
    if (name === 'new' && !products.find(p => p.ref === ref)?.isNew) fail(`Novedad sin marcar: ${ref}`);
  }
}
for (const [ref, value] of Object.entries(manifest)) {
  if (!refs.has(ref)) fail(`Imagen asignada a una referencia inexistente: ${ref}`);
  const images = Array.isArray(value) ? value : [value];
  if (new Set(images).size !== images.length) fail(`Imágenes repetidas en ${ref}`);
  for (const path of images) {
    if (typeof path !== 'string' || !path.startsWith('images/products/') || !existsSync(join(root, path))) {
      fail(`Falta la imagen de ${ref}: ${path}`);
    }
  }
}
for (const [ref, info] of Object.entries(specs)) {
  if (!refs.has(ref) || !info.source || !info.facts?.length || !['with-ingredients','facts-only'].includes(info.completeness)) fail(`Ficha técnica incompleta: ${ref}`);
  if (info.source?.startsWith('images/') && !existsSync(join(root, info.source))) fail(`Fuente local inexistente: ${ref}`);
}
for (const page of ['index.html','nuevo/index.html']) {
  const content=read(page);
  for (const match of content.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if(match[1].includes('application/ld+json')){JSON.parse(match[2]);continue;}
    const src=match[1].match(/src="([^"?]+)/)?.[1];
    if(src&&!src.startsWith('http'))new Script(read(src));
    else if(match[2].trim())new Script(match[2]);
  }
  if (/20 sugerencias|<h2>Más vendidas<\/h2>/.test(content)) fail(`${page}: selección presentada como ventas reales`);
  if (/data:image\/[^;]+;base64/.test(content)) fail(`${page}: imagen incrustada en Base64`);
  for(const id of ['desktopExpandAll','productSheet','searchSuggestions','lightboxSelect']){
    if(!content.includes(`id="${id}"`))fail(`${page}: falta ${id}`);
  }
}
// A source with verified facts may not disappear merely because ingredients are missing.
for(const file of ['pasta-rellena','ahumados-dominguez','montesano','crego','diaz']){
  const entries=JSON.parse(read(`data/${file}-info.json`));
  for(const [ref,info] of Object.entries(entries)){
    if(info.source&&info.facts?.some(([k,v])=>k&&v)&&!specs[ref])fail(`Datos documentados excluidos: ${ref}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Catálogo válido: ${products.length} referencias, ${Object.keys(manifest).length} productos con foto, ${Object.keys(specs).length} fichas contrastadas`);
}
