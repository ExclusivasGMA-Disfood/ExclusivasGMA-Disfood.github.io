import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const imagesDir = path.join(root, 'images', 'products');
const referencesPath = path.join(root, 'data', 'references.json');
const outputPath = path.join(root, 'data', 'images-manifest.json');
const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const references = JSON.parse(fs.readFileSync(referencesPath, 'utf8'));
const files = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name)
  .filter(name => allowed.has(path.extname(name).toLowerCase()));

const manifest = {};
const invalid = [];
const duplicates = [];

for (const name of files) {
  const ext = path.extname(name).toLowerCase();
  const ref = path.basename(name, ext); // String: preserves leading zeros.

  if (!Object.prototype.hasOwnProperty.call(references, ref)) {
    invalid.push(name);
    continue;
  }

  if (manifest[ref]) {
    duplicates.push([ref, manifest[ref], `images/products/${name}`]);
    continue;
  }

  manifest[ref] = `images/products/${name}`;
}

if (invalid.length) {
  console.warn('Images ignored because the reference is not in data/references.json:');
  for (const name of invalid) console.warn(`  - ${name}`);
}

if (duplicates.length) {
  console.error('Duplicate primary image references detected:');
  for (const [ref, a, b] of duplicates) console.error(`  - ${ref}: ${a} / ${b}`);
  process.exit(1);
}

// Preserve tariff/reference order rather than converting refs to numbers.
const ordered = {};
for (const ref of Object.keys(references)) {
  if (manifest[ref]) ordered[ref] = manifest[ref];
}

fs.writeFileSync(outputPath, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
console.log(`Manifest generated: ${Object.keys(ordered).length} images for ${Object.keys(references).length} valid references.`);
