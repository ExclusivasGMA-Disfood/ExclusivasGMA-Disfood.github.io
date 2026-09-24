import fs from 'node:fs';
import path from 'node:path';

const products = {
  '5770': {
    name: 'Tiramisú clásico',
    facts: [['Peso medio', '1.000 g'], ['Presentación', '14/16 raciones'], ['Conservación', 'Congelado'], ['Servicio', 'Descongelar antes de servir']],
    ingredients: 'Mascarpone, agua, azúcar, nata 35% M.G. UHT, yema de huevo pasteurizada, amaretto, café soluble y gelatina de origen porcino. Savoiardi empapados con jarabe de café y amaretto.'
  },
  '6760': {
    name: 'Tagliatelle al huevo',
    facts: [['Cocción', '4 min aprox.'], ['Rendimiento', '90%'], ['Ración', '100 g'], ['Formato', '1,5 kg']],
    ingredients: 'Sémola de trigo de grano duro, huevo fresco pasteurizado 28% y agua.'
  },
  '6761': {
    name: 'Salsa Carbonara',
    facts: [['Contenido neto', '235 g'], ['Envase', '235 ml'], ['Formato', '24 envases/caja'], ['Conservación', '−18 °C'], ['Preparación', '3 min por encima de 75 °C']],
    ingredients: 'Nata, bacon, yema de huevo, queso, cebolla, almidón modificado de maíz, mazada, aceite de oliva, proteína láctea, sal, emulsionante y especias.'
  }

};

const escapeXml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const wrap = (text, limit = 66) => {
  const words = text.split(/\s+/); const lines = []; let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > limit) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
};

const outputDir = path.resolve('images/products');
fs.mkdirSync(outputDir, {recursive:true});
for (const [ref, product] of Object.entries(products)) {
  const titleLines = wrap(product.name, 27).slice(0, 2);
  const rows = product.facts.map(([label, value], index) => {
    const column = index % 2; const row = Math.floor(index / 2);
    const x = 92 + column * 520; const y = 395 + row * 120;
    return `<g transform="translate(${x} ${y})"><text class="label">${escapeXml(label)}</text><text class="value" y="46">${escapeXml(value)}</text></g>`;
  }).join('');
  const ingredientLines = wrap(product.ingredients).slice(0, 5).map((line, index) => `<tspan x="92" dy="${index ? 34 : 0}">${escapeXml(line)}</tspan>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <style>.brand{font:700 28px Arial,sans-serif;letter-spacing:5px}.ref{font:600 24px Arial,sans-serif}.title{font:700 48px Arial,sans-serif}.label{font:700 20px Arial,sans-serif;letter-spacing:1px;fill:#65766c;text-transform:uppercase}.value{font:700 34px Arial,sans-serif;fill:#183f30}.ingredients{font:400 25px Arial,sans-serif;fill:#26352f}</style>
  <rect width="1200" height="1200" fill="#f7f5ef"/><rect x="44" y="44" width="1112" height="1112" rx="34" fill="#fff" stroke="#dfe6df" stroke-width="3"/>
  <rect x="44" y="44" width="1112" height="122" rx="34" fill="#234e3b"/><rect x="44" y="120" width="1112" height="46" fill="#234e3b"/>
  <text x="92" y="120" class="brand" fill="#fff">TRE ARCHI · INFORMACIÓN</text><text x="1108" y="120" text-anchor="end" class="ref" fill="#d9ff55">REF. ${ref}</text>
  <text x="92" y="230" class="title" fill="#11110f">${titleLines.map((line,index)=>`<tspan x="92" dy="${index ? 58 : 0}">${escapeXml(line)}</tspan>`).join('')}</text><line x1="92" y1="330" x2="1108" y2="330" stroke="#dfe6df" stroke-width="3"/>
  ${rows}
  <line x1="92" y1="890" x2="1108" y2="890" stroke="#dfe6df" stroke-width="3"/><text x="92" y="945" class="label">Ingredientes declarados por el fabricante</text>
  <text x="92" y="995" class="ingredients">${ingredientLines}</text><text x="1108" y="1120" text-anchor="end" class="label">Exclusivas GMA · Catálogo profesional</text>
  </svg>`;
  fs.writeFileSync(path.join(outputDir, `${ref}-informacion-tre-archi.svg`), svg);
}
