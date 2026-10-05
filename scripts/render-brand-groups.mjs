import fs from 'node:fs';
const {brands}=JSON.parse(fs.readFileSync('data/brands-manifest.json','utf8'));
const {groups}=JSON.parse(fs.readFileSync('data/brand-groups.json','utf8'));
const ids=groups.flatMap(g=>g.brands);
if(new Set(ids).size!==ids.length||ids.length!==brands.length||brands.some(b=>!ids.includes(b.id)))throw Error('La agrupación debe incluir cada marca exactamente una vez');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const logo=id=>{
 const b=brands.find(b=>b.id===id);
 const img=`<img class="gma-brands__logo" src="${escape(b.displayImage||b.image)}" alt="${escape(b.name)}" loading="lazy" decoding="async" width="${id==='beher'?600:b.width}" height="${id==='beher'?129:b.height}">`;
 return `        <li class="gma-brands__item" data-brand="${id}">${id==='beher'?`<span class="gma-brands__beher">${img}</span>`:img}</li>`;
};
const html=`<section class="gma-brands" aria-labelledby="gmaBrandsTitle">
    <h2 class="gma-brands__heading" id="gmaBrandsTitle">Marcas de nuestro catálogo</h2>
    <ul class="gma-brands__grid">
${ids.map(logo).join('\n')}
    </ul>
  </section>`;
for(const page of ['index.html','nuevo/index.html']){
 const original=fs.readFileSync(page,'utf8');
 if(!original.includes('<section class="gma-brands"'))throw Error('Falta panel de marcas');
 fs.writeFileSync(page,original.replace(/<section class="gma-brands"[\s\S]*?<\/section>/,html));
}
console.log(`${brands.length} marcas ordenadas en una cuadrícula continua en ambas páginas`);
