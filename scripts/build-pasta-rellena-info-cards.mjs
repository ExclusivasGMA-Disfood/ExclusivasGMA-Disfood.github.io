import fs from 'node:fs';
import path from 'node:path';

// Product data is curated in the catalogue reference order. Its `source` field
// records the manufacturer's page used for technical data; unverified fields
// are intentionally absent from the cards.
const products = JSON.parse(fs.readFileSync('data/pasta-rellena-info.json', 'utf8'));
const outputDir = path.resolve('images/products');
const escapeXml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
})[char]);
function wrap(value, max) {
  const lines = [];
  let line = '';
  for (const word of String(value).split(/\s+/)) {
    if (line && `${line} ${word}`.length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}
function fitLines(value, max, count) {
  const lines = wrap(value, max);
  if (lines.length <= count) return lines;
  const result = lines.slice(0, count);
  result[count - 1] += '…';
  return result;
}

fs.mkdirSync(outputDir, {recursive: true});
for (const [ref, product] of Object.entries(products)) {
  const titleLines = fitLines(product.name, 29, 3);
  const title = titleLines.map((line, index) =>
    `<tspan x="92" dy="${index ? 55 : 0}">${escapeXml(line)}</tspan>`
  ).join('');
  const facts = product.facts.slice(0, 8).map(([label, value], index) => {
    const x = 92 + (index % 2) * 520;
    const y = 395 + Math.floor(index / 2) * 112;
    const lines = fitLines(value, 26, 2);
    const fontSize = value.length > 24 ? 27 : 34;
    return `<g transform="translate(${x} ${y})"><text class="label">${escapeXml(label)}</text>`+
      `<text class="value" y="44" style="font-size:${fontSize}px">${lines.map((line, i) =>
        `<tspan x="0" dy="${i ? 33 : 0}">${escapeXml(line)}</tspan>`).join('')}</text></g>`;
  }).join('');
  const ingredients = product.ingredients
    ? fitLines(product.ingredients, 74, 5)
    : [];
  const lowerText = ingredients.length
    ? `<text x="92" y="952" class="ingredients">${ingredients.map((line, i) =>
      `<tspan x="92" dy="${i ? 29 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`
    : `<text x="92" y="975" class="ingredients">Datos del fabricante pendientes de verificar.</text>`;
  const notes = fitLines(product.note, 100, 2).map((line, i) =>
    `<tspan x="92" dy="${i ? 24 : 0}">${escapeXml(line)}</tspan>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <style>.brand{font:700 27px Arial,sans-serif;letter-spacing:4px}.ref{font:600 24px Arial,sans-serif}.title{font:700 46px Arial,sans-serif}.label{font:700 19px Arial,sans-serif;letter-spacing:1px;fill:#65766c}.value{font:700 34px Arial,sans-serif;fill:#183f30}.ingredients{font:400 23px Arial,sans-serif;fill:#26352f}.note{font:400 18px Arial,sans-serif;fill:#68746d}</style>
  <rect width="1200" height="1200" fill="#f7f5ef"/><rect x="44" y="44" width="1112" height="1112" rx="34" fill="#fff" stroke="#dfe6df" stroke-width="3"/>
  <rect x="44" y="44" width="1112" height="122" rx="34" fill="#294637"/><rect x="44" y="120" width="1112" height="46" fill="#294637"/>
  <text x="92" y="120" class="brand" fill="#fff">${escapeXml(product.brand)} · INFORMACIÓN</text><text x="1108" y="120" text-anchor="end" class="ref" fill="#d9ff55">REF. ${escapeXml(ref)}</text>
  <text x="92" y="230" class="title" fill="#11110f">${title}</text><line x1="92" y1="348" x2="1108" y2="348" stroke="#dfe6df" stroke-width="3"/>
  ${facts}
  <line x1="92" y1="860" x2="1108" y2="860" stroke="#dfe6df" stroke-width="3"/>
  <text x="92" y="910" class="label">${escapeXml(product.ingredient_label.toUpperCase())}</text>
  ${lowerText}
  <text x="92" y="1090" class="note">${notes}</text>
  <text x="1108" y="1130" text-anchor="end" class="note">EXCLUSIVAS GMA · CATÁLOGO PROFESIONAL</text>
  </svg>`;
  fs.writeFileSync(path.join(outputDir, `${ref}-informacion-pasta.svg`), svg);
}
console.log(`Fichas de pasta rellena actualizadas: ${Object.keys(products).length}`);
