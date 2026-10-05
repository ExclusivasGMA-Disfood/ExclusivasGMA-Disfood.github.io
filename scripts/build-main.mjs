// Main-site delivery assets. Shared source files and /nuevo/ stay unchanged.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {minify} from 'terser';
import sharp from 'sharp';
import {prerender} from './prerender-main.mjs';
import {buildTaxonomy} from './build-taxonomy.mjs';
const check=process.argv.includes('--check');
const read=p=>fs.readFile(p,'utf8');
const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
const runtime=['runtime','pdf-loader','keyboard'];
const app=['main-scroll-stability','catalog','navigation-position','views','selection-review','session','resize','polish','discovery','image-framing','topbar','desktop','brands','main-taxonomy-ui'];
const styles=['fonts-local','catalog-base','catalog-components','brands','palette','main-visual-theme'];
const outputs=new Map();
outputs.set('data/catalog-main.js',await buildTaxonomy());
const catalog=await read('data/catalog-data.js');
const context={window:{}};vm.runInNewContext(catalog,context);
const refs=Object.values(context.window.GMA_CATALOG_CURATION).flat();
const manifest=JSON.parse(await read('data/images-manifest.json'));
// Brand logos are placeholders, kept separate from actual product photographs.
const brandFallbacks={};
for(const brand of JSON.parse(await read('data/brands-manifest.json')).brands){
 for(const ref of brand.references||[]){
  if(manifest[ref])continue;
  if(brandFallbacks[ref]&&brandFallbacks[ref].image!==brand.image)throw new Error(`Ambiguous brand for ${ref}`);
  await fs.access(brand.image);
  brandFallbacks[ref]={brand:brand.name,image:brand.image};
 }
}
outputs.set('data/main-brand-fallbacks.json',JSON.stringify(brandFallbacks,null,2)+'\n');

