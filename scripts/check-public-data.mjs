import fs from 'node:fs';
import path from 'node:path';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const assert=(ok,message)=>{if(!ok)throw new Error(message);};
const fields=(value,allowed,label)=>assert(Object.keys(value).every(k=>allowed.includes(k)),`Estructura no válida: ${label}`);
const rootFiles=['README.md','index.html','apple-touch-icon.png','favicon.ico','manifest.webmanifest','package.json','package-lock.json','.gitignore','_config.yml'];
const directories=['.git','.github','assets','data','images','nuevo','scripts','node_modules'];
for(const entry of fs.readdirSync('.',{withFileTypes:true}))assert((entry.isDirectory()?directories:rootFiles).includes(entry.name),`Entrada no válida: ${entry.name}`);
const dataFiles=['hero-manifest.json','brand-assets.json','brand-groups.json','brands-manifest.json','catalog-data.js','catalog-main.js','image-framing.json','images-manifest.json','main-brand-fallbacks.json','main-taxonomy.json','product-details.json','product-formats.js','product-specs.js','references.json'];
for(const name of fs.readdirSync('data'))assert(dataFiles.includes(name),`Recurso no válido: ${name}`);
const brands=read('data/brands-manifest.json');fields(brands,['brands'],'marcas');
for(const b of brands.brands){fields(b,['id','name','image','width','height','references','displayImage'],b.id);for(const key of ['image','displayImage'])if(b[key])assert(b[key].startsWith('images/')&&fs.existsSync(b[key]),`Imagen de marca no válida: ${b.id}`);}
const groups=read('data/brand-groups.json');fields(groups,['groups'],'grupos');
const framing=read('data/image-framing.json');fields(framing,['version','images','carousels','catalog'],'encuadres');
for(const entries of Object.values(framing))if(Array.isArray(entries))for(const e of entries)fields(e,['ref','source','sourceSize','contentBox','innerMargin','fit','position'],e.ref);
for(const [ref,entry] of Object.entries(read('data/product-details.json')))fields(entry,['title','completeness','facts','ingredients','imageNote','origin'],ref);
for(const name of dataFiles.filter(p=>p.endsWith('.json'))){const content=fs.readFileSync(path.join('data',name),'utf8');assert(!/https?:\/\//i.test(content),`Enlace de datos no válido: ${name}`);}
console.log('Estructura de recursos y datos válida');
