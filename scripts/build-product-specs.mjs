import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sources = [
  'data/pasta-rellena-info.json',
  'data/ahumados-dominguez-info.json',
  'data/montesano-info.json',
  'data/crego-info.json',
];
const outputPath = join(root, 'data/product-specs.js');
const specs = {};

for (const sourcePath of sources) {
  const source = JSON.parse(readFileSync(join(root, sourcePath), 'utf8'));
  for (const [ref, entry] of Object.entries(source)) {
    // Publicar solo fichas con una fuente verificable y lista de ingredientes.
    if (!entry.source || !entry.ingredients) continue;
    if (specs[ref]) throw new Error(`Referencia repetida entre fabricantes: ${ref}`);
    specs[ref] = {
      title: `Datos declarados · ${entry.brand}`,
      facts: entry.facts.filter(([label, value]) => label && value),
      ingredients: entry.ingredients,
      source: entry.source,
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
console.log(`${Object.keys(specs).length} fichas técnicas con fuente e ingredientes`);
