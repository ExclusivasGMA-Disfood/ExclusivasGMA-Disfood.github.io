import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sources = [
  'data/pasta-rellena-info.json',
  'data/ahumados-dominguez-info.json',
  'data/montesano-info.json',
  'data/crego-info.json',
  'data/diaz-info.json',
  'data/la-finca-info.json',
  'data/marzo-info.json',
  'data/avance-import-info.json',
  'data/cecinas-pablo-info.json',
  'data/italian-beverages-info.json',
  'data/galvan-info.json',
  'data/villani-info.json',
  'data/pagani-info.json',
  'data/le-5-stagioni-info.json',
  'data/selec-mardis-info.json',
  'data/viander-info.json',
  'data/gran-bologna-info.json',
  'data/san-esteban-info.json',
];
const outputPath = join(root, 'data/product-specs.js');
const specs = {};

for (const sourcePath of sources) {
  const source = JSON.parse(readFileSync(join(root, sourcePath), 'utf8'));
  for (const [ref, entry] of Object.entries(source)) {
    // Publicar hechos documentados; los ingredientes son un campo opcional explícito.
    if (!entry.source || !Array.isArray(entry.facts) || !entry.facts.some(([label, value]) => label && value)) continue;
    if (specs[ref]) throw new Error(`Referencia repetida entre fabricantes: ${ref}`);
    specs[ref] = {
      title: `Datos declarados · ${entry.brand}`,
      completeness: entry.ingredients ? 'with-ingredients' : 'facts-only',
      facts: entry.facts.filter(([label, value]) => label && value),
      ...(entry.ingredients ? { ingredients: entry.ingredients } : {}),
      source: entry.source,
      ...(entry.image_note ? {imageNote:entry.image_note} : {}),
      ...(entry.origin ? { origin: entry.origin } : {}),
    };
  }
}

const output = `// Generado desde ${sources.join(' + ')} con build-product-specs.mjs.\nwindow.GMA_VERIFIED_PRODUCT_INFO = ${JSON.stringify(specs)};\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(outputPath, 'utf8') !== output) {
    throw new Error('data/product-specs.js está desactualizado; ejecuta node scripts/build-product-specs.mjs');
  }
} else {
  writeFileSync(outputPath, output);
}
console.log(`${Object.keys(specs).length} registros documentados con estado de ingredientes`);
