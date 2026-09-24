import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(join(root, 'data/pasta-rellena-info.json'), 'utf8'));
const outputPath = join(root, 'data/product-specs.js');
const specs = {};

for (const [ref, entry] of Object.entries(source)) {
  // Only publish written technical details when the source and ingredient list exist.
  if (!entry.source || !entry.ingredients) continue;
  specs[ref] = {
    title: `Datos declarados · ${entry.brand}`,
    facts: entry.facts.filter(([label, value]) => label && value),
    ingredients: entry.ingredients,
    source: entry.source,
  };
}

const output = `// Generado desde pasta-rellena-info.json con build-product-specs.mjs.\nwindow.GMA_VERIFIED_PRODUCT_INFO = ${JSON.stringify(specs)};\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(outputPath, 'utf8') !== output) {
    throw new Error('data/product-specs.js está desactualizado; ejecuta node scripts/build-product-specs.mjs');
  }
} else {
  writeFileSync(outputPath, output);
}
console.log(`${Object.keys(specs).length} fichas técnicas con fuente e ingredientes`);
