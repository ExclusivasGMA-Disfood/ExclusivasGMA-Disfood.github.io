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
for (const [name, expected] of [['featured', 25], ['new', 30]]) {
  const selected = curation[name];
  if (!Array.isArray(selected) || selected.length !== expected) fail(`Selección ${name}: cantidad inesperada`);
  if (!Array.isArray(selected)) continue;
  if (new Set(selected).size !== selected.length) fail(`Selección ${name}: referencias duplicadas`);
  for (const ref of selected) if (!refs.has(ref)) fail(`Selección ${name}: falta la referencia ${ref}`);
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
  if (!refs.has(ref) || !info.ingredients || !info.source) fail(`Ficha técnica incompleta: ${ref}`);
  if (info.source?.startsWith('images/') && !existsSync(join(root, info.source))) fail(`Fuente local inexistente: ${ref}`);
}
for (const [, source] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  if (source.trim()) new Script(source);
}
if (/20 sugerencias|<h2>Más vendidas<\/h2>/.test(html)) fail('El escaparate aún se presenta como ventas reales');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Catálogo válido: ${products.length} referencias, ${Object.keys(manifest).length} productos con foto, ${Object.keys(specs).length} fichas contrastadas`);
}
