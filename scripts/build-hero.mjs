import fs from 'node:fs';
import sharp from 'sharp';
const {slides}=JSON.parse(fs.readFileSync('data/hero-manifest.json','utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const ids=new Set();
for(const s of slides){
 if(ids.has(s.id)||!/^images\/hero\/[\w-]+\.webp$/.test(s.image)||!['cover','pasta','panel'].includes(s.layout))throw Error('Entrada de cabecera no válida: '+s.id);
 ids.add(s.id);
 if(s.mobile){if(!/^images\/hero\/[\w-]+\.webp$/.test(s.mobile.image))throw Error('Ruta móvil incorrecta');const mm=await sharp(s.mobile.image).metadata();if(mm.width!==s.mobile.width||mm.height!==s.mobile.height)throw Error('Dimensiones móviles incorrectas');}
 const m=await sharp(s.image).metadata();
 if(m.width!==s.width||m.height!==s.height)throw Error('Dimensiones incorrectas: '+s.image);
 if(s.layout==='panel'&&!(s.split>.3&&s.split<.8))throw Error('Encuadre incorrecto: '+s.id);
}
const image=(s,alt,extra='')=>`<img src="${esc(s.image)}" width="${s.width}" height="${s.height}" alt="${esc(alt)}" decoding="async" ${extra}>`;
const framing=s=>{const sceneHeight=1/(3*s.split);const panelWidth=Math.min(100/(1-s.split),3*(1.38-sceneHeight)*100)*.96;return `--scene-width:${100/s.split}%;--scene-height:${sceneHeight/1.38*100}%;--panel-width:${panelWidth}%;--panel-left:${50-panelWidth*(1+s.split)/2}%;--split:${s.split*100}%`;};
const content=`<section class="home-hero" id="homeHero" aria-label="Inspiración gastronómica" aria-roledescription="carrusel">
  <div class="home-hero-stage">
${slides.map((s,i)=>`    <div class="home-hero-slide${s.compact?' home-hero-cesar':''}${s.mobile?' home-hero-has-mobile':''}" role="group" aria-roledescription="diapositiva" aria-label="${i+1} de ${slides.length}: ${esc(s.id)}"${i?' hidden':''}>
${s.mobile?'      <div class="home-hero-mobile">'+image(s.mobile,s.alt)+'</div>\n':''}${s.layout==='cover'?'      '+image(s,s.alt,'class="home-hero-cover" fetchpriority="high"'):`      <div class="home-hero-recipe${s.layout==='panel'?' home-hero-panel':''}"${s.layout==='panel'?` style="${framing(s)}"`:''}>
        <span class="home-hero-plate">${image(s,s.alt)}</span>
        <span class="home-hero-ingredients" aria-hidden="true">${image(s,'')}</span>
      </div>`}
    </div>`).join('\n')}
  </div>
  <div class="home-hero-controls">
    <button type="button" data-hero-prev aria-label="Foto anterior">‹</button>
${slides.map((s,i)=>`    <button type="button" class="home-hero-dot" data-hero-go="${i}" aria-label="Mostrar foto ${i+1}: ${esc(s.id)}" aria-pressed="${i===0}"><span></span></button>`).join('\n')}
    <button type="button" data-hero-next aria-label="Foto siguiente">›</button>
    <button type="button" data-hero-pause aria-label="Pausar carrusel" aria-pressed="false">Ⅱ</button>
  </div>
</section>`;
const path='index.html',before=fs.readFileSync(path,'utf8');
if(!before.includes('<!--hero:start-->'))throw Error('Falta el bloque de cabecera');
const after=before.replace(/<!--hero:start-->[\s\S]*?<!--hero:end-->/,`<!--hero:start-->\n${content}\n<!--hero:end-->`);
if(process.argv.includes('--check')){if(before!==after)throw Error('Ejecuta npm run build:hero');}
else fs.writeFileSync(path,after);
console.log(`${slides.length} imágenes de cabecera verificadas desde el manifiesto`);