const variants={};let originalBytes=0,smallBytes=0;
for(const ref of refs){
 const urls=[manifest[ref]].flat().filter(Boolean);
 const source=urls.find(s=>/-producto-tre-archi\./.test(s))||urls[0];
 if(!source)continue;
 const bytes=await fs.readFile(source),meta=await sharp(bytes).metadata();
 const entries=[];originalBytes+=bytes.length;
 for(const width of [320,640]){
  if(meta.width<=width)continue;
  const buffer=await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:85}).toBuffer();
  if(buffer.length>=bytes.length)continue;
  const target=`images/thumbnails/${ref}-${hash(bytes)}-${width}.webp`;
  outputs.set(target,buffer);entries.push(`${target} ${width}w`);
  if(width===320)smallBytes+=buffer.length;
 }
 if(entries.length)variants[source]={set:entries.join(', '),width:meta.width};
 else smallBytes+=bytes.length;
}
const helper=`function mainDiscoveryImageAttrs(source){const v=${JSON.stringify(variants)}[source.split('?')[0]];return v?' srcset="'+v.set+', '+source+' '+v.width+'w" sizes="164px"':'';}\n`;
async function bundle(names,discovery=false){
 const chunks=[];
 if(discovery)chunks.push(helper);
 for(const name of names){
  let source=await read(`assets/${name}.js`);
  if(discovery&&name==='catalog'){
   const start=source.indexOf('    const dept = deptHeader.dataset.dept;');
   const end=source.indexOf('    return;',start);
   if(start<0||end<0)throw new Error('Family handler changed');
   source=source.slice(0,start)+`    const dept = deptHeader.dataset.dept;
    keepFamilyPosition(()=>{
      if(openDepts.has(dept))openDepts.delete(dept);else openDepts.add(dept);
      render();
    },()=>groupsEl.querySelector('.dept-header[data-dept="'+CSS.escape(dept)+'"]'));
`+source.slice(end);

   source=source.replace("'Pasta Italiana':'primeros","'Pasta':'primeros").replace("'Jamones y Paletas':'tablas","'Jamones y paletas':'tablas").replace("'Embutidos':'tablas","'Embutidos y charcutería':'tablas").replace("'Quesos y Lácteos':'tablas","'Quesos y lácteos':'tablas").replace("'Pescados y Salazones':'aperitivos","'Pescados y especialidades del mar':'aperitivos").replace("'Repostería':'carta","'Postres y repostería':'carta").replace("'Vinos y Bebidas':'carta","'Vinos y bebidas':'carta").replace("'Aperitivos':'aperitivos","'Aperitivos y tapas':'aperitivos");
   source=source.replace('const CATALOG_VERSION = 24;', 'const CATALOG_VERSION = 25;');
   source=source.replace('const geo = inferGeography(group, item);', 'const geo = inferGeography(item.classificationSource || group, item);');
   source=source.replace('const SUBFAMILY_ICONS =', 'Object.assign(DEPT_ICONS,Object.fromEntries(DEPTS.map(d=>[d.name,DEPT_ICONS[d.legacyName||d.name]])));\nconst SUBFAMILY_ICONS =');
   source=source.replace('const drawing=SUBFAMILY_ICONS[title];','const drawing=SUBFAMILY_ICONS[window.GMA_SUBFAMILY_ALIASES?.[title]||title];');
   source=source.replace("${productFact('Familia', group.title)}","${productFact('Familia', group.dept)}").replace("${productFact('Departamento', group.dept)}","${productFact('Subfamilia', group.title)}${item.catalogTags?.filter(tag=>tag!=='Por encargo').length?productFact('Características de catálogo',item.catalogTags.filter(tag=>tag!=='Por encargo').join(' · ')):''}");
   source=source.replace('const IMAGE_MANIFEST = Object.create(null);', 'const IMAGE_MANIFEST = '+JSON.stringify(manifest)+';');
   source=source.replace('const value = IMAGE_MANIFEST[ref];','const value = IMAGE_MANIFEST[ref] || MAIN_BRAND_FALLBACKS[ref]?.image;');
   source='const MAIN_BRAND_FALLBACKS = '+JSON.stringify(brandFallbacks)+';\n'+source;
   source=source.replace('  const treProduct=urls.find(isTreArchiProductPhoto);',"  if(!IMAGE_MANIFEST[ref] && MAIN_BRAND_FALLBACKS[ref]) return [{url:urls[0],crop:false,label:'Marca'}];\n  const treProduct=urls.find(isTreArchiProductPhoto);");

  }
  if(discovery&&name==='desktop'){
   source=source.replace("      const dept=deptButton.dataset.desktopDept;",`      const dept=deptButton.dataset.desktopDept;
      keepFamilyPosition(()=>{`);
   source=source.replace('openDept=null;renderDesktopCatalog();','openDept=null;renderNavigation(groupRows(),activeGroupIndex(groupRows()));');
   source=source.replace('      renderDesktopCatalog();\n      return;\n    }\n    const groupButton',`      renderDesktopCatalog();
      },()=>familyList.querySelector('[data-desktop-dept="'+CSS.escape(dept)+'"]'),familyList);
      return;
    }
    const groupButton`);
  }
  if(discovery&&name==='session')source=source.replace("if(!sessionBar)return;","if(!sessionBar || !$('sessionTitle') || !$('sessionSummary'))return;");
  if(discovery&&name==='topbar')source=source.replace("case 'filters':", "case 'brands': mainMenuNavigate('brands');break;\n      case 'christmas': break;\n      case 'filters':").replace("case 'home': scrollImmediately(0);", "case 'home': mainMenuNavigate('home');").replace("case 'catalog': scrollToResults();", "case 'catalog': mainMenuNavigate('catalog');");
  if(discovery&&name==='discovery'){
   source=source.replaceAll('Todas las secciones','Todas las familias').replaceAll('Todas las familias</option>','Todas las subfamilias</option>');
   // Department and subfamily labels are distinct after restructuring.
   source=source.replace("deptSel.innerHTML='<option value=\"\">Todas las subfamilias</option>';","deptSel.innerHTML='<option value=\"\">Todas las familias</option>';");
   source=source.replace('Sección: ${currentDept}','Familia: ${currentDept}').replace('Familia: ${familyFilter}','Subfamilia: ${familyFilter}');
   source=source.replace(".slice().sort((a,b)=>a.title.localeCompare(b.title,'es'))",'.slice()');
   const needle='src="${imageUrl}" alt=""';
   if(source.split(needle).length!==2)throw new Error('Discovery template changed; review image attributes');
   source=source.replace(needle,'src="${imageUrl}"${mainDiscoveryImageAttrs(imageUrl)} alt=""');
  }
  // Minify each classic script separately, preserving globals and execution order.
  chunks.push((await minify(source,{compress:false,mangle:false,format:{comments:false}})).code);
 }
 return chunks.join('\n;\n')+'\n';
}
outputs.set('assets/main-runtime.min.js',await bundle(runtime));
outputs.set('assets/main-app.min.js',await bundle(app,true));
// Neutralize legacy chromatic literals only in the principal's compiled CSS.
// Dimensions, selectors and interaction rules remain unchanged.
function neutralColors(css){
 const gray=(r,g,b)=>{if(r===g&&g===b)return r;return Math.round(.2126*r+.7152*g+.0722*b);};
 return css.replace(/#([0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-f])/gi,(full,h)=>{
  if(h.length===3)h=[...h].map(c=>c+c).join('');
  const n=gray(parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16));
  return '#'+n.toString(16).padStart(2,'0').repeat(3);
 }).replace(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)([^)]*)\)/g,(full,r,g,b,tail)=>{
  const n=gray(+r,+g,+b);return (full.startsWith('rgba')?'rgba(':'rgb(')+n+','+n+','+n+tail+')';
 });
}
outputs.set('assets/main-styles.css',(await Promise.all(styles.map(async n=>{const css=await read(`assets/${n}.css`);return n==='main-visual-theme'?css:neutralColors(css);}))).join('\n'));
let html=await read('index.html');
html=html.replace(/<script src="data\/product-specs\.js[^"]*"><\/script>/,`<script src="data/product-specs.js?v=${hash(await read('data/product-specs.js'))}"></script>`);
html=html.replace(/<script src="data\/catalog-(?:data|main)\.js[^"]*"><\/script>/,`<script src="data/catalog-main.js?v=${hash(outputs.get('data/catalog-main.js'))}"></script>`);
if(!html.includes('data-menu-action="christmas"'))html=html.replace('<button type="button" data-menu-action="catalog">Catálogo</button>','<button type="button" data-menu-action="catalog">Catálogo</button>\n    <button type="button" data-menu-action="christmas">Selección de Navidad</button>');
html=html.replace('>Sección del catálogo</div>','>Familia</div>').replace('aria-label="Filtrar por sección"','aria-label="Filtrar por familia"').replace('>Todas las secciones</option>','>Todas las familias</option>');
html=html.replace(/(<div class="filter-group-title">)Familia(<\/div>\s*<select[^>]*id="familyFilterSelect")/,'$1Subfamilia$2').replace('id="familyFilterSelect" aria-label="Filtrar por familia"','id="familyFilterSelect" aria-label="Filtrar por subfamilia"').replace('Las familias se ajustan a la sección elegida.','Las subfamilias se ajustan a la familia elegida.');
html=html.replace(/(id="familyFilterSelect"[^>]*><option value="">)Todas las familias/,'$1Todas las subfamilias');
// Retain source paths in data attributes so regeneration remains deterministic.
const logoTags=[...html.matchAll(/<img\b[^>]*src="images\/(?:brands\/[^"]+|gma-logo-catalogo\.png)"[^>]*>/g)];
for(const [tag] of logoTags){
 const source=tag.match(/src="([^"]+)/)[1];
 const bytes=await fs.readFile(source);
 const buffer=await sharp(bytes).webp({quality:90,smartSubsample:true}).toBuffer();
 if(buffer.length>=bytes.length){html=html.replace(tag,tag.replace(/ srcset="[^"]*"/g,''));continue;}
 const target='images/optimized/'+hash(bytes)+'.webp';outputs.set(target,buffer);
 const replacement=tag.replace(/ srcset="[^"]*"/g,'').replace(/src="[^"]+"/, 'src="'+source+'" srcset="'+target+'"');
 html=html.replace(tag,replacement);
}
// Self-host the exact font families; preload the two principal faces.
html=html.replace(/<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>\n?/g,'');
const fontPreloads='<link rel="preload" as="font" href="assets/fonts/geist-variable-latin.woff2" type="font/woff2" crossorigin>\n<link rel="preload" as="font" href="assets/fonts/merriweather-700.woff2" type="font/woff2" crossorigin>';
if(!html.includes('href="assets/fonts/geist-variable-latin.woff2"'))html=html.replace('</head>',fontPreloads+'\n</head>');
// Works both on the initial source HTML and subsequent builds.
const localCss=/<link rel="stylesheet" href="assets\/(?:catalog-base|catalog-components|brands|palette|main-styles)\.css[^"\n]*">/g;
const inlineStyles='<style id="main-critical-styles">'+outputs.get('assets/main-styles.css').replaceAll('url(fonts/','url(assets/fonts/')+'</style>';
html=html.replace(/<style id="main-critical-styles">[\s\S]*?<\/style>/,()=>inlineStyles);
let first=true;
html=html.replace(localCss,()=>{if(!first)return '';first=false;return inlineStyles;});
const group=(names,target)=>{
 const pattern=new RegExp('<script src="assets/(?:'+names.join('|')+'|'+target.replaceAll('.','\\.')+')\\.js[^"\\n]*"></script>','g');
 let seen=false;
 html=html.replace(pattern,()=>{if(seen)return '';seen=true;return `<script src="assets/${target}.js?v=${hash(outputs.get(`assets/${target}.js`))}"></script>`;});
 if(!seen)throw new Error(`Missing script group ${target}`);
};
group(runtime,'main-runtime.min');group(app,'main-app.min');
html=await prerender(html,outputs);
outputs.set('index.html',html);
for(const [path,content] of outputs){
 const data=Buffer.from(content);
 if(check){const actual=await fs.readFile(path).catch(()=>Buffer.alloc(0));if(!actual.equals(data))throw new Error(`Stale ${path}; run npm run build:main`);}
 else {await fs.mkdir(dirname(path),{recursive:true});await fs.writeFile(path,data);}
}
console.log(`${check?'Checked':'Built'} ${outputs.size} main assets; showcase originals ${originalBytes} bytes, 320px variants ${smallBytes} bytes.`);
