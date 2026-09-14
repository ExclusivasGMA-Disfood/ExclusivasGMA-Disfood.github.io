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
const slots = {};

for (const name of files) {
  const ext = path.extname(name).toLowerCase();
  const stem = path.basename(name, ext);
  const match = stem.match(/^(.*?)(?:-(\d+))?$/);
  const ref = match[1]; // String: preserves leading zeros.
  const slot = match[2] ? Number(match[2]) : 1;

  if (!Object.prototype.hasOwnProperty.call(references, ref)) {
    invalid.push(name);
    continue;
  }

  slots[ref] ||= {};
  if (slots[ref][slot]) throw new Error(`Duplicate image slot ${ref}-${slot}`);
  slots[ref][slot] = `images/products/${name}`;
}

if (invalid.length) {
  console.warn('Images ignored because the reference is not in data/references.json:');
  for (const name of invalid) console.warn(`  - ${name}`);
}

// Preserve tariff/reference order rather than converting refs to numbers.
const ordered = {};
for (const ref of Object.keys(references)) {
  if (!slots[ref]) continue;
  const numbers=Object.keys(slots[ref]).map(Number).sort((a,b)=>a-b);
  if(numbers[0]!==1 || numbers.some((n,i)=>n!==i+1)) throw new Error(`Non-contiguous image slots for ${ref}`);
  const images=numbers.map(n=>slots[ref][n]);
  ordered[ref]=images.length===1?images[0]:images;
}

fs.writeFileSync(outputPath, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
console.log(`Manifest generated: ${Object.keys(ordered).length} references and ${files.length-invalid.length} image files.`);
